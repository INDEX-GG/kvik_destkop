import React, { useMemo, useState, useEffect } from "react"
import { Box, Divider, Dialog } from "@material-ui/core"

import { useStore } from "#lib/Context/Store"
import { useAuth } from "#lib/Context/AuthCTX"
import { useMedia } from "#hooks/useMedia"
import { useCustomRouter } from "../../../../../hook/globalHooks/useCustomRouter"

import {
	askForPermissioToReceiveNotifications,
	initializeFirebase,
} from "../../../../../../firebase/clientApp"
import registerServiceWorkerNoSSR from "../../../../../../firebase/InitServiceWorker"
import { getTokenDataByPost } from "#lib/fetch"
import { CHAT_URL_API } from "#lib/constants"

import { ModalMessage } from "#components/Modals"
import ChatAllRoom from "#components/account/Notifications/components/ChatAllRoom"
import ChatRoom from "#components/account/Notifications/components/ChatRoom"
import Chat from "#components/account/Notifications/tabs/Chat"

import EmptyPlaceholder from "./../../../../../../components/EmptyPlaceholder"
import MessagesNavButtons from "./MessagesNavButtons/MessagesNavButtons"

// TODO: перенести в src/messages
import { generateDataToken } from "#components/account/Notifications/tabs/chatFunctions"

