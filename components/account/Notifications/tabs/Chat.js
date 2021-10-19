import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../../lib/Context/AuthCTX'
import { useRouter } from 'next/router';
import { useStore } from '../../../../lib/Context/Store';
import axios from 'axios';
import { CHAT_URL_API, STATIC_URL } from '../../../../lib/constants';
import { socket } from './socket';
import { generateTime } from './chatFunctions';
// import { generateTime } from './chatFunctions';


const Chat = ({usersData, userChatPhoto}) => {

	const [message, setMessage] = useState('');
	const [msgList, setMsgList] = useState();
	const [messageId, setMessageId] = useState(null)
	const [messageUpdate, setMessageUpdate] = useState(false)
	const [userOnline, setUserOnline] = useState(false)
	const [loading, setLoading] = useState(true)
	const [socketConnect, setSocketConnect] = useState(false)

	const refChat = useRef()
	const refInput = useRef()
	const refMessage = useRef()
	const observer = useRef()

	const {userInfo} = useStore()
	const {query} = useRouter()
	const {id} = useAuth()

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


	const chatHistory = () => {
		axios.post(`${CHAT_URL_API}/chat_history`, generateChatHistory()).then(r => {
			if (userOnline) setUserOnline(false)
			console.log("SOCKET CONNECT")
			setMsgList(r.data.data.reverse())
			if (r.data.data.length) setMessageId(r.data.data[0]?.id)
			setSocketConnect(true)
			setLoading(false)
			socket.connect()
		})
	}

	useEffect(() => {
		if (query?.companion_id && query?.product_id && userInfo?.name && id) {
			socket.emit('join', {'sender': usersData?.sender, 'recipient': usersData?.recipient, 'product': usersData?.product})
			chatHistory()
		}
	}, [query, userInfo, id])


	useEffect(() => {
		if (refChat.current && !messageUpdate) {
			refChat.current.scrollTop = refChat.current.scrollHeight + 100
			console.log(refChat.current.scrollTop)
		} else {
			refChat.current.scrollTop = refChat.current.scrollHeight / 2
		}
		// refChat.current.scrollTop = refChat.current.scrollHeight
		console.log(1);
	}, [msgList])




 	const handleSend = async (img = false) => {
		if (message.length > 0 || img) {
			let data = new Date()
			const messageDate = {
				"y": data.getFullYear(), 
				"mo": data.getMonth(), 
				"d": data.getDate(), 
				"h": data.getHours(), 
				"mi": data.getMinutes()
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

			await socket.emit('text', sendObj)

			setMessage('')
			if (userOnline) setUserOnline(false)
		}
	}

	useEffect(() => {
		if(!loading) {
			socket.on('message', async (data) => {

				switch (data?.msg) {
					case ('user_online'):
						if (!userOnline && data?.user_on != id) setUserOnline(true)
						break;
					case ('user_join'):
						if (!userOnline && data?.user_jo != id) setUserOnline(true)
						break;
					case ('user_typing'):
						break;
					case ('msg_to_looooong'):
						break;
					case('user_leave'):
						setUserOnline(false)
						break;
					default: {
						console.log(1)
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
		axios.post(`${CHAT_URL_API}/chat_history`, generateChatHistory(messageId)).then(r => {
			if (r.data.data.length) {
				setMessageId(r.data.data.reverse()[0]?.id)
				setMessageUpdate(true)
				setMsgList(prev => [...r.data.data, ...prev])
			}
		})
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


	const handleKeyDown = (e) => {
		socket.emit('typing', {'sender': usersData?.sender, 'recipient': usersData?.recipient, 'product': usersData?.product})
		if (messageUpdate) setMessageUpdate(false)
		if (e.key == 'Enter' && e.target.value.length <= 300) {
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

				console.log(photoData.getAll('files[]'))

				axios.post(`${STATIC_URL}/chat`, photoData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(r => {
					const img = r.data?.images?.photos;			
					if (img) handleSend(`${STATIC_URL}/${img}`)
				})
				
			}

			reader.readAsDataURL(file)
		}
	}

	const generateMessageData = (index) => {
		//! Идём снизу вверх (от 50 к 1)

		const currentItem = msgList.length - (index + 1) 
		const prevItem = msgList.length - (index + 2)

		if (prevItem >= 0) {
			const currentItemTime = generateTime(0, msgList[currentItem]?.time, true)
			const prevItemTime = generateTime(0, msgList[prevItem]?.time, true)

			console.log(msgList[currentItem])
			console.log(msgList[prevItem])
			return (prevItemTime == currentItemTime)
		}
	}


	return (
		<>
			<div ref={refChat} className="messageChats">
				{msgList?.map((item, index) => {
					const myMessage = item?.sender_id == id
					item.messages_is_read = userOnline ? true: item.messages_is_read
					const key = id?.id ? id?.id : index
					const morePartnerMessage = msgList[index ? index - 1 : index]?.sender_id == item.sender_id
					
					const i = index == 0 ? index : index - 1
					const test = generateMessageData(index)
					const time = (generateTime(0, item.time, true) == generateTime(0, msgList[i]?.time, true))
				
					if (item.message.match('http://192.168.8.111:6001/images')) {
						if (item.message.match('.webp')) {
							const altName = item.message.split('.webp')[0]
							return (
								<div key={key}
								ref={item.id == messageId ? refMessage : null} 
								className={myMessage ? "chatUser" : "chatCompanion"}>
									{myMessage ?  null : morePartnerMessage ? <div></div> : <img src={`${STATIC_URL}/${userChatPhoto}`} />}
									<div style={{backgroundColor: generateBackgroundMessage(item.sender_id, item.messages_is_read), transition: '.1s all linear'}}>
										<img className='chatImg' src={item.message} alt={altName} />
									</div>
									<div>{test && generateTime(0, item?.time, true)}</div>
								</div>
							)
						}
					}


					return (
						item?.delete ? null :
						<div key={key}
						  ref={item.id == messageId ? refMessage : null} 
						  className={myMessage ? "chatUser" : "chatCompanion"}>
							{myMessage ?  null : morePartnerMessage ? <div></div> : <img src={`${STATIC_URL}/${userChatPhoto}`} />}
							<div style={{backgroundColor: generateBackgroundMessage(item.sender_id, item.messages_is_read), transition: '.1s all linear'}}>
								{item.message}
							</div>
							<div>{!time && generateTime(0, item?.time, true)}</div>
						</div>
					)
				})}
              </div>
              <div className="messageChatInput">
                <button onClick={handleInputClick} className="messageFile">
					<input ref={refInput} onChange={(e) => handleChangeFile(e)} accept='image/.png, .jpg, .jpeg' type='file' hidden/>
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
		</>
	)
}

export default Chat;