import {useState} from 'react';
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
	}
}));


const socket = io('http://192.168.8.111:6066', {transports: ['websocket']})
console.log(socket);
const Messenger = () => {
	const classes = useStyles();
	const [msg, setMsg] = useState('');
	const [msgList, setMsgList] = useState([]);

	const handleSend = () => {
		console.log('Отправка')
		socket.emit('message', msg)
	}

	socket.on('message', (data) => {
		console.log(data);
		setMsgList(data)
	})

	return (
		<Container className={classes.root} maxWidth='sm'>
			<Box>
			<Typography>{JSON.stringify(msgList)}</Typography>
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
		</Container>
	)
}

export default Messenger;
