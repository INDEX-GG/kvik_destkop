import React, {useState, useRef } from 'react'
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import ProductYMAP from './product/ProductYMAP';
// import {useCity} from '../lib/Context/CityCTX'
import { Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';
import {invalidСharacterLocation} from "../lib/regulars"
import {useStore} from '../lib/Context/Store'

const useStyles = makeStyles(() => ({
	mapDesc: {
		fontSize: '12px',
		color: '#C7C7C7',
		margin: '2px 0 16px'
	}
}))


const DadataSuggest = () => {

	const classes = useStyles()
	const [value, setValue] = useState();
	const [error, setError] = useState(false)

	const inputRef = useRef()
	const prevValue = useRef()
	const methods = useFormContext();
	const {userInfo} = useStore()

	const userAddressName = userInfo?.location?.name
	const userAddressGeo = userInfo?.location?.geo

	const onSubmit = (onChange) => {
		const value = inputRef.current.state.query
		if (value.length && value.length > 1 && value != prevValue.current) {
			const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
			const token = "3fa959dcd662d65fdc2ef38f43c2b699a3485222";
			var options = {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": "Token " + token
			},
			body: JSON.stringify({query: value})
			}
			fetch(url, options)
			.then(response => response.text())
			.then(result => {
				prevValue.current = value
				if (JSON.parse(result)?.suggestions[0] != undefined) {
					setValue(JSON.parse(result)?.suggestions[0])
					onChange(JSON.parse(result)?.suggestions[0])
					setError(false)
				} else {
					onChange('')
					setValue('')
					setError(true)
				}
			})
			.catch(error => console.log("error", error));
			}
	}

	return (
		userAddressName && userAddressGeo ? 
		<div>
			 <Controller
               name="location"
               control={methods.control}
			   defaultValue={userInfo?.location?.name}
               render={({field: {value, onChange: controlChange}}) => (
                  	<AddressSuggestions 
					token="3fa959dcd662d65fdc2ef38f43c2b699a3485222" 
					count={5}
					ref={inputRef} 
					minChars={3}  
					value={value}
					defaultQuery={userInfo?.location?.name}
					// containerClassName='productInputMap'
					onChange={(e) => {
						controlChange(e)
						setValue(e)
					}}
					inputProps={{
						onKeyDown: (e) => {
							if (e.key == 'Enter') {
							onSubmit(controlChange)
							}
						},
						onBlur: () => {
							onSubmit(controlChange)
						},
						placeholder: 'Введите город, улицу, дом'
					}}
					// selectOnBlur={true} 
					/>
               )}
			   rules={{ 
				   required: 'Укажите ваше местоположение...',
				   pattern: {value: invalidСharacterLocation() , message: 'Недопустимые символы' },
			   }}
            />
			{error ? <div className={classes.mapDesc}>Введите корректный адрес</div> : <div className={classes.mapDesc}>Введите название и выберете из списка населенный пункт и улицу</div>}
			<ProductYMAP coordinates={value ? [value.data.geo_lat, value.data.geo_lon] : [+userAddressGeo[0], +userAddressGeo[1]]} height={224} width={490} border={true}/>
		</div> : null
	)
}

export default DadataSuggest