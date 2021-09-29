import React, {useState, useRef } from 'react'
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import ProductYMAP from './product/ProductYMAP';
import {useCity} from '../lib/Context/CityCTX'
import { Controller, useFormContext } from 'react-hook-form';

const DadataSuggest = () => {

	const [value, setValue] = useState();
	const inputRef = useRef()
	const prevValue = useRef()
	const {city} = useCity()
	const methods = useFormContext();

	console.log(methods.control)


	const onSubmit = () => {
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
				setValue(JSON.parse(result)?.suggestions[0])
				console.log(prevValue.current)
			})
			.catch(error => console.log("error", error));
			}
	}

	return (
		<div>
			 <Controller
               name="location"
               control={methods.control}
			   defaultValue={city}
               render={({field: {value, onChange}}) => (
                  	<AddressSuggestions 
					token="3fa959dcd662d65fdc2ef38f43c2b699a3485222" 
					count={5}
					ref={inputRef} 
					minChars={3}  
					value={value}
					defaultQuery={city}
					onChange={(e) => {
						onChange(e)
						setValue(e)
					}}
					inputProps={{
						onKeyDown: (e) => {
							if (e.key == 'Enter') {
							onSubmit()
							}
						},
						placeholder: 'Введите город, улицу, дом'
					}}
					// selectOnBlur={true} 
					/>
               )}
            />
			<ProductYMAP coordinates={value ? [value.data.geo_lat, value.data.geo_lon] : [55.7558, 37.6173]} height={224} width={490}/>
		</div>
	)
}

export default DadataSuggest