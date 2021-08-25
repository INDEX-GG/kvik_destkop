import { useEffect, useState } from 'react';
import { STATIC_URL } from '../lib/constants';
import { getDataByPost } from '../lib/fetch';

export function useProduct(id) {
	const [productInfo, setProductInfo] = useState({});
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