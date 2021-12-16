import React, { useRef } from "react";
import { Box, Button, InputAdornment, makeStyles, TextField, Typography } from "@material-ui/core";
import Link from "next/link";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ConfirmNumberV2 } from "./ConfirmNumberV2";
import PhoneMask from "../../lib/phoneMask";
import { useMedia } from "../../hooks/useMedia";
import { getDataByPost } from "../../lib/fetch";
import PasswordStrengthBar from 'react-password-strength-bar';

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
	},
	reg: {
		width: "300px",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		"&>*": {
			marginBottom: theme.spacing(2),
		},
	},
	title: {
		textAlign: "center",
		marginBottom: theme.spacing(4),
	},
	submitNumber: {
		display: "flex",
		padding: theme.spacing(4),
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		"&>*": {
			margin: theme.spacing(1),
		},
	},
	inputSubmit: {
		"& input": {
			textAlign: "center",
		},
	},
	modalContainer: {
		textAlign: "center",
		padding: "16px 0px 27px",
		boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
		marginBottom: "24px",
	},
	link: {
		color: "#00A0AB",
		textDecorationLine: "underline"
	},
	loginInfo: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
		alignItems: "center",
		padding: "1em 0"
	},
	loginButton: {
		color: "#00A0AB",
		textDecorationLine: "underline",
		fontSize: "18px",
		padding: "0"
	},
}));

/**
 * @param {object} props 
 * @param {(arg: boolean) => void} props.changeAuthForm
 */
export function RegFormV2({ changeAuthForm }) {
	const [sendData, setSendData] = useState({})
	const [isPhoneValidation, switchValidationView] = useState(false)
	const [phoneNum, setPhoneNum] = useState('')
	const classes = useStyles();
	const { handleSubmit, control, setValue } = useForm();
	const { matchesMobile } = useMedia();
	const [showPassword, setShowPassword] = useState(false);

	const [valueInp, setValueInp] = useState("");

	const clearFields = () => {
		setValue("name", "");
		setValue("surname", "");
		setValue("phone", "");
		setValue("password", "");

	};

	/**
	 * @param {{ phone: string }} data 
	 */
	const onSubmit = async (data) => {
		data.phone = formatPhoneNumber(valueInp);
		setSendData(data);
		// getDataByPost("/api/checkphone", {phone: data.phone}).then((res) => {
		//   setPhoneNum(res);
		//   closeRegForm();
		//   setOpenConfirmNum(true);
		// });
		getDataByPost('/api/callPhone', { "phone": data.phone }).then(() => {
			clearFields();
			switchValidationView(true);
			setPhoneNum(data.phone)
		})
	};

	const passLengthRef = useRef()


	return (
		<>
			{isPhoneValidation
				? (<ConfirmNumberV2
					setOpenConfirmNum={switchValidationView}
					phoneNum={phoneNum}
					sendData={sendData}
				/>)
				: (<Box className={classes.root}>
					<Box className={classes.reg}>
						{matchesMobile ? null : (
							<Typography className={classes.title} variant="h6">
								Регистрация
							</Typography>
						)}
						<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
							<Controller
								name="name"
								control={control}
								defaultValue=""
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<TextField
										label="Имя"
										variant="outlined"
										size="small"
										type="text"
										autoComplete="given-name"
										value={value}
										onChange={onChange}
										error={!!error}
										helperText={error ? error.message : " "}
									/>
								)}
								rules={{ required: "Введите имя" }}
							/>
							<Controller
								name="phone"
								control={control}
								defaultValue=""
								render={({ field: { onChange }, fieldState: { error } }) => (
									<TextField
										label="Номер телефона"
										variant="outlined"
										size="small"
										type="tel"
										autoComplete="tel"
										value={valueInp}
										onChange={(e) =>
											onChange(PhoneMask(e, valueInp, setValueInp))
										}
										onKeyDown={(e) => {
											if (e.key === "Backspace" && e.target.value.length === 3) {
												setValueInp("");
											}
										}}
										error={!!error}
										helperText={error ? error.message : " "}
									/>
								)}
								rules={{ required: "Введите номер телефона" }}
							/>
							<Controller
								name="password"
								control={control}
								defaultValue=""
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<>
										<TextField
											label="Введите пароль "
											variant="outlined"
											size="small"
											type={showPassword ? 'text' : 'password'}
											autoComplete="new-password"
											value={value}
											onChange={onChange}
											error={!!error}
											helperText={error ? error.message : " "}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<a
															className={!showPassword ? "pDPassInputWrapperInv" : "pDPassInputWrapperVis"}
															onClick={() => {
																setShowPassword(!showPassword);
															}}
														/>
													</InputAdornment>
												)
											}}
										/>
										{value.length > 0 && <PasswordStrengthBar
											ref={passLengthRef}
											minLength={1}
											shortScoreWord={''}
											barColors={['#C7C7C7', '#F44545', '#F44545', '#00A0AB', '#00A0AB']}
											scoreWords={['Короткий', 'Короткий', 'Очень простой', 'Хороший', 'Надёжный']}
											password={value}
										/>}
									</>


								)}
								rules={{ required: "Введите пароль" }}
							/>

							<Button
								type="submit"
								disabled={false}
								variant="contained"
								color="primary"
							>
								Продолжить
							</Button>
						</form>
					</Box>
					<Typography variant="subtitle1">
						При регистрации вы соглашаетесь с
					</Typography>
					<Link href="#">
						<a className={classes.link}>Лицензионным соглашением</a>
					</Link>
					<div className={classes.loginInfo}>
						<Typography variant="subtitle2">Уже есть аккаунт?</Typography>
						<Button
							className={classes.loginButton}
							onClick={() => {
								changeAuthForm(false)
							}}
							variant="text"
							size="large"
							color="primary"
						>
							Войти
						</Button>
					</div>
				</Box>)
			}
		</>
	)
}

/**
 * @param {string} phoneNumber 
 * @returns {string}
 */
function formatPhoneNumber(phoneNumber) {
	return `+${phoneNumber.replace(/\D+/g, "")}`
}