import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../../lib/Context/AuthCTX'
import {io} from 'socket.io-client';
// import axios from 'axios';
import { useRouter } from 'next/router';
import { useStore } from '../../../../lib/Context/Store';
import axios from 'axios';
import { CHAT_URL_API, SOCKET_URL, STATIC_URL } from '../../../../lib/constants';


// let sender = {"id": 50, "name": "Станислав Даль"}
// let recipient = {"id": 51}
// let product = {"id": 70}

//? Говорим, на каком домене будем обслуживать сокерт
// const socket = io('https://onekvik.ru', {path: "/cc/socket.io"})
const socket = io('http://192.168.8.111:6066', {path: SOCKET_URL})
// const socket = io('http://127.0.0.1:5000')



const Chat = ({usersData: {sender, recipient, product}, userChatPhoto}) => {

	const [message, setMessage] = useState('');
	const [msgList, setMsgList] = useState();
	const [messageId, setMessageId] = useState(null)
	const [messageUpdate, setMessageUpdate] = useState(false)
	const [userOnline, setUserOnline] = useState(false)
	const [loading, setLoading] = useState(true)

	const refChat = useRef()
	const refInput = useRef()
	const refMessage = useRef()
	const observer = useRef()

	const {userInfo} = useStore()
	const {query} = useRouter()
	const {id} = useAuth()

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
			setMsgList(r.data.data.reverse())
			setMessageId(r.data.data[0]?.id)
			setLoading(false)
		})
	}

	useEffect(() => {
		if (query?.companion_id && query?.product_id && userInfo?.name && id) {
			socket.emit('join', {'sender': sender, 'recipient': recipient, 'product': product})
			chatHistory()
		}
	}, [query, userInfo, id])

	useEffect(() => {
		if (refChat.current && !messageUpdate) {
			refChat.current.scrollTop = refChat.current.scrollHeight
		} else {
			refChat.current.scrollTop = refChat.current.scrollHeight / 2
		}
	}, [msgList])


 	const handleSend = async () => {
		if (message.length > 0) {
			let data = new Date()
			const messageDate = `${data.getHours()}:${data.getMinutes() > 9 ? data.getMinutes() : `0${data.getMinutes()}`}`

			const sendObj = {
				'delete': false, 
				'message': message, 
				'messages_is_read': false, 
				'recipient': recipient, 
				'sender': sender,
				'sender_id': sender.id,
				'product': product, 
				'time': messageDate,
			}
			await socket.emit('text', sendObj)
			setMessage('')
		}
	}

	console.log(1)

	useEffect(() => {
		if(!loading) {
			socket.on('message', (data) => {

				if (data.msg == 'user_online') {
					if (!userOnline) setUserOnline(true)
				} else if (data.msg == 'user_join') {
					if (data.user_jo != id) {
						if (!userOnline) setUserOnline(true)
					}
				} else if (data.msg == 'user_typing') {
					return;
				} else if (data.msg == 'msg_to_looooong') {
					return;
				}

				if (!data.msg) {
					if (data.sender?.id != id) {
						socket.emit('online', {'sender': sender, 'recipient': recipient, 'product': product})
					}
					setMsgList(prev => [...prev, data])
				}
			})
		}
	}, [loading])

	console.log(userOnline)


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
		if (refMessage.current) {
			const callback = function (entries) {
			if (entries[0].isIntersecting) {
				console.log(messageId, refMessage.current)
				addChatHistory()
			}
			};
			observer.current = new IntersectionObserver(callback);
			observer.current.observe(refMessage.current);
		}
  	});

	const generateBackgroundMessage = (senderId, read) => {
		if (senderId == id ) {
			return '#e9e9e9'
		}
		if (!read) {
			return 'lightblue'
		} else {
			return '#e9e9e9'
		}
	}	


	const handleKeyDown = (e) => {
		socket.emit('typing', {'sender': sender, 'recipient': recipient, 'product': product})
		if (messageUpdate) setMessageUpdate(false)
		if (e.key == 'Enter' && e.target.value.length <= 300) {
			handleSend()
		}
	}

	const handleInputClick = () => {
		refInput.current.click()
	}

	function handleChangeFile()  {
		const reader = new FileReader();
		console.log(reader)
		// reader.readAsDataURL(this.files[0]);
	}



	return (
		<>
			<div ref={refChat} className="messageChats">
				{msgList?.map((item, index) => {
					const myMessage = item?.sender_id == id
					return (
						item?.delete ? null :
						<div key={index}
						  ref={item.id == messageId ? refMessage : null} 
						  className={myMessage ? "chatUser" : "chatLocutor"}>
							{myMessage ? null : <img src={`${STATIC_URL}/${userChatPhoto}`} />}
							<div style={{backgroundColor: generateBackgroundMessage(item.id, item.messages_is_read)}}>
								{item.message}
							</div>
							<div>{item.tiem}</div>
						</div>
					)
				})}
              </div>
              <div className="messageChatInput">
                <button onClick={handleInputClick} className="messageFile">
					<input ref={refInput} onChange={handleChangeFile} accept='image/.png, .jpg, .jpeg' type='file' hidden/>
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