import axios from 'axios';
import React, { useRef, useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useMedia } from '../../../../../hooks/useMedia';
import RightArrow from '../../../../../UI/icons/RightArrow';
import {getTokenDataByPost} from "../../../../../lib/fetch";


const AccountCity = ({userData}) => {
	const [changeAddress, setChangeAddress] = useState(false)
	const [cityValue, setCityValue] = useState()
	const inputRef = useRef()
	const {matchesMobile, matchesTablet} = useMedia()

	const {id, setUserInfo, userInfo, token} = userData


	async function onChangeAddress() {
		setChangeAddress(!changeAddress)
		if (changeAddress && cityValue?.value && cityValue?.value.length > 1 && cityValue?.value != userInfo.address) {
			await fetchAdress(inputRef)
			getTokenDataByPost('/api/settings/upAddress', {id: id, address: cityValue.value}, token)
			  .then(() => {
				  setChangeAddress(!changeAddress)
				  setUserInfo({...userInfo, address: cityValue.value})
				  setChangeAddress(!changeAddress)
			  })
			return;
		}
	}

	async function fetchAdress (inputRef) {
		const value = inputRef.current.state.query
		if (value.length > 1 && value != userInfo?.address && value != cityValue?.value) {
			const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
			const token = "3fa959dcd662d65fdc2ef38f43c2b699a3485222";
			var options = {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": "Token " + token
				}
			}

			await axios.post(url, JSON.stringify({query: value}), options)
			.then(result => {
				console.log(1)
				if (result.data?.suggestions[0]) {
					setCityValue(result.data?.suggestions[0])
				}
			})
			.catch(error => console.log("error", error));
		}
	}

	return (
			<div>
				<div>Город</div>
				{changeAddress ? 
				<AddressSuggestions 
					token="3fa959dcd662d65fdc2ef38f43c2b699a3485222"
					value={cityValue}
					count={3}
					ref={inputRef}
					onChange={(e) => {
						setCityValue(e)
					}}
					inputProps={{
						onBlur: () => {
							fetchAdress(inputRef)
						}
					}}
					defaultQuery={userInfo?.address ? userInfo?.address : ''}  /> : 
				<div className="clientPage__city">{userInfo?.address ? userInfo?.address : 'Город, Район, Улица'}</div>}
				{matchesMobile || matchesTablet ? 
				<a><div className="changeMobile"><div>Город</div><RightArrow /></div></a> : 
				<button className='privateButton' onClick={onChangeAddress}>{changeAddress ? 'Сохранить' : 'Изменить'}</button>}
			</div>
	)


}

export default AccountCity;