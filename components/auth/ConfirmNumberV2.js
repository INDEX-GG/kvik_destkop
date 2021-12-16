import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, FormGroup, makeStyles, TextField, Typography } from '@material-ui/core';
import { getDataByPost } from '../../lib/fetch';
import { useAuth } from '../../lib/Context/AuthCTX';
import { useStore } from '../../lib/Context/Store';
import { SecretData } from "../../lib/SecretData";
import { Controller, useForm } from "react-hook-form";

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
	formGroup: {
		marginTop: '16px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		'& > *:last-child': {
			marginRight: '0px'
		}
	},
	formItem: {
		width: 36,
		height: 36,
		marginRight: '12px',
		'& > div': {
			height: '36px',
			'& > input': {
				paddingLeft: '14px',
				paddingRight: '14px',
				fontSize: '14px !important',
			}
		},
	},
	inputBlock: {
		display: "flex",
		justifyContent: "center",
	},
	title: {
		textAlign: "center",
		marginBottom: theme.spacing(2),
	},
	error: {
		color: '#F44545',
		fontSize: '12px',
		textAlign: 'center'
	}

}));

/**
 * @param {object} props
 * @param {(arg: boolean) => void} props.setOpenConfirmNum
 * @param {string} props.phoneNum
 * @param {object} props.sendData
 * @param {boolean} [props.registrantion]
 * @param {string} [props.resetPhone]
 * @param {(token: string) => void} props.changePassword
 */
