import {useContext, useState} from 'react'
import { Box, Dialog, makeStyles, TextField, Typography } from '@material-ui/core';
import { RegistrationCTX } from '../../lib/Context/DialogCTX';
import axios from 'axios';

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

    const classes = useStyles();
	const [errorVerify, setErrorVerify] = useState({ error: true, message: 'Введите цифры' }),
		  	{openConfirmNum, setOpenConfirmNum, phoneNum, sendData} = useContext(RegistrationCTX);

	const regUser = () => {
		axios.post('/api/setApi', sendData).then((r) => {
			console.log(r.data)
			switch (r.data?.message) {
			case 'user created':
				return alert('Регистрация прошла успешно'); //Сделать модалку
			case 'user already exists':
				return alert('Вы уже зарегестрированы') //Не тестировалось!!!
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

export default ConfirmNumber
