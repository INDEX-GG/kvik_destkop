import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../../lib/Context/AuthCTX'
import {io} from 'socket.io-client';
// import axios from 'axios';
import { useRouter } from 'next/router';
import { useStore } from '../../../../lib/Context/Store';


// let sender = {"id": 50, "name": "Станислав Даль"}
// let recipient = {"id": 51}
// let product = {"id": 70}

//? Говорим, на каком домене будем обслуживать сокерт
// const socket = io('https://onekvik.ru', {path: "/cc/socket.io"})
const socket = io('http://192.168.8.111:6066', {path: "/socket.io"})
// const socket = io('http://127.0.0.1:5000')



const Chat = ({usersData: {sender, recipient, product}, messageData = [], userChatPhoto}) => {
	const [message, setMessage] = useState('');
	const [msgList, setMsgList] = useState(messageData);
	const {query} = useRouter()
	const refChat = useRef()
	const refInput = useRef()
	const {userInfo} = useStore()
	const {id} = useAuth()

	useEffect(() => {
		setMsgList(messageData)
	}, [messageData])

	useEffect(() => {
		if (query?.customer_id && query?.seller_id && query?.product_id && userInfo?.name && id) {
			// socket.disconnect()
			socket.emit('join', {'sender': sender, 'recipient': recipient, 'product': product})
		}
	}, [query, userInfo, id])

	useEffect(() => {
		if (refChat.current) {
			refChat.current.scrollTop = refChat.current.scrollHeight
		}
	}, [msgList])

	// useEffect(() => {
	// 	setMsgList([])
	// }, [query])

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
				// 'userPhoto':
			}
			await socket.emit('text', sendObj)
			//  {'message': message, 'sender': sender, 'recipient': recipient, 'product': product, 'date': messageDate}
			setMessage('')
		}
	}

	useEffect(() => {
		socket.on('message', (data) => {
			if (!data.msg) {
				console.log(data)
				if (data.sender?.id != id) {
					socket.emit('online', {'sender': sender, 'recipient': recipient, 'product': product})
				}
				setMsgList(prev => [...prev, data])
			}
		})
		// return (() => {
		// 	setMsgList([])
		// })
	}, [])


	const handleKeyDown = (e) => {
		socket.emit('typing', {'sender': sender, 'recipient': recipient, 'product': product})
		if (e.key == 'Enter') {
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
				{msgList.map((item, index) => {
					const myMessage = item?.sender_id == id
					return (
						item?.delete ? null :
						<div key={index} className={myMessage ? "chatUser" : "chatLocutor"}>
							{myMessage ? null : <img src={userChatPhoto} />}
							<div>{item.message}</div>
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