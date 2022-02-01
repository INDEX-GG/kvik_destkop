import { useEffect, useState } from 'react';
import { STATIC_URL } from '../lib/constants';
import { useAuth } from '../lib/Context/AuthCTX';
import { getDataByPost } from '../lib/fetch';
import router from 'next/router';


export function useProduct(id) {
	const [productInfo, setProductInfo] = useState({});
	const {id: userId} = useAuth();
	// преобразование в число для новой версии бека
	const intId = parseInt(id)

	useEffect(() => {
		if (typeof id === 'string' || typeof id === 'number') {
			// запрос для старой версии бека (id это число )
			// getDataByPost('/api/getPost?123', { id: id, 'user_id': userId })
			console.log('отправляем запрос: ')
			getDataByPost('/api/getPost?123', { id: intId, 'user_id': userId })
				.then((r) => {

					if (r !== undefined) {
						console.log('rrrrrrrrrr',r)

						let photoes = JSON.parse(r.photo);
						r.chatProductPhoto = photoes.photos[0]
						// console.log('$$$$$$$$$$$$$$$$',photoes)
						r.editPhotos = photoes?.photos
						// r.editPhotos = photoes
						photoes = photoes.photos.map(image => `${STATIC_URL}/${image}`)
						r.photo = photoes
						// console.log('r.photo',r.photo)
						r.chatPhoto = r.userPhoto;
						r.userPhoto = `${STATIC_URL}/${r.userPhoto}`;
						setProductInfo(r);
					}
				})
				.catch((e) => {
					const resError = e.response
					if(resError.data?.message === 404) {
						// TODO: перербрасывать на страницу ошибка сервера
						// router.push("/500")
						console.log(1)
					}
				})
		}
	}, [id])

	return {
		...productInfo,
	}
}
