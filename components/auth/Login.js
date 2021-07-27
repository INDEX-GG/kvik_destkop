import {useContext, useState} from 'react';
import {Dialog, Box, Button, makeStyles, Typography, TextField } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from "next/router";
import { mutate } from 'swr';
import { DialogCTX } from '../../lib/Context/DialogCTX';
import RegForm from './RegForm';
import { useAuth } from '../../lib/Context/AuthCTX';
import PhoneMask from '../../lib/phoneMask';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    reg: {
        width: '300px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        '&>*': {
            marginBottom: theme.spacing(2),
        }
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing(4),
    },
}));

const Login = () => {
	const {signIn} = useAuth();
    const router = useRouter();
    const classes = useStyles();
    const { handleSubmit, control, setError, setValue } = useForm();
	const {openRegForm, setOpenRegForm, openLoginForm, setOpenLoginForm} = useContext(DialogCTX);
    const onSubmit = data => {
        data.phone = `+${data.phone.replace(/\D+/g, '')}`;
        console.log(data);
        axios.post('/api/checkUser', data).then((res) => {
            console.log(res.data);
            if (res?.data?.isset === false) {
					setError('phone', {type: 'validate', message: ' '})
					setError('password', {type: 'validate', message: 'Неверный номер или пароль'})
				} else {
            axios.post('/api/login', { id: res.data?.idUser }).then(() => mutate('/api/user'));
				signIn();
            setOpenLoginForm(!openLoginForm);
				setValueInp("");
				setValue('password', '');
				}
        })
    };

	const [valueInp, setValueInp] = useState("")

    return (
		<>
			<Dialog 
				open={openLoginForm} 
				onClose={() => {
					setValueInp('');
					setValue('password', '');
					setOpenLoginForm(!openLoginForm);

				}} 
				fullWidth maxWidth="sm">
				<Box className={classes.root}>
					<Box className={classes.reg}>
						<Typography className={classes.title} variant="h6">Вход</Typography>
						<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
							<Controller
								name="phone"
								control={control}
								defaultValue=''
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TextField label='Номер телефона'
										variant='outlined' size='small'
										type="tel"
										value={valueInp}
										onChange={(e) => onChange(PhoneMask(e, valueInp, setValueInp))}
										onKeyDown={(e) => {
											if (e.key == "Backspace" && e.target.value.length === 3) {
											setValueInp("");
											}
										}}
										error={!!error} helperText={error ? error.message : ' '} />
								)}
								rules={{ required: 'Введите номер телефона' }}
							/>
							<Controller
								name="password"
								control={control}
								defaultValue=''
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TextField label='Введите пароль'
										variant='outlined' size='small'
										type="password"
										value={value}
										onChange={onChange}
										error={!!error} helperText={error ? error.message : ' '} />
								)}
								rules={{ required: 'Введите пароль'}}
							/>
							<Button type='submit' disabled={false} variant="contained" color="primary">Войти</Button>
							<Button onClick={() => {setOpenLoginForm(!openLoginForm); setOpenRegForm(!openRegForm) }} variant='text' size='large' color='primary'>Регистрация</Button>
						</form>
					</Box>
				</Box>
			</Dialog>
			<RegForm/>
		</>
    )
}

export default Login;