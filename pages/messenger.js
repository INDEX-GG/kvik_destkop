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


const socket = io('http://localhost:8000', {transports: ['websocket']})

const Messenger = () => {
	const classes = useStyles();
	const [msg, setMsg] = useState('');
	const [msgList, setMsgList] = useState([]);

	const handleSend = () => {
		socket.emit('name1', {post: msg})
	}

	socket.on('name2', (data) => {
		
		if (msgList.length > 0) {
			setMsgList([...msgList, data])
		} else {
			setMsgList(data)
		}		
	})

	return (
		<Container className={classes.root} maxWidth='sm'>
			<Box className={classes.chat}>
				{msgList && msgList?.map((item, i) => {
					return <Typography key={i}>{item}</Typography>
				})}
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
