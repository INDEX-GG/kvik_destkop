import axios from "axios"
import { CHAT_URL_API } from "../../../../lib/constants"

// Возвращает дату из объекта
export const generateTime = (UTC, time, onlyTime=false, onlyDate=false) => {
	const dateObj = JSON.parse(time)
	if (onlyDate) return `${dateObj.d}.${dateObj.mo}.${dateObj.y}`
	if (onlyTime) return `${UTC + +dateObj.h}:${dateObj.mi}`
	return `${dateObj.d}.${dateObj.mo}.${dateObj.y} ${UTC + +dateObj.h}:${dateObj.mi}`
}

// Возврощает первую фотку из массива
export const generateProductPhoto = (photos) => {
	if (photos) {
		const photosArr = JSON.parse(photos)?.photos
		return photosArr[0]
	}
  }

// Записываем в базу определённому пользователю полученный токен
export const generateDataToken = (id, token) => {
	token.then((r) => {
		// platform - платформа с которой был получен токе (1 - Андроид(Приложение), 2 - IOS(Приложение), 3 - web)
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

// Переадресация на определённую страницу в зависимости от разрешения экрана
export const chatPush = (router, dataObj) => {
	dataObj.mobile ? 
	router.push({
		pathname: `/account/${dataObj?.id}`,
		query: {
			account: 5,
			content: 1,
			companion_id: dataObj?.companion_id,
			product_id: dataObj?.product_id,
			// mobile - говорит, что нужно открыть модальное окно с чатом (срабатывает на телефоне)
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