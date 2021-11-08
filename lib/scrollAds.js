import { STATIC_URL } from "./constants";

import { getDataByPost } from "./fetch";
import { modifyGetPostsData } from "./services";

export const scrollAds = async (id, isAuth, page, limit, data, setData, setLastIdAds, setLimitRanderPage, setPage) => {
	if (isAuth) {
		if (page > 1 && id) {
		await getDataByPost('/api/getPostsPortion', {'page_limit': limit, 'page': page, 'user_id': id}).then(r => {
			setLimitRanderPage(0)
			if (r.length == 0) setPage('end');
			if (r.length) {
				setData([...data, ...modifyGetPostsData(r)])
				setLastIdAds(r[r.length - 1].id)
			}
		})
		}
	} else {
		if (page > 1) {
			await getDataByPost('/api/getPostsPortion', {'page_limit': limit, 'page': page, 'user_id': id ? id : 0}).then(r => {
			setLimitRanderPage(0)
			if (r.length == 0) setPage('end');
			if (r.length) {
				setData([...data, ...modifyGetPostsData(r)])
				setLastIdAds(r[r.length - 1].id)
			}
		})
		}
	}
}

export const categoryScroll = async (api, fetchDataObj, setObj) => {
	await getDataByPost(api, fetchDataObj).then(r => {
		if (r !== undefined) {
			try {
				const offersData = r.map(offer => {
				return {
					...offer,
					photo: JSON.parse(offer.photo)?.photos.map(img => `${STATIC_URL}/${img}`)
				}
				})
				if (r.length == 0) setObj.setPage('end');
				if (r.length) {
					setObj.setData(prev => [...prev, ...offersData]);
					setObj.setLastIdAds(r[r.length - 1].id)
				}
			} catch(e) {
				console.log(e);
			}
		}
	})
	setObj.setLimitRenderPage(0)
}

export const firstAds = (id,isAuth, page, limit, setData, setLastIdAds) => {
	if (isAuth) {
		if (id) {
			getDataByPost('/api/getPostsPortion', {'page_limit': limit, 'page': page, 'user_id': id}).then(r => { 
			setData(modifyGetPostsData(r))
			if (r?.length > 1) setLastIdAds(r[r.length - 1].id)
		 })
		}
	} else {
		getDataByPost('/api/getPostsPortion', {'page_limit': limit, 'page': page, 'user_id': 0}).then(r => { 
			setData(modifyGetPostsData(r))
			if (r?.length > 1) setLastIdAds(r[r.length - 1].id)
		 })
	}
}


export const observerGenerate = (lastElement, observer, limitRender, setLimitRenderPage, setPage, page) => {
	if (lastElement.current) {
		if (observer.current) observer.current.disconnect();

		let callback = (entries) => {
			if (entries[0].isIntersecting && limitRender == 0 && page != 'end') {

					// console.log('UPDAAAAAAAAAAAAAAAAAAAAATE', lastElement.current)
					if (!limitRender && setLimitRenderPage) setLimitRenderPage(1)
					if (setPage) setPage(page + 1)
			}
		};

		observer.current = new IntersectionObserver(callback);
		observer.current.observe(lastElement.current);
	}
}