import { getDataByPost } from "./fetch";
import { modifyGetPostsData } from "./services";

export const scrollAds = async (page, limit, data, setData, setLastIdAds, setLimitRanderPage, setPage) => {
	if (page > 1) {
		await getDataByPost('/api/getPostsPortion', {'page_limit': limit, 'page': page}).then(r => {
			if (r.length == 0) setPage('end');
			if (r.length) {
				setData([...data, ...modifyGetPostsData(r)])
				setLastIdAds(r[r.length - 1].id)
			}
		})
		setLimitRanderPage(0)
	}
}


export const firstAds = (page, limit, setData, setLastIdAds) => {
	getDataByPost('/api/getPostsPortion', {'page_limit': limit, 'page': page}).then(r => { 
			setData(modifyGetPostsData(r))
			if (r.length > 1) setLastIdAds(r[r.length - 1].id)
		 })
}


export const observerGenerate = (lastElement, observer, limitRender, setLimitRenderPage, setPage, page) => {
	if (lastElement.current) {
			if (observer.current) observer.current.disconnect();

			let callback = (entries) => {
				if (entries[0].isIntersecting && limitRender == 0 && page != 'end') {
						if (setLimitRenderPage) setLimitRenderPage(1)
						if (setPage) setPage(page + 1)
				}
			};

			observer.current = new IntersectionObserver(callback);
			observer.current.observe(lastElement.current);
		}
}