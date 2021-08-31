import { useContext, useState } from 'react';
import { Dialog, Box, Button, makeStyles, Typography, TextField } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form';
import { DialogCTX } from '../../lib/Context/DialogCTX';
import RegForm from './RegForm';
import { useAuth } from '../../lib/Context/AuthCTX';
import PhoneMask from '../../lib/phoneMask';
import { useMedia } from "../../hooks/useMedia"
import { useStore } from '../../lib/Context/Store';
import { getDataByPost } from '../../lib/fetch';

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
	modalContainer: {
		textAlign: "center",
		padding: "16px 0px 27px",
		boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
		marginBottom: "24px"
	}
}));

const Login = () => {
	const { signIn } = useAuth();
	const { storeUser } = useStore();
	const classes = useStyles();
	const { handleSubmit, control, setError, setValue } = useForm();
	const { openRegForm, setOpenRegForm, openLoginForm, setOpenLoginForm } = useContext(DialogCTX);
	const { matchesMobile } = useMedia()
	const onSubmit = data => {
		data.phone = `+${data.phone.replace(/\D+/g, '')}`;
		console.log(data);
		getDataByPost('/api/checkUser', data).then((res) => {
			console.log(res);
			if (res?.isset === false) {
				setError('phone', { type: 'validate', message: ' ' })
				setError('password', { type: 'validate', message: 'Неверный номер или пароль' })
			} else {
				getDataByPost('/api/login', { id: res?.idUser }).then(() => signIn())	//session//authCtx
				storeUser(res?.idUser);													//store
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
				open={openLoginForm || false}
				fullScreen={matchesMobile ? true : false}
				onClose={() => {
					setValueInp('');
					setValue('password', '');
					setOpenLoginForm(!openLoginForm);
				}}
				fullWidth maxWidth="sm">

				{matchesMobile ?
					<div className="modal__block__top accountTop">
						<>
							<div onClick={() => setOpenLoginForm(!openLoginForm)} className="accountArrowLeft"></div>
							<div className={classes.modalContainer}>
								<h6 className="modal__block__top_title">Вход</h6>
							</div>
						</>
					</div> : null}
				<Box className={classes.root}>
					<Box className={classes.reg}>
						{matchesMobile ? null : <Typography className={classes.title} variant="h6">Вход</Typography>}
						<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
							<Controller
								name="phone"
								control={control}
								defaultValue=''
								render={({ field: { onChange }, fieldState: { error } }) => (
									<TextField label='Номер телефона'
										variant='outlined' size='small'
										type="tel"
										autoComplete='tel'
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
										autoComplete='current-password'
										value={value}
										onChange={onChange}
										error={!!error} helperText={error ? error.message : ' '} />
								)}
								rules={{ required: 'Введите пароль' }}
							/>
							<Button type='submit' disabled={false} variant="contained" color="primary">Войти</Button>
							<Button onClick={() => { setOpenLoginForm(!openLoginForm); setOpenRegForm(!openRegForm) }} variant='text' size='large' color='primary'>Регистрация</Button>
						</form>
					</Box>
				</Box>
			</Dialog>
			<RegForm />
		</>
	)
}

export default Login;