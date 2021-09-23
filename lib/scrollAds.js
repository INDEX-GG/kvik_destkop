import { STATIC_URL } from "./constants";

import { getDataByPost } from "./fetch";
import { modifyGetPostsData } from "./services";

export const scrollAds = async (id, page, limit, data, setData, setLastIdAds, setLimitRanderPage, setPage) => {
	console.log(id)
	if (page > 1) {
		await getDataByPost('/api/getPostsPortion', {'page_limit': limit, 'page': page, 'user_id': id}).then(r => {
			setLimitRanderPage(0)
			if (r.length == 0) setPage('end');
			if (r.length) {
				setData([...data, ...modifyGetPostsData(r)])
				setLastIdAds(r[r.length - 1].id)
			}
		})
	}
}

export const categoryScroll = async (aliasFillUrl, limit, page, setData, setLimitRanderPage, setPage, setLastIdAds) => {
	await getDataByPost('/api/postCategorySearch', { data: aliasFillUrl, 'page_limit': limit, 'page': page }).then(r => {
		if (r !== undefined) {
			const offersData = r.map(offer => {
				return {
					...offer,
					photo: JSON.parse(offer.photo)?.photos.map(img => `${STATIC_URL}/${img}`)
				}
			})
			if (r.length == 0) setPage('end');
			if (r.length) {
				setData(prev => [...prev, ...offersData]);
				setLastIdAds(r[r.length - 1].id)
			}
		}
	})
	setLimitRanderPage(0)
}

export const firstAds = (id, page, limit, setData, setLastIdAds) => {
	getDataByPost('/api/getPostsPortion', {'page_limit': limit, 'page': page, 'user_id': id}).then(r => { 
			setData(modifyGetPostsData(r))
			if (r?.length > 1) setLastIdAds(r[r.length - 1].id)
		 })
}


export const observerGenerate = (lastElement, observer, limitRender, setLimitRenderPage, setPage, page) => {
	if (lastElement.current) {
			if (observer.current) observer.current.disconnect();

			let callback = (entries) => {
				if (entries[0].isIntersecting && limitRender == 0 && page != 'end') {

						console.log('UPDAAAAAAAAAAAAAAAAAAAAATE')
						if (!limitRender && setLimitRenderPage) setLimitRenderPage(1)
						if (setPage) setPage(page + 1)
				}
			};

			observer.current = new IntersectionObserver(callback);
			observer.current.observe(lastElement.current);
		}
}