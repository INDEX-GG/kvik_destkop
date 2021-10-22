import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../../lib/Context/AuthCTX'
import { useRouter } from 'next/router';
import { useStore } from '../../../../lib/Context/Store';
import axios from 'axios';
import { CHAT_URL_API, STATIC_URL } from '../../../../lib/constants';
import { socket } from './socket';
import { generateTime } from './chatFunctions';
import {Dialog} from "@material-ui/core";
import ChatDefaultAvatar from "../components/ChatDefaultAvatar";
import {ellipsis} from "../../../../lib/services";
// import {useMedia} from "../../../../hooks/useMedia";
// import useMoment from 'moment-timezone'


const Chat = ({usersData, userChatPhoto, userChatName}) => {

	const [message, setMessage] = useState('');
	const [msgList, setMsgList] = useState();
	const [messageId, setMessageId] = useState(null)
	const [messageUpdate, setMessageUpdate] = useState(false)
	const [userOnline, setUserOnline] = useState(false)
	const [loading, setLoading] = useState(true)
	const [socketConnect, setSocketConnect] = useState(false)
	const [fullScreenImg, setFullScreenImg] = useState({state: false, src: ''})

	const refChat = useRef()
	const refInput = useRef()
	const refMessage = useRef()
	const observer = useRef()

	const {userInfo} = useStore()
	const {query} = useRouter()
	const {id} = useAuth()
	// const {matchesMobile, matchesTablet} = useMedia()


	useEffect(() => {
		if (socketConnect) {
			socket.emit('leave', {'sender': usersData?.sender, 'recipient': usersData?.recipient, 'product':  usersData?.product})
			socket.disconnect()
			socket.emit('join', {'sender': usersData?.sender, 'recipient': usersData?.recipient, 'product': usersData?.product})
			setMessageUpdate(false)
		}
	}, [usersData?.sender])


	useEffect(() => {
		return (() => {
			if (socketConnect) {
				setUserOnline(false)
				setSocketConnect(false)
				console.log("SOCKET DISCONNECT")
				socket.emit('leave', {'sender': usersData?.sender, 'recipient': usersData?.recipient, 'product': usersData?.product})
				socket.disconnect()
			}
		})
	}, [socketConnect])

	const generateChatHistory = (messageId = 0) => {
		return {
			"page_limit": 50, 
			"last_message_id": messageId, 
			"user_id": id, 
			"companion_id": +query?.companion_id, 
			"product_id": +query?.product_id
		}
	}

	const generatePush = (id, message) => {
		if (usersData?.recipient?.id && userInfo?.name) {
			const pushObj = {
				'user_id': usersData?.recipient.id,
				'message': ellipsis(message, 20),
				'user_name': userInfo.name
			}

			axios.post(`${CHAT_URL_API}/send_push`, pushObj).then(r => {
				console.log(r);
			})
		}
	}


	const chatHistory = () => {
		const historyObj = generateChatHistory()

		if (historyObj.companion_id && historyObj.product_id) {
			try {
				axios.post(`${CHAT_URL_API}/chat_history`, historyObj).then(r => {
					if (userOnline) setUserOnline(false)

					console.log("SOCKET CONNECT")
					setMsgList(r.data.data.reverse())

					if (r.data.data.length) setMessageId(r.data.data[0]?.id)

					setSocketConnect(true)
					setLoading(false)
					socket.connect()
				})
			} catch(e) {
				console.log(e);
			}
		}
	}


	useEffect(() => {
		if (query?.companion_id && query?.product_id && userInfo?.name && id) {
			socket.emit('join', {'sender': usersData?.sender, 'recipient': usersData?.recipient, 'product': usersData?.product})
			chatHistory()
		}
	}, [query, userInfo, id])


	useEffect(() => {
		if (refChat.current && !messageUpdate) {
			refChat.current.scrollTop = refChat.current.scrollHeight
		} else {
			console.log(msgList.length);
			refChat.current.scrollTop = refChat.current.scrollHeight - ((msgList.length - 50) * 78 - 12)
			return;
		}
		refChat.current.scrollTop = refChat.current.scrollHeight
	}, [msgList])




 	const handleSend = async (img = false) => {
		if (message.length > 0 || img) {
			let date = new Date()
			const messageDate = {
				"y": date.getFullYear(), 
				"mo": date.getMonth() + 1, 
				"d": date.getDate(), 
				"h": date.getHours(), 
				"mi": date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`
			}

			const sendObj = {
				'delete': false, 
				'message': img ? img : message, 
				'messages_is_read': false, 
				'recipient': usersData?.recipient, 
				'sender': usersData?.sender,
				'sender_id': usersData?.sender.id,
				'product': usersData?.product, 
				'time': JSON.stringify(messageDate),
			}


			if (!userOnline) {
				generatePush(usersData?.sender.id, message)
			}

			if (navigator.onLine) {
				await socket.emit('text', sendObj)
			} else {
				const messageLocalStorageArr = localStorage.getItem('messageArr')

				if (messageLocalStorageArr.length) {
					messageLocalStorageArr.push(JSON.stringify(sendObj))
					localStorage.setItem('message', JSON.stringify(messageLocalStorageArr))
				} else {
					localStorage.setItem('message', JSON.stringify([messageLocalStorageArr]))
				}
			}

			setMessage('')
			if (userOnline) setUserOnline(false)
		}
	}

	useEffect(() => {
		if(!loading) {
			socket.on('message', async (data) => {

				switch (data?.msg) {
					case ('user_online'):
						if (!userOnline && data?.user_on !== id) {
							setUserOnline(true)
							console.log(data.msg);
						}
						break;
					case ('user_join'):
						if (!userOnline && data?.user_jo !== id) setUserOnline(true)
						break;
					case ('user_typing'):
						break;
					case ('msg_to_looooong'):
						break;
					case('user_leave'):
						setUserOnline(false)
						break;
					default: {
						break
					}
				}

				if (!data.msg) {
					if (data.sender?.id != id) {
						socket.emit('online', {'sender': usersData?.sender, 'recipient': usersData?.recipient, 'product': usersData?.product})
					}

					setMsgList(prev => [...prev, data])
				}
			})
		}
	}, [loading])

	const addChatHistory = () => {
		const objHistory = generateChatHistory(messageId)

		if (objHistory.companion_id && objHistory.companion_id) {
			axios.post(`${CHAT_URL_API}/chat_history`, objHistory).then(r => {
				if (r.data.data.length) {
					setMessageId(r.data.data.reverse()[0]?.id)
					setMessageUpdate(true)
					setMsgList(prev => [...r.data.data, ...prev])
				}
			})
		}
	}


	useEffect(() => {
		if (observer.current) observer.current.disconnect();
		if (refMessage.current && msgList) {
			const callback = function (entries) {
			if (entries[0].isIntersecting) {
				addChatHistory()
			}
			};
			observer.current = new IntersectionObserver(callback);
			observer.current.observe(refMessage.current);
		}
  	});

	const generateBackgroundMessage = (senderId, read) => {
		if (senderId == id) {
			if (userOnline) {
			return '#e9e9e9'
			} else {
				if (!read) return '#02bac7'
				return '#e9e9e9'
			}
		}
	}

	const generateMessageStatus = (senderId, read) => {
		if (senderId == id) {
			if (userOnline) {
				return 'Прочитано'
			} else {
				if (!read) return 'Доставлено'
				return 'Прочитано'
			}
		}
	}


	const handleKeyDown = (e) => {
		socket.emit('typing', {'sender': usersData?.sender, 'recipient': usersData?.recipient, 'product': usersData?.product})
		if (messageUpdate) setMessageUpdate(false)
		if (e.key == 'Enter') {
			handleSend()
		}
	}

	const handleInputClick = () => {
		refInput.current.click()
	}

	const handleChangeFile = async (e) =>  {
		const file = e.target.files[0];
		const reader = new FileReader();

		if (file?.type?.match('image')) {
			reader.onloadend = () => {
				const photoData = new FormData();
				photoData.append('files[]', file);

				axios.post(`${STATIC_URL}/chat`, photoData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(r => {
					const img = r.data?.images?.photos;
					console.log(img);
					if (img) handleSend(`${img}`)
				})
				
			}

			reader.readAsDataURL(file)
		}
	}

	//! ГЕНЕРАЦИЯ ВРЕМЕНИ ДЛЯ КАЖДОГО СООБЩЕНИЯ
	// const generateMessageData = (index) => {
	// 	const currentItem = index
	// 	const prevItem = index + 1

	// 	if (currentItem < msgList.length && prevItem < msgList.length) {
	// 		const currentItemTime = generateTime(0, msgList[currentItem]?.time, true)
	// 		const prevItemTime = generateTime(0, msgList[prevItem]?.time, true)
	// 		const senderMessage = msgList[currentItem].sender_id
	// 		const prevSenderMessage = msgList[prevItem].sender_id

	// 		if (senderMessage !== prevSenderMessage) {
	// 			return true
	// 		}

	// 		return !(prevItemTime == currentItemTime)
	// 	}
	// }

	// const testDate = () => {
	// 	const d1 = new Date(2017, 2, 11, 11, 30);
	// }


	//! ГЕНИРАЦИЯ ДЛЯ ДИАЛОГОВ (СЕГОДНЯ, ВЧЕРА, 17.10.2021)
	const generateDialogData = (index) => {
		const currentIndex = index
		const prevIndex = index - 1
		const date = new Date()
		const today = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
		// const timeUTC = date.getTimezoneOffset() / 60
		// console.log(`${date.getUTCHours() - timeUTC}:${date.getUTCMinutes()}`);

		// const moment = useMoment();
		// console.log(moment.tz.guess())
		// console.log(moment.tz("America/Los_Angeles").format())
		// testDate();


		if (prevIndex >= 0) {

			const prevDate = generateTime(0, msgList[prevIndex].time, false, true).split('.')
			const currentDate = generateTime(0, msgList[currentIndex].time, false, true).split('.')
			const messageStringDate = currentDate.join('.')

			// Проверка дня
			if (currentDate[0] !== prevDate[0]) {

				// Проверка месяца
				if (currentDate[1] !== prevDate[1]) {
					return messageStringDate
				}
				// Проверка года
				if (currentDate[2] !== prevDate[2]) {
					return messageStringDate
				}


				if (messageStringDate == today) {
					return 'Сегодня'
				}

				return messageStringDate
			}

		} else {
			const firstMessageTime = generateTime(0, msgList[index].time, false, true)

			if (firstMessageTime == today) {
				return 'Сегодня'
			}

			return firstMessageTime
		}
	}

	const openImage = (message) => {
		setFullScreenImg({state: true, src: message})
	}

	const generateMessage = (message) => {
		if (message.match('images/ch')) {
			if (message.match('.webp')) {
				const altName = message.split('.webp')[0]
				return (
					<div onClick={() => openImage(message)}>
						<img className='chatImg' src={`${STATIC_URL}/${message}`} alt={altName} />
					</div>
				)
			}
		}

		return <span>{message}</span>
	}



	return (
		<>
			<div ref={refChat} className="messageChats">
				{msgList?.map((item, index) => {
					const myMessage = item?.sender_id == id
					const key = id?.id ? id?.id : index
					const morePartnerMessage = msgList[index ? index - 1 : index]?.sender_id == item.sender_id

					item.messages_is_read = userOnline ? true: item.messages_is_read

					// const messageData = index == msgList.length - 1 ? true : generateMessageData(index)
					const dialogData = generateDialogData(index);

					return (
						item?.delete ? null :
						<>
							{dialogData && <div className='chatDataDialog'>{dialogData}</div>}
							<div key={key}
							ref={item.id == messageId ? refMessage : null} 
							className={myMessage ? "chatUser" : "chatCompanion"}>
								{myMessage ?  null :
									morePartnerMessage ? <div></div> :
										userChatPhoto ? <img src={`${STATIC_URL}/${userChatPhoto}`} /> :
											<ChatDefaultAvatar name={userChatName}/>
								}
								<div style={{backgroundColor: generateBackgroundMessage(item.sender_id, item.messages_is_read), transition: '.1s all linear'}}>
									{generateMessage(item?.message)}
									<div className='messageStatus'>{generateMessageStatus(item.sender_id, item.messages_is_read)}</div>
								</div>
								<div>{generateTime(0, item?.time, true)}</div>
							</div>
						</>
					)
				})}
              </div>
              <div className="messageChatInput">
                <button onClick={handleInputClick} className="messageFile">
					<input ref={refInput} onChange={(e) => handleChangeFile(e)} accept='image/jpeg,image/png,image/jpg' type='file' hidden/>
				</button>
                <input 
				className="messageInput" 
				type="text" 
				placeholder="Написать сообщение" 
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={handleKeyDown} 
				/>
                <button className="messageSend" onClick={() => handleSend()}></button>
              </div>
			  <Dialog
                  open={fullScreenImg.state}
                  onClose={() => setFullScreenImg({state: false, src: ''})}
                  // fullScreen={matchesMobile || matchesT}
              >
				  <div className='fullScreenImg'>
					  {fullScreenImg.src && <img src={`${STATIC_URL}/${fullScreenImg.src}`} alt='fullScreenImg'/>}
				  </div>
			  </Dialog>
		</>
	)
}

export default Chat;