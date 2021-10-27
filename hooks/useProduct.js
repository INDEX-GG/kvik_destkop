import { useEffect, useState } from 'react';
import { STATIC_URL } from '../lib/constants';
import { useAuth } from '../lib/Context/AuthCTX';
import { getDataByPost } from '../lib/fetch';


export function useProduct(id) {
	const [productInfo, setProductInfo] = useState({});
	const [productInfoFields, setProductInfoFields] = useState({});
	const {id: userId} = useAuth();
	useEffect(() => {
		if (typeof id === 'string' || typeof id === 'number') {
			getDataByPost('/api/getPost?123', { id: id, 'user_id': userId })
				.then((r) => {

					if (r !== undefined) {
						// console.log('rrrrrrrrrr',r)
						let editPhotos = JSON.parse(r.photo);
						let photoes = JSON.parse(r.photo);
						r.chatProductPhoto = photoes.photos[0]
						// console.log('$$$$$$$$$$$$$$$$',photoes)
						editPhotos = editPhotos.photos.map(image => {
							if(image.includes('http://192.168.45.195:6001/')){
								return image.replace('http://192.168.45.195:6001/','')
							}
							return `${image}`
						})
						r.editPhotos = editPhotos
						// console.log('editPhotos',editPhotos)
						photoes = photoes.photos.map(image => `${STATIC_URL}/${image}`)
						r.photo = photoes
						// console.log('r.photo',r.photo)
						r.chatPhoto = r.userPhoto;
						r.userPhoto = `${STATIC_URL}/${r.userPhoto}`;
						setProductInfo(r);
						if (r.subcategory !== undefined) {
							getDataByPost('/api/subcategoriesFields', { "post_id": id, "subcategory": r.subcategory })
								.then((r) => { setProductInfoFields(r) })
						}
					}
				})
		}
	}, [id])

	return {
		...productInfo,
		productInfoFields
	}
}