export const ConfirmNumberV2 = ({ 
	setOpenConfirmNum, 
	phoneNum, 
	sendData, 
	registrantion = false, 
	resetPhone = '', 
	changePassword, 
}) => {

	const classes = useStyles();
	const { signIn } = useAuth();
	const { storeUser } = useStore();
	const methods = useForm();
	const smsRef1 = useRef()
	const smsRef2 = useRef()
	const smsRef3 = useRef()
	const smsRef4 = useRef()
	const [allSms, setAllSms] = useState('');
	const [error, setError] = useState(false);

	const regUser = () => {
		getDataByPost('/api/setApi', { ...sendData, ...SecretData(sendData) }).then((r) => {
			// console.log(r)
			switch (r?.message) {
				case 'user created':
					return (
						getDataByPost('/api/checkUser', SecretData({ phone: sendData.phone, password: sendData.password })).then(() => (
							signIn(),
							storeUser(r.id)
						))
					)
				case 'user already exists':
					return alert('Вы уже зарегестрированы')
			}
		});
		setOpenConfirmNum(false);
	}

	useEffect(() => {
		if (methods.watch('smsValue1') && methods.watch('smsValue2') && methods.watch('smsValue3') && methods.watch('smsValue4')) {
			setAllSms(`${methods.watch('smsValue1')}${methods.watch('smsValue2')}${methods.watch('smsValue3')}${methods.watch('smsValue4')}`);
		} else {
			if (allSms) setAllSms('');
			if (error) setError(false);
		}
	}, [methods.watch('smsValue1'), methods.watch('smsValue2'), methods.watch('smsValue3'), methods.watch('smsValue4')]);


	/**
	 * @param {string} value 
	 * @param {number} field 
	 * @param {(...event: any[]) => void} onChange 
	 */
	const changeSmsInput = (value, field, onChange) => {

		// console.log(+value + 0);
		// console.log(isNaN(+value + 0));

		if (!value.length) {
			onChange(value);
		} else {
			onChange(value[value.length - 1]);
		}

		if (value.length) {
			switch (field) {
				case 1:
					smsRef2.current.focus();
					smsRef2.current.select();
					break;
				case 2:
					smsRef3.current.focus();
					smsRef3.current.select();
					break;
				case 3:
					smsRef4.current.focus();
					smsRef4.current.select();
					break;
			}
		}
	};

	const handleKeyDown = (e, inputNumber) => {
		if (e.key === 'ArrowLeft') {
			if (inputNumber === 2) {
				smsRef1.current.focus();
			}
			if (inputNumber === 3) {
				smsRef2.current.focus();
			}
			if (inputNumber === 4) {
				smsRef3.current.focus();
			}
		}

		if (e.key === 'ArrowRight') {
			if (inputNumber === 1) {
				smsRef2.current.focus();
			}
			if (inputNumber === 2) {
				smsRef3.current.focus();
			}
			if (inputNumber === 3) {
				smsRef4.current.focus();
			}
		}

		if (e.key === 'Backspace') {
			if (inputNumber === 4) {
				methods.setValue('smsValue4', '');
				smsRef4.current.select();
				setTimeout(function () {
					smsRef3.current.focus();
					smsRef3.current.select();
				}.bind(this), 10);
			}

			if (inputNumber === 3) {
				smsRef3.current.select();
				setTimeout(function () {
					smsRef2.current.focus();
					smsRef2.current.select();
				}.bind(this), 10);
			}

			if (inputNumber === 2) {
				smsRef2.current.select();
				setTimeout(function () {
					smsRef1.current.focus();
					smsRef1.current.select();
				}.bind(this), 10);
			}

			if (inputNumber === 1) {
				smsRef1.current.select();
			}
		}
	};


	const verifyNumber = () => {
		// if (allSms === String(phoneNum).slice(-4)) {
		// 	setError({ error: false, message: 'Код совпал' });
		// 	regUser();
		// } else {
		// 	setError({ error: true, message: 'Неверный код подтверждения' })
		//
		// }

		if (allSms.length === 4) {
			getDataByPost('/api/checkphone', { "phone": resetPhone ? resetPhone : phoneNum, "code": allSms })
				.then(r => {
					if (r?.message === 'time error') {
						setError({ error: true, message: 'Превышено количество попыток, повторите позже' })
					}


					if (r?.check) {
						if (!registrantion) {
							regUser()
						} else {
							changePassword(r.authToken)
						}
					} else {
						setError({ error: true, message: 'Неверный код подтверждения' })
					}
				})
		}
	}


	return (
		<Box className={classes.submitNumber}>
			{
				registrantion && (
					<Typography className={classes.title} variant="h6">
						Восстановление пароля
					</Typography>
				)
			}
			
			<Typography align='center' variant='subtitle1'>На указанный телефон будет совершен звонок.<br /> Пожалуйста
				введите последние 4 цифры <br /> звонящего номера в поле ниже.</Typography>
			<Box className={classes.inputBlock}>
				<FormGroup className={classes.formGroup}>
					<Controller
						name='smsValue1'
						control={methods.control}
						defaultValue=''
						render={({ field: { onChange, value } }) => (
							<TextField
								className={classes.formItem}
								size='small'
								variant='outlined'
								type={'tel'}
								autoFocus={true}
								onKeyDown={(e) => handleKeyDown(e, 1)}
								inputRef={smsRef1}
								value={value}
								inputProps={{ maxLength: 1 }}
								onChange={(e) => changeSmsInput(e.target.value, 1, onChange)}
							/>
						)} />
					<Controller
						name='smsValue2'
						control={methods.control}
						defaultValue=''
						render={({ field: { onChange, value } }) => (
							<TextField
								className={classes.formItem}
								size='small'
								variant='outlined'
								type={'tel'}
								onKeyDown={(e) => handleKeyDown(e, 2)}
								inputRef={smsRef2}
								value={value}
								inputProps={{ maxLength: 1 }}
								onChange={(e) => changeSmsInput(e.target.value, 2, onChange)}
							/>
						)} />
					<Controller
						name='smsValue3'
						control={methods.control}
						defaultValue=''
						render={({ field: { onChange, value } }) => (
							<TextField
								className={classes.formItem}
								size='small'
								variant='outlined'
								type={'tel'}
								onKeyDown={(e) => handleKeyDown(e, 3)}
								inputRef={smsRef3}
								value={value}
								inputProps={{ maxLength: 1 }}
								onChange={(e) => changeSmsInput(e.target.value, 3, onChange)}
							/>
						)} />
					<Controller
						name='smsValue4'
						control={methods.control}
						defaultValue=''
						render={({ field: { onChange, value } }) => (
							<TextField
								className={classes.formItem}
								size='small'
								type={'tel'}
								inputRef={smsRef4}
								onKeyDown={(e) => handleKeyDown(e, 4)}
								variant='outlined'
								value={value}
								inputProps={{ maxLength: 1 }}
								onChange={(e) => changeSmsInput(e.target.value, 4, onChange)}
							/>
						)} />
				</FormGroup>
			</Box>
			{error && <Typography className={classes.error} variant='h6'>Неверный код подтвержения</Typography>}
			<Button
				onClick={() => verifyNumber(allSms)}
				variant="text"
				size="large"
				color="primary"
				className={allSms.length ? 'active' : 'disabled'}
				// onClick={handleCheckCallPhone}
				disabled={Boolean(!allSms)}
			>
				{registrantion ? 'Продолжить' : 'Зарегистрироваться'}
			</Button>
		</Box>
	)
}
