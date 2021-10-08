import { io } from "socket.io-client"
import { CHAT_URL, SOCKET_URL } from "../../../../lib/constants"

//? Говорим, на каком домене будем обслуживать сокерт
// const socket = io('https://onekvik.ru', {path: "/cc/socket.io"})
// const socket = io('http://192.168.8.111:6066', {path: SOCKET_URL})
// const socket = io('http://127.0.0.1:5000')

export const socket = io(CHAT_URL, {path: SOCKET_URL})