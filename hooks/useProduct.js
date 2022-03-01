import { useEffect, useState } from 'react';
import { STATIC_URL } from '../lib/constants';
import { useAuth } from '../lib/Context/AuthCTX';
import { getDataByPost, getTokenDataByPost } from '../lib/fetch';
import router from 'next/router';


export function useProduct(id) {
	const [productInfo, setProductInfo] = useState({});
	const {id: userId, token} = useAuth();
	// преобразование в число для новой версии бека
	const intId = parseInt(id)

	useEffect(() => {
		if (typeof id === 'string' || typeof id === 'number') {

			// если токен есть, спрашиваем с токеном. Если нет, то спрашиваем БЕЗ токена.
			if(token){
				getTokenDataByPost('/api/getPost', { id: intId, 'user_id': userId }, token)
					// TODO: добавить обработчик статуса ответа и в useProduct
					.then((r) => {
						if (r !== undefined && typeof r !== 'string' ) {
							const communicationParse = JSON?.parse(r.communication)
							// console.log('rrrrrrrrrr',r)

							let photoes = JSON?.parse(r.photo);
							r.chatProductPhoto = photoes.photos[0]
							// console.log('$$$$$$$$$$$$$$$$',photoes)
							r.editPhotos = photoes?.photos
							// r.editPhotos = photoes
							photoes = photoes.photos.map(image => `${STATIC_URL}/${image}`)
							r.photo = photoes
							// console.log('r.photo',r.photo)
							// r.chatPhoto = r.userPhoto;
							// r.userPhoto = `${STATIC_URL}/${r.userPhoto}`;
							r.chatPhoto = r.user_photo;
							r.userPhoto = `${STATIC_URL}/${r.user_photo}`;
							r.isPhone = communicationParse?.phone || false;
							r.isMessage = communicationParse?.message || false;
							r.dayBefore = r.best_before
							setProductInfo(r);
						}
					})
					.catch((e) => {
						const resError = e.response
						if(resError.data?.message === 404) {
							// TODO: перербрасывать на страницу не найденного товара
							router.push("/notFound")
							// console.log('resError: ', resError)
						}
					})
				return
			}


			// запрос без токена
			getDataByPost('/api/getPost', { id: intId, 'user_id': userId },)
				// TODO: добавить обработчик статуса ответа и в useProduct
				.then((r) => {

					if (r !== undefined && typeof r !== 'string' ) {
						// console.log('rrrrrrrrrr',r)
						const communicationParse = JSON?.parse(r.communication)
						let photoes = JSON?.parse(r.photo);
						r.chatProductPhoto = photoes.photos[0]
						// console.log('$$$$$$$$$$$$$$$$',photoes)
						r.editPhotos = photoes?.photos
						// r.editPhotos = photoes
						photoes = photoes.photos.map(image => `${STATIC_URL}/${image}`)
						r.photo = photoes
						// console.log('r.photo',r.photo)
						// r.chatPhoto = r.userPhoto;
						// r.userPhoto = `${STATIC_URL}/${r.userPhoto}`;
						r.chatPhoto = r.user_photo;
						r.userPhoto = `${STATIC_URL}/${r.user_photo}`;
						r.isPhone = communicationParse?.phone || false;
						r.isMessage = communicationParse?.message || false;
						r.dayBefore = r.best_before
						setProductInfo(r);
					}
				})
				.catch((e) => {
					const resError = e.response
					if(resError.data?.message === 404) {
						// TODO: перербрасывать на страницу не найденного товара
						router.push("/notFound")
						// console.log('resError: ', resError)
					}
				})
		}
	}, [id])


	return {
		...productInfo,
		setProductInfo
	}
}
