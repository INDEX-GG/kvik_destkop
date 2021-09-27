import {useState, useEffect} from 'react';
import { Box, Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import {io} from 'socket.io-client';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'&>*': {
			marginBottom: '8px'
		}
	},
	chat: {
		width: '100%',
		minHeight: 300,
		border: '1px solid black',
		borderRadius: 8
	},
	myMessage: {
		backgroundColor: 'red'
	},
	yourMessage: {
		backgroundColor: 'lightblue'
	}
}));

let sender = {"id": 7, "name": "Станислав Даль"}
let recipient = {"id": 84}


//? Говорим, на каком домене будем обслуживать сокерт
// const socket = io('https://onekvik.ru', {path: "/cc/socket.io"})
const socket = io('http://192.168.8.111:6066')
// const socket = io('http://127.0.0.1:5000')



socket.emit('join', {'sender': sender, 'recipient': recipient})



const Messenger = () => {
	const classes = useStyles();
	const [msg, setMsg] = useState('');
	const [msgList, setMsgList] = useState([]);

	const handleSend = () => {
		//? Событие оправки между клиентом и сервером
		socket.emit('text', {'message': msg, 'sender': sender, 'recipient': recipient})
	}

	//? Пользователь подключается к серверу

	//? Пользователь отключился от сервера
	socket.on("disconnect", () => {
		socket.emit('disconnect', {'sender': sender, 'recipient': recipient})
	});

	//? Пользователь отправил сообщение
	useEffect(() => {
		socket.on('message', (data) => {
			if (!data.msg) {
				setMsgList(prev => [...prev, data])
			} 
		})
	}, [])


	useEffect(() => {
	}, [msgList])

	useEffect(() => {
		return (() => {
			localStorage.setItem('exit', '1')
		})
	})


	return (
		<Container className={classes.root} maxWidth='sm'>
			<Box>
			<Box>
				{msgList.map((item, index) => {
					return <Typography className={item.sender.id == 84 ? classes.myMessage : classes.yourMessage} key={index}>{item.message}</Typography>
				})}
			</Box>
			</Box>
			<TextField
				size='small'
				label='New message'
				fullWidth
				variant='outlined'
				value={msg}
				onChange={e => setMsg(e.target.value)}
			/>
			<Button
				onClick={() => handleSend()}
				variant='contained'
				color='primary'>
				Отправить
			</Button>
			<Button onClick={() => socket.disconnect()}>
				disconnect
			</Button>
			<Button onClick={() => socket.connect()}>
				connect
			</Button>
		</Container>
	)
}

export default Messenger;
