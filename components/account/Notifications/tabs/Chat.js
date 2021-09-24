import React, { useEffect, useRef, useState } from 'react';

import {io} from 'socket.io-client';


let sender = {"id": 84, "name": "Станислав Даль"}
let recipient = {"id": 7}

//? Говорим, на каком домене будем обслуживать сокерт
// const socket = io('https://onekvik.ru', {path: "/cc/socket.io"})
const socket = io('http://192.168.8.111:6066')
// const socket = io('http://127.0.0.1:5000')


socket.emit('join', {'sender': sender, 'recipient': recipient})

const Chat = () => {
	const [message, setMessage] = useState('');
	const [msgList, setMsgList] = useState([]);
	const refChat = useRef()

	const handleSend = () => {
		if (message.length > 0) {
			let data = new Date()
			const messageDate = `${data.getHours()}:${data.getMinutes() > 9 ? data.getMinutes() : `0${data.getMinutes()}`}`
			//? Событие оправки между клиентом и сервером
			//! Убрать дату
			socket.emit('text', {'message': message, 'sender': sender, 'recipient': recipient, 'date': messageDate})
			setMessage('')
		}
	}

	//? Пользователь подключается к серверу
	socket.on('connect', () => {
		console.log('Зашёл')
		socket.on('playerConnected', () => {
			console.log('Кто-то зашёл')
		})
	})

	socket.on("disconnect", (reason) => {
		console.log(reason) // undefined
		console.log('Ушёл')
		// socket.emit('disconnect', {'sender': sender, 'recipient': recipient})
	});

	useEffect(() => {
		window.addEventListener('onunload', () => {
			localStorage.setItem('exit', '1')
		})
	})

	useEffect(() => {
		socket.on('message', (data) => {
			if (!data.msg) {
				setMsgList(prev => [...prev, data])
				console.log(refChat.current.innerHeight)
			}
		})

		return (() => {
			setMsgList([])
		})
	}, [])

	useEffect(() => {
		console.log(msgList)
	}, [msgList])


	socket.on("reconnect_attempt", () => {
		console.log('1')
	});

	socket.on("reconnect", () => {
		console.log('2')
	});

	socket.on("data", () => {
		console.log('1')
	 });

	 socket.on("greetings", (elem1, elem2, elem3) => {
		console.log(elem1, elem2, elem3);
		console.log('1')
	});

	const handleKeyDown = (e) => {
		console.log(e.key)
		if (e.key == 'Enter') {
			handleSend()
		}
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
					console.log(item)
					const myMessage = item.sender.id == 84
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
                <button className="messageFile"></button>
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