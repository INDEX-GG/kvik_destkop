import axios from "axios"
import { CHAT_URL_API } from "../../../../lib/constants"

export const generateTime = (UTC, time, onlyTime=false, onlyDate=false) => {
	const dateObj = JSON.parse(time)
	if (onlyDate) return `${dateObj.d}.${dateObj.mo}.${dateObj.y}`
	if (onlyTime) return `${UTC + +dateObj.h}:${dateObj.mi}`
	return `${dateObj.d}.${dateObj.mo}.${dateObj.y} ${UTC + +dateObj.h}:${dateObj.mi}`
}

export const generateProductPhoto = (photos) => {
	if (photos) {
		const photosArr = JSON.parse(photos)?.photos
		return photosArr[0]
	}
  }

export const generateDataTocken = (id, token) => {
	token.then((r) => {
		const obj = {"user_id": id, "platform": 3, "token":r }

		if (r) {
			try {
				axios.post(`${CHAT_URL_API}/push_token`, obj)
			} catch (e) {
				console.log(e)
			}
		}
	})
}

export const chatPush = (router, dataObj) => {
	dataObj.mobile ? 
	router.push({
		pathname: `/account/${dataObj?.id}`,
		query: {
			account: 5,
			content: 1,
			companion_id: dataObj?.companion_id,
			product_id: dataObj?.product_id,
			mobile: 'on'
		},
	}) : 
	router.push({
		pathname: `/account/${dataObj?.id}`,
		query: {
			account: 5,
			content: 1,
			companion_id: dataObj?.companion_id,
			product_id: dataObj?.product_id,
		},
	})
}