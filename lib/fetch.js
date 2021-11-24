import axios from 'axios';
import { BASE_URL, STATIC_URL } from './constants';

export const getDataByPost = async (url, data) => {

	const res = await axios.post(`${BASE_URL}${url}`, data)
		.then((r => r.data))
		.catch(e => console.error('Ошибка запроса getDataByPost ', e))
	return await res;
}

export const getDataByGet = async (url) => {
	const res = await axios.get(url)
		.then(r => r.data)
		.catch(e => console.log('Ошибка запроса getDataByGet ', e))
	return await res;
}

export const  getTokenDataByPost = async (url, data, token) => {

	const sendToken = token ? token : getDataByGet('/api/refresh').then(r => r);

	const res = await axios.post(url, data, {
		headers: {
			"x-access-token": sendToken
		}
	})
		.then(r => r.data)
		.catch(e => console.log('Ошибка запроса getDataByGet ', e))
	return await res;
}

export const postAvatar = async (id, data, token) => {
	return await axios.post(`${STATIC_URL}/avatar/${id}`, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
			"x-access-token": token
		}
	})
		.then(r => {
			if (r !== undefined && r.data.message === 'success') {
				return `${STATIC_URL}/${r.data.image}`
			}
		})
		.catch(e => console.error(e))
}

export const postLikeComment = async (id, postId, like, comment, token) => {
	const data = getTokenDataByPost(`${BASE_URL}/api/favorites`, {
		user_id: `${id}`,
		post_id: `${postId}`,
		comment: `${comment}`,
		condition: `${like}`
	}, token)
		.then(r => r.data)
		.catch(e => console.error('Ошибка получения лайков', e))

	return await data;
}
/* отправка на сервер массива фаворитс */
export const postLikeCommentArray = async (id, array, token) => {
	const data = await getTokenDataByPost(`${BASE_URL}/api/deleteManyFavorites`, {
		user_id: `${id}`,
		field: array,
	}, token)
		.then(r => r.data)
		.catch(e => console.error('Ошибка получения лайков', e))
	return await data;
}