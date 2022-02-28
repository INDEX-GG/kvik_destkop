import React, { useState, useRef, useEffect } from "react"
import { AddressSuggestions } from "react-dadata"
// import 'react-dadata/dist/react-dadata.css';
import ProductYMAP from "./product/ProductYMAP"
// import {useCity} from '../lib/Context/CityCTX'
import { Controller, useFormContext } from "react-hook-form"
import { makeStyles, useMediaQuery } from "@material-ui/core"
import { invalidСharacterLocation } from "../lib/regulars"
import { useStore } from "../lib/Context/Store"
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
	mapDesc: {
		fontSize: "12px",
		color: "#C7C7C7",
		margin: "2px 0 16px",
	},
	mapError: {
		color: "red",
	},
	mobile: {
		[theme.breakpoints.down(960)]: {
			"& > *:first-child": {
				"& > div > input": {
					borderRadius: "0",
					height: "48px",
					fontSize: "18px",
					fontWeight: "500",
					marginBottom: "18px",
					background: "#FFFFFF",
					boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
					border: "0",
					fontFamily: "inherit",
					color: "#151515",
					"&::placeholder": {
						color: "#8F8F8F",
					},
				},
			},

			"& > *:last-child": {
				// padding: "0 10px",
			},
		},
	},
	myContainer: {
		background: "inherit",
		border: "none",
		display: "flex",
		flexDirection: "column",
		position: "relative",

		'& .react-dadata__suggestion': {
			background: 'inherit',
			border:' none !important',
			boxShadow: 'none !important',

			fontFamily: 'Roboto',
			fontStyle: 'normal',
			fontWeight: 'normal',
		}
	},
	my_suggestion: {
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '15px',
		lineHeight: '18px',

		/* Наш почти черный */

		color: '#2c2c2c',

		display: 'flex',
		flexDirection: 'column',
		marginBottom: '15px',
		/* background: grey, */

		width: '100%',
		height: '100%',
		margin: '0',
		padding: '0',
		position: 'absolute',
		top: '60px',
	},
	suggestion_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '3px',
	},
	suggestion_title: {
    fontSize: '15px',
    lineHeight: '18px',
	},
	suggestion_SubTitle: {
    color: 'gray',
    fontSize: '12px',
    lineHeight: '14px',
	},
}))

