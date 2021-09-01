import { useEffect, useState } from 'react';
import { STATIC_URL } from '../lib/constants';
import { useStore } from '../lib/Context/Store';
import { getDataByPost } from '../lib/fetch';

export function useProduct(id) {
	const {offerId} = useStore();
	const [productInfo, setProductInfo] = useState({});
	console.log(offerId, id)
	id = offerId || id;
	console.log(id);
	useEffect(() => {
		if (typeof id === 'string' || typeof id === 'number') {
			getDataByPost('/api/getPost?123', { id: id })
				.then((r) => {
					if (r !== undefined) {
						let photoes = JSON.parse(r.photo);
						photoes = photoes.photos.map(image => `${STATIC_URL}/${image}`)
						r.photo = photoes
						r.userPhoto = `${STATIC_URL}/${r.userPhoto}`;
						setProductInfo(r);
					}
				})
		}
	}, [id])
	return {
		...productInfo
	}
}