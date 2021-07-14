import {useContext, useState} from 'react'
import { Box, Button, Dialog, makeStyles, TextField, Typography } from '@material-ui/core';
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
		  [buttonSubmit, setButtonSubmit] = useState(true),
		  {openConfirmNum, setOpenConfirmNum, phoneNum, sendData} = useContext(RegistrationCTX);

	const verifyNumber = (e) => {
		if (e.target.value === String(phoneNum).slice(-4)) {
			setButtonSubmit(false);
			setErrorVerify({ error: false, message: 'Код совпал' });
		} else {
			setButtonSubmit(true);
			setErrorVerify({ error: true, message: 'Неверный код подтверждения' })
		}
	}

	const handleSubmitNumber = (e) => {
		e.preventDefault();
		axios.post('/api/setApi', sendData).then((res) => console.log(res.data));
		//Место для логики ошибок и логина
		setOpenConfirmNum(!openConfirmNum);
	}

	return (       
		<Dialog open={openConfirmNum} onClose={() => setOpenConfirmNum(!openConfirmNum)} fullWidth maxWidth="sm">
			<Box className={classes.submitNumber}>
				<Typography align='center' variant='subtitle1'>На указанный телефон будет совершен звонок. Пожалуйста введите последние 4 цифры звонящего номера в поле ниже</Typography>
				<TextField className={classes.inputSubmit} onInput={(e) => verifyNumber(e)} label='4 последние цифры' variant="outlined" size='small' type='text' error={errorVerify.error} helperText={errorVerify.message}></TextField>
				<Button disabled={buttonSubmit} variant='contained' color='primary' onClick={e => handleSubmitNumber(e)}>Подтвердить</Button>
			</Box>
		</Dialog>
	)
}

export default ConfirmNumber