const DadataSuggest = ({ mobile = false /**  address */ }) => {
	const classes = useStyles()
	const [value, setValue] = useState()
	const [error, setError] = useState(false)
	const media960 = useMediaQuery("(max-width: 960px)")

	const inputRef = useRef()
	const prevValue = useRef()
	const methods = useFormContext()
	const { userInfo } = useStore()

	const userAddressName =
		methods.getValues("location") || userInfo?.location?.name
	const userAddressGeo =
		methods.getValues("coordinates") || userInfo?.location?.geo

	const defaultAddress = methods.watch("address")

	// эффект для записи в форму значения, если мы на странице редактирования и данные о местоположении в объявлении у нас уже есть.
	useEffect(() => {
		if (defaultAddress) {
			let value = inputRef.current.state.query
			// временный фикс для корректного заполнения поля, в мобильной версии
			value = typeof value === "object" ? defaultAddress : value

			const url =
				"https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address"
			const token = "3fa959dcd662d65fdc2ef38f43c2b699a3485222"
			var options = {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Token " + token,
				},
				body: JSON.stringify({ query: value }),
			}

			fetch(url, options)
				.then((response) => response.json())
				.then((result) => {
					prevValue.current = value
					if (result?.suggestions[0] !== undefined) {
						setValue(result?.suggestions[0])
						methods.setValue("location", result?.suggestions[0])
						setError(false)
					} else {
						setValue("")
						setError(true)
					}
				})
				.catch((error) => console.log("error", error))
		}
	}, [defaultAddress])

	// логика для подставки дефолтного адреса из юзерстора, выполнится только при подаче нового объявления.
	// то есть адрес по умолчанию всегда будет адресом, который юзер указал в настройках

	useEffect(() => {
		if (!defaultAddress && userInfo) {
			// const value = inputRef.current.state.query
			const value = userInfo.address

			const url =
				"https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address"
			const token = "3fa959dcd662d65fdc2ef38f43c2b699a3485222"
			var options = {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Token " + token,
				},
				body: JSON.stringify({ query: value }),
			}

			fetch(url, options)
				.then((response) => response.json())
				.then((result) => {
					prevValue.current = value
					if (result?.suggestions[0] !== undefined) {
						setValue(result?.suggestions[0])
						methods.setValue("location", result?.suggestions[0])
						setError(false)
					} else {
						setValue("")
						setError(true)
					}
				})
				.catch((error) => console.log("error", error))
		}
	}, [defaultAddress, userInfo])

	const onSubmit = (onChange) => {
		const value = inputRef.current.state.query
		if (value.length && value.length > 1 && value !== prevValue.current) {
			const url =
				"https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address"
			const token = "3fa959dcd662d65fdc2ef38f43c2b699a3485222"
			var options = {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Token " + token,
				},
				body: JSON.stringify({ query: value }),
			}
			fetch(url, options)
				.then((response) => response.json())
				.then((result) => {
					prevValue.current = value
					if (result?.suggestions[0] !== undefined) {
						setValue(result?.suggestions[0])
						onChange(result?.suggestions[0])
						setError(false)
					} else {
						onChange("")
						setValue("")
						setError(true)
					}
				})
				.catch((error) => console.log("error", error))
		}
	}


	return userAddressName && userAddressGeo ? (
		<div className={classes.mobile}>
			<Controller
				name="location"
				control={methods.control}
				// defaultValue={address || userInfo?.location?.name}
				defaultValue={defaultAddress || ""}
				render={({ field: { value, onChange: controlChange } }) => (
					<AddressSuggestions
						token="3fa959dcd662d65fdc2ef38f43c2b699a3485222"
						count={5}
						ref={inputRef}
						minChars={3}
						delay={5}
						value={value}
						defaultQuery={value}
						filterFromBound="city-region"
						filterToBound="house"
						// defaultQuery={address || userInfo?.location?.name}
						// containerClassName='productInputMap'

						onChange={(e) => {
							console.log(e, "onChange")
							controlChange(e)
							setValue(e)
						}}
						inputProps={{
							onKeyDown: (e) => {
								if (e.key === "Enter") {
									onSubmit(controlChange)
								}
							},
							onBlur: () => {
								onSubmit(controlChange)
							},
							placeholder: media960
								? "Введите адрес "
								: "Введите город, улицу, дом",
						}}
						// selectOnBlur={true}
						containerClassName={clsx({
							[classes.myContainer]: media960
						})}
						suggestionsClassName={clsx({
							[classes.my_suggestion]: media960
						})}
						renderOption={media960 ? (suggest) => {
							const {value} = suggest
							const {
								city,
								region_with_type,
								country,
								// street_with_type,
								// house,
							} = suggest.data

							// const string = (street_with_type === null && house === null) ? `${street_with_type ? street_with_type : ""}${house ? ", " + house: ""}` : value
							const string = value
							const stringSub = `${
								city ? city + ", " : ""
							} ${region_with_type}, ${country}`

							return (
								<div
									className={classes.suggestion_wrapper}
								>
									<div
										className={classes.suggestion_title}
									>
										{string}
									</div>
									<div
										className={classes.suggestion_SubTitle}
									>
										{stringSub}
									</div>
								</div>
							)
						} : null}
					/>
				)}
				rules={{
					required: "Укажите ваше местоположение...",
					pattern: {
						value: invalidСharacterLocation(),
						message: "Недопустимые символы",
					},
				}}
			/>
			{!media960 && (
				<>
					{error || methods.formState.errors?.location ? (
						<div className={`${classes.mapDesc} ${classes.mapError}`}>
							Введите корректный адрес
						</div>
					) : (
						<div className={classes.mapDesc}>
							Введите название и Выберите из списка населенный пункт и улицу
						</div>
					)}
					<ProductYMAP
						height={mobile ? 400 : 224}
						width={490}
						border={true}
						coordinates={
							value
								? [value.data.geo_lat, value.data.geo_lon]
								: [+userAddressGeo[0], +userAddressGeo[1]]
						}
					/>
				</>
			)}
		</div>
	) : null
}

export default DadataSuggest
