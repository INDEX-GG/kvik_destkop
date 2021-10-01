import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../../lib/Context/AuthCTX'
import {io} from 'socket.io-client';
import axios from 'axios';


let sender = {"id": 50, "name": "Станислав Даль"}
let recipient = {"id": 51}
let product = {"id": 70}

//? Говорим, на каком домене будем обслуживать сокерт
// const socket = io('https://onekvik.ru', {path: "/cc/socket.io"})
const socket = io('http://192.168.8.111:6066', {path: "/socket.io"})
// const socket = io('http://127.0.0.1:5000')


socket.emit('join', {'sender': sender, 'recipient': recipient, 'product': product})

const Chat = () => {
	const [message, setMessage] = useState('');
	const [msgList, setMsgList] = useState([]);
	const refChat = useRef()
	const refInput = useRef()

	const {id} = useAuth()


	if (id) {
		// axios.post('http://192.168.8.111:6066/chat_last_messages', {'user_id': 84}, {
		// 	headers: {
		// 		'Access-Control-Allow-Origin': '*',
		// 	},
		// 	proxy: {
		// 		host: '192.168.8.111',
		// 		port: 6066
		// 	}
		// }).then(r => console.log(r.data))
		axios.post('http://192.168.8.111:6066/chat_last_messages', {'user_id': 84}).then(r => console.log(r.data))
	}

	useEffect(() => {
		if (refChat.current) {
			refChat.current.scrollTop = refChat.current.scrollHeight
		}
	}, [msgList])

	const handleSend = async () => {
		if (message.length > 0) {
			let data = new Date()
			const messageDate = `${data.getHours()}:${data.getMinutes() > 9 ? data.getMinutes() : `0${data.getMinutes()}`}`
			//? Событие оправки между клиентом и сервером
			//! Убрать дату
			await socket.emit('text', {'message': message, 'sender': sender, 'recipient': recipient, 'product': product, 'date': messageDate})
			setMessage('')
		}
	}

	//? Пользователь подключается к серверу
	socket.on('connect', () => {
		// console.log('Зашёл')
	})

	socket.on("disconnect", (reason) => {
		 console.log(reason) // undefined
		// console.log('Ушёл')
		// socket.emit('disconnect', {'sender': sender, 'recipient': recipient})
	});

	useEffect(() => {
		socket.on('message', (data) => {
			if (!data.msg) {
				console.log(data.sender)
				if (data.sender?.id != id) {
					socket.emit('online', {'sender': sender, 'recipient': recipient, 'product': product})
				}

				setMsgList(prev => [...prev, data])
			}
		})

		return (() => {
			setMsgList([])
		})
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
                {/* <div className="messageChat">
                  <div className="chatDate small light">00.00.00</div>
                  <div className="chatLocutor">
                    <img src="https://source.unsplash.com/random?portrait" />
                    <div>ТекстТекстТекстТекстТексТекстТекст</div>
                    <div>00:00</div>
                  </div>
                  <div className="chatUser">
                    <div>ТекстТе кстТек стТекс тТе ксТекстТекст ТекстТе кстТек стТекс тТе ксТекстТекст ТекстТе кстТек стТекс тТе ксТекстТекст ТекстТе кстТек стТекс тТе ксТекстТекст</div>
                    <div>00:00</div>
                  </div>
                </div> */}
				{msgList.map((item, index) => {
					const myMessage = item.sender.id == 50
					return (
						<div key={index} className={myMessage ? "chatUser" : "chatLocutor"}>
							{myMessage ? null : <img src="https://source.unsplash.com/random?portrait" />}
							<div>{item.message}</div>
							<div>{item.date}</div>
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