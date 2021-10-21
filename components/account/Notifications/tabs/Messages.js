import React, {useEffect, useState} from "react";
import { Dialog } from "@material-ui/core";
import { ModalMessage } from "../../../Modals";
import { useMedia } from "../../../../hooks/useMedia"
import Chat from "./Chat";
import { useRouter } from "next/router";
import { useAuth } from "../../../../lib/Context/AuthCTX";
import { CHAT_URL_API, STATIC_URL } from "../../../../lib/constants";
import axios from "axios";
import { useStore } from "../../../../lib/Context/Store";
import { generateTime, generateProductPhoto, generateDataTocken, chatPush } from "./chatFunctions";
import { askForPermissioToReceiveNotifications, initializeFirebase } from '../../../../firebase/clientApp';
import registerServiceWorkerNoSSR from '../../../../firebase/InitServiceWorker'


function Messages() {

  function ellipsis(string, count) {
    if (string.length > count) {
      return `${string.substr(0, count - 1)}...`;
    } else {
      return string;
    }
  }

  const [messageModal, setMessageModal] = useState(false)
  const [room, setRoom] = useState({})
  const [allRooms, setAllRooms] = useState([])
  const [chatUsers, setChatUsers] = useState()
  const [loading, setLoading] = useState(false)

  const {query} = useRouter()
  const router = useRouter()
  const {id} = useAuth()
  const {userInfo} = useStore()
  const {matchesTablet, matchesMobile} = useMedia()
 
  useEffect(() => setLoading(true), [])

  useEffect(() => {
	initializeFirebase()
	registerServiceWorkerNoSSR()
	const token = askForPermissioToReceiveNotifications()
	if (id) {
		try {
			generateDataTocken(id, token)
		} catch(e) {
			console.log(e)
		}
	}
  }, [loading, id])


  function changeModal() {
	setMessageModal(!messageModal)
	router.push({
		pathname: `/account/${id}`,
		query: {
			account: 5,
			content: 1
		}
	})
  }


  useEffect(() => {
	if (id && query?.companion_id) {
		const obj = {
			"page_limit": 50, 
			"last_message_id": 0, 
			"user_id": id, 
			"companion_id": +query?.companion_id, 
			"product_id": +query?.product_id
		}

		axios.post(`${CHAT_URL_API}/chat_history`, obj).then(r => {
			axios.post(`/api/roomInfo`, [r.data.room])
				.then(r => {
					setRoom(r.data.list[0])
				})
		})
 	 }
  }, [id, query])



  useEffect(() => {
	if (query?.companion_id && id && userInfo?.name) {
		const sender = {"id": id, "name": userInfo?.name}
		const recipient = {
			'id': +query?.companion_id
		}
		const product = {"id": +query?.product_id}
		setChatUsers({sender, recipient, product})
	}
  }, [query, id, userInfo])

  useEffect(() => {
	if (id) {
		axios.post(`${CHAT_URL_API}/chat_last_messages`, {"user_id": id})
		  .then(r => {
			  axios.post(`/api/roomInfo`, r.data.data)
				.then(r => {
					setAllRooms(r.data.list)
				})
		  })
	}
  }, [id])

  useEffect(() => {
	if (!matchesTablet && !matchesMobile && messageModal) {
		setMessageModal(false)
		console.log(chatUsers)
		router.push({
			pathname: `/account/${id}`,
			query: {
				account: 5,
				content: 1,
				companion_id: chatUsers?.recipient?.id,
				product_id: chatUsers?.product?.id
			}
		})
	}
  })

  useEffect(() => {
	if (query?.mobile && room) {
		if (!messageModal) {
			setMessageModal(true)
		}
	}
  }, [room])

  const changeChat = (data) => {
		const routerObj = {
			id,
			companion_id: data?.seller_id == id ? data?.customer_id : data?.seller_id,
			product_id: data?.product_id,
			mobile: matchesMobile || matchesTablet
		}
		chatPush(router, routerObj)
  }

  const handleClickUser = (e, senderId) =>  {
	  e.stopPropagation();
	  if (senderId == id) return;

	  router.push(`/user/${senderId}`)
  }

  const handleClickProduct = (e, productId) => {
	  e.stopPropagation();
	  router.push(`/product/${productId}`)
  }

  const onSenderMessage = (senderMessage) => {
	  if (senderMessage) {

		  if (senderMessage.match('http://192.168.8.111:6001/images')) {
			  if (senderMessage.match('.webp')) {
				  return 'Изображение'
			  }
		  }

		  return senderMessage
	  }

	  return null
  }

  return (
    (
	// 	<div className="clientPage__container_bottom">
    //     <div className="clientPage__container_content">
    //       <div className="notInfContainer">
    //         <div className="notInf__title">Здесь буду ваши диалоги</div>
    //         <p className="notInf__subtitle">
    //           Нажмите на иконку чата, чтобы договориться
    //           <br /> о покупке или продаже товаров и услуг
    //         </p>
    //       </div>
    //     </div>
    //   </div>
	!allRooms.length
    ) || (
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_nav__radio">
          <label className="checkbox">
            <input type="checkbox" />
            <div className="checkbox__text"></div>
          </label>
          <a>Удалить</a>
          <a>Заблокировать</a>
        </div>
        <div className="clientPage__container_content">
          <div className="messageContainer">
            <div className="messageDialogs">
			  {allRooms?.length ? 
			  	allRooms.map((item, i) => {

					const productPhoto = generateProductPhoto(item.product_photo)
					const time = generateTime(0, item.time)

					const senderPhoto =
						(item.seller_id === id ?
							item?.sender_id === id ? item?.seller_photo : item?.customer_photo
							: item?.sender_id == id ? item?.customer_photo : item?.seller_photo)

					const senderName =
						(item.seller_id === id ?
							item?.sender_id === id ? item?.seller_name : item?.customer_name
							: item?.sender_id == id ? item?.customer_name : item?.seller_name)

					const senderMessage = onSenderMessage(item?.message)

					return (
						<a key={i} className="messageDialog" 
						  onClick={() => {
							matchesMobile || matchesTablet ? setMessageModal(true) : null
							if (allRooms[i].product_id !== room.product_id) {
								changeChat(allRooms[i])
							}
						  }
						}>
							<div className="messageOffer small">
								<div className="messageDiaCheck">
									<label className="checkbox">
									<input type="checkbox" />
									<div className="checkbox__text"></div>
									</label>
								</div>
								<div className='messageProductBlock' onClick={(e) => handleClickProduct(e, item?.product_id)}>
									<img src={`${STATIC_URL}/${productPhoto}?${item.product_id}`} />
									<div>{item.product_price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</div>
									<div>{ellipsis(item.product_name, 12)}</div>
								</div>
							</div>
							<div className="messageUser small">
							<div onClick={(e) => handleClickUser(e, item?.sender_id)} className="messageUserBlock">
								<span>
									{/*<img src={item?.seller_photo ? `${STATIC_URL}/${senderPhoto}` : null} />*/}
									<img src={senderPhoto ? `${STATIC_URL}/${senderPhoto}` : null} />
								</span>
								<div>
								<div>{senderName}</div>
								<div className="light">{time}</div>
								</div>
							</div>
							<div className="light">{senderMessage}</div>
							</div>
						</a>
					)
				  })
			   : null
			  }
              {/* {data.data.map((item, i) => {
                return (
						<a key={i} className="messageDialog" onClick={() => {matchesMobile || matchesTablet ? changeModal() : null}}>
							<div className="messageOffer small">
								<div className="messageDiaCheck">
									<label className="checkbox">
									<input type="checkbox" />
									<div className="checkbox__text"></div>
									</label>
								</div>
								<img src={`${item.offerImg}?${item.id}`} />
								<div>{item.offerPrice.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</div>
								<div>{ellipsis(item.offerTitle, 12)}</div>
							</div>
							<div className="messageUser small">
							<div className="messageUserBlock">
								<img src={`${item.userPic}?${item.id}`} />
								<div>
								<div>{item.userName}</div>
								<div className="light">{item.date}</div>
								</div>
							</div>
							<div className="light">{item.message}</div>
							</div>
						</a>
                );
              })} */}
            </div>
            <div className="messageWindow">
              {room?.seller_id ?
				<div className="messageHeader small">
                <img src={`${STATIC_URL}/${generateProductPhoto(room?.product_photo)}`}/>
                <div>
                  <div>
                    <div>
                      <div>{room?.seller_name}</div>
                      <div className="light">00.00.00 00:00</div>
                    </div>
                    <img src={room?.seller_photo ? `${STATIC_URL}/${room?.seller_photo}` : null} />
                  </div>
                  <div>{room?.product_price} ₽</div>
                  <div>{room?.product_name}</div>
                </div>
              </div> : null} 
			  {chatUsers?.product && chatUsers?.recipient && chatUsers?.sender && 
			  <Chat
				usersData={chatUsers} 
				userChatPhoto={room?.customer_id == id ? room?.seller_photo : room?.customer_photo}
			  />}
            </div>
          </div>
        </div>
        <Dialog open={messageModal || false} onClose={() => setMessageModal(!messageModal)} fullScreen={true}>
          <ModalMessage 
		    modal={changeModal}
			usersData={chatUsers} 
			room={room}
			userChatPhoto={room?.customer_id == id ? room?.seller_photo : room?.customer_photo} 
		  />
        </Dialog>
      </div>
    )
  );
}

export default Messages;