const Messages = ({ data }) => {
	const { id, token } = useAuth()
	const { router, handlePushLocation } = useCustomRouter()
	const { matchesTablet, matchesMobile } = useMedia()
	const { userInfo } = useStore()

	const [room, setRoom] = useState({}) // state выбранного активного диалога
	const [messageModal, setMessageModal] = useState(false) // state что открылась модалка на мобиле
	// const [loading, setLoading] = useState(false) // state загрузки и инициализации firebase
	const [chatUsers, setChatUsers] = useState()
	const [localRoom, setLocalRoom] = useState(false)
	const [loadingRoom, setLoadingRoom] = useState(true)
	const [localHistoryMessage, setLocalHistoryMessage] = useState(false)

	const isEmpty = useMemo(() => !data.length && !room?.product_id, [
		data.length,
		room?.product_id,
	])

	const isChatOpen = useMemo(
		// TODO: проверку брать из useCustomRouter
		() => router.asPath.includes("companion"),
		[router]
	)

	const isChatAllQuery = useMemo(
		() => chatUsers?.product && chatUsers?.recipient && chatUsers?.sender,
		[chatUsers]
	)

	// * useEffects

	useEffect(() => {
		initializeFirebase()
		registerServiceWorkerNoSSR()
		const firebaseToken = askForPermissioToReceiveNotifications()
		if (id) {
			try {
				generateDataToken(id, firebaseToken, token)
			} catch (e) {
				console.log(e)
			}
		}
	}, [id])

	useEffect(() => {
		if (!matchesTablet && !matchesMobile && messageModal) {
			setMessageModal(false)
			router.push({
				pathname: `/account/message`,
				query: {
					// account: 5,
					content: "rooms",
					companion_id: chatUsers?.recipient?.id,
					product_id: chatUsers?.product?.id,
				},
			})
		}
	})

	//Добавление несуществующей комнаты в список всех комнат (Если диалог начат впервые);
	useEffect(() => {
		if (router?.query) {
			const productId = router.query.product_id

			//   if (room?.product_id && !loadingAllRooms) {
			if (room?.product_id) {
				// const findItem = allRooms?.find(item => item.product_id == productId);
				const findItem = data?.find((item) => item.product_id == productId)
				// console.log(findItem, productId)
				if (!findItem) {
					setLocalRoom(true)
				}
			}
		}
	}, [room, router])

	// Продолжение верхнего useEffect;
	useEffect(() => {
		console.log(1)
		if (localRoom) {
			const sendObj2 = {
				customer_id: room?.customer_id,
				product_id: room?.product_id,
				seller_id: room?.seller_id,
				product_name: room?.product_name,
				product_photo: room?.product_photo,
				product_price: room?.product_price,
				seller_name: room?.customer_name,
				seller_photo: room?.customer_photo,
				time: localHistoryMessage?.time,
				message: localHistoryMessage?.message,
			}

			console.log("sendObj2: ", sendObj2)

			if (localHistoryMessage?.message) {
				const productId = router.query.product_id
				// const findItem = allRooms?.find(item => item.product_id === productId);
				const findItem = data?.find((item) => item.product_id === productId)

				console.log(findItem)
				// setAllRooms([sendObj2])

				//   if (!findItem) {
				//     console.log(1)
				//     setAllRooms(prev => {
				//       if (prev) {
				//         console.log(2)
				//         return [sendObj2, ...prev]
				//       } else {
				//         console.log(3)
				//         return [sendObj2]
				//       }
				//     })
				//   } else {
				//     setAllRooms(prev => {
				//       console.log(4)
				//       return [sendObj2, ...prev.splice(1,)]
				//     })
				//   }

				if (!findItem) {
					console.log(1)
				}
			}
		}
	}, [localHistoryMessage])

	useEffect(() => {
		if (router?.query?.companion_id && id && userInfo?.name) {
			const sender = { id: id, name: userInfo?.name }
			const recipient = {
				id: +router?.query?.companion_id,
			}
			const product = { id: +router?.query?.product_id }
			setChatUsers({ sender, recipient, product })
		}
	}, [router?.query, id, userInfo])

	// Модальное окно (чат на телефоне)
	useEffect(() => {
		if (router?.query?.mobile && room && !messageModal) setMessageModal(true)
	}, [room])

	useEffect(() => {
		if (id && router.query?.companion_id) {
			const obj = {
				page_limit: 50,
				last_message_id: 0,
				user_id: id,
				companion_id: +router.query?.companion_id,
				product_id: +router.query?.product_id,
			}

			if (obj.companion_id && obj.product_id) {
				try {
					getTokenDataByPost(`${CHAT_URL_API}/chat_history`, obj, token).then(
						(r) => {
							getTokenDataByPost(`/api/roomInfo`, [r.room], token).then((r) => {
								//   console.log(allRooms);
								setRoom(r.list[0])
                                setLoadingRoom(false)
							})
						}
					)
				} catch (e) {
					console.log(1)
					console.log("e: ", e)
				}
			}
		}
	}, [id, router.query])

	// ? handlers

	const changeModal = () => {
		setMessageModal(!messageModal)
		handlePushLocation(`/account/${id}`, { content: "rooms" })
	}

	return (
		<>
			{!isEmpty ? (
				<Box className="clientPage__container_bottom">
					<MessagesNavButtons />
					<Divider style={{height: '2px'}} />
					{!isChatOpen ? (
						<Box className="messageDialogs">
							{/* отображение всех диалогов */}
							<ChatAllRoom
								allRooms={data}
								setData={{ setLoadingRoom, setMessageModal, setLocalRoom }}
							/>
						</Box>
					) : (
						// отображение (выбранного) активного диалога
						<ChatRoom roomData={room}>
							{isChatAllQuery && (
								<Chat
									usersData={chatUsers}
									userChatPhoto={
										room?.customer_id == id
											? room?.seller_photo
											: room?.customer_photo
									}
									userChatName={
										room?.customer_id == id
											? room?.seller_name
											: room?.customer_name
									}
									localRoom={localRoom ? localRoom : false}
									setLocalMessage={setLocalHistoryMessage}
								/>
							)}
						</ChatRoom>
					)}
					{/* на мобилке диалог открывается в модалке */}
					<Dialog
						open={messageModal || false}
						onClose={() => setMessageModal(!messageModal)}
						fullScreen={true}
					>
						<ModalMessage
							modal={changeModal}
							usersData={chatUsers}
							room={room}
							loadingRoom={loadingRoom}
							userChatPhoto={
								room?.customer_id == id
									? room?.seller_photo
									: room?.customer_photo
							}
							userChatName={
								room?.customer_id == id
									? room?.seller_name
									: room?.customer_name
							}
						/>
					</Dialog>
				</Box>
			) : (
				<EmptyPlaceholder
					title="Здесь буду ваши диалоги"
					subtitle="Нажмите на иконку чата, чтобы договориться <br/> о покупке или продаже товаров и услуг"
				/>
			)}
		</>
	)
}

export default React.memo(Messages)
