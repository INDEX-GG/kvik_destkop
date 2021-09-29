import React, {useState} from 'react'
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import ProductYMAP from './product/ProductYMAP';

const DadataSuggest = () => {

	const [value, setValue] = useState();
	
	// const handleSumbit = (e) => {
	// 	var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
	// 	var token = "3fa959dcd662d65fdc2ef38f43c2b699a3485222";
	// 	var query = value

	// 	console.log(value)

	// 	var options = {
	// 	method: "POST",
	// 	mode: "cors",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		"Accept": "application/json",
	// 		"Authorization": "Token " + token
	// 	},
	// 	body: JSON.stringify({query: query})
	// 	}
	// 	fetch(url, options)
	// 	.then(response => response.text())
	// 	.then(result => console.log(JSON.parse(result)))
	// 	.catch(error => console.log("error", error));
	// }


	console.log(value)

	return (
		<div>
			<AddressSuggestions token="3fa959dcd662d65fdc2ef38f43c2b699a3485222" value={value} onChange={setValue} />;
			<ProductYMAP coordinates={value ? [value.data.geo_lat, value.data.geo_lon] : [55.7558, 37.6173]}/>
		</div>
	)
}

export default DadataSuggest