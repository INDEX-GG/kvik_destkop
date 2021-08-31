import { useContext, useState } from 'react'
import { Box, Dialog, makeStyles, TextField, Typography } from '@material-ui/core';
import { RegistrationCTX } from '../../lib/Context/DialogCTX';
import { getDataByPost } from '../../lib/fetch';
import { useAuth } from '../../lib/Context/AuthCTX';
import { useStore } from '../../lib/Context/Store';

const useStyles = makeStyles((theme) => ({
	submitNumber: {
		display: 'flex',
		padding: theme.spacing(4),
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		'&>*': {
			margin: theme.spacing(1),
		}
	},
	inputSubmit: {
		'& input': {
			textAlign: 'center',
		}
	}
}));

const ConfirmNumber = () => {
	const {signIn} = useAuth();
	const {storeUser} = useStore();
	const classes = useStyles();
	const [errorVerify, setErrorVerify] = useState({ error: true, message: 'Введите цифры' }),
		{ openConfirmNum, setOpenConfirmNum, phoneNum, sendData } = useContext(RegistrationCTX);

	const regUser = () => {
		getDataByPost('/api/setApi', sendData).then((r) => {
			console.log(r)
			switch (r?.message) {
				case 'user created':
					return ( 
						getDataByPost('/api/login', { id: r.id }).then(() => signIn()),	//session//authCtx
						storeUser(r.id)								//store
					)												//Сделать модалку
				case 'user already exists':
					return alert('Вы уже зарегестрированы')
			}
		});
		setOpenConfirmNum(!openConfirmNum);
	}

	const verifyNumber = (e) => {
		if (e.target.value === String(phoneNum).slice(-4)) {
			setErrorVerify({ error: false, message: 'Код совпал' });
			regUser();
		} else {
			setErrorVerify({ error: true, message: 'Неверный код подтверждения' })

		}
	}

	return (
		<Dialog open={openConfirmNum || false} onClose={() => setOpenConfirmNum(!openConfirmNum)} fullWidth maxWidth="sm">
			<Box className={classes.submitNumber}>
				<Typography align='center' variant='subtitle1'>На указанный телефон будет совершен звонок. Пожалуйста введите последние 4 цифры звонящего номера в поле ниже</Typography>
				<TextField className={classes.inputSubmit} onInput={(e) => verifyNumber(e)} label='4 последние цифры' variant="outlined" size='small' type='text' error={errorVerify.error} helperText={errorVerify.message}></TextField>
			</Box>
		</Dialog>
	)
}

export default ConfirmNumber;