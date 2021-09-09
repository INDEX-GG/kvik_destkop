import axios from 'axios';
import { BASE_URL, STATIC_URL } from './constants';

export const getDataByPost = async (url, data) => {
	console.log(url)
	console.log(data)
	const res = await axios.post(`${BASE_URL}${url}`, data)
		.then((r => r.data))
		.catch(e => console.error('Ошибка запроса getDataByPost ', e))
	return await res;
}

export const postAvatar = async (id, data) => {
	return await axios.post(`${STATIC_URL}/avatar/${id}`, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
		.then(r => {
			if (r !== undefined && r.data.message === 'success') {
				return `${STATIC_URL}/${r.data.image}`
			}
		})
		.catch(e => console.error(e))
}

export const postLikeComment = async (id, postId, like, comment) => {
	console.log(id, postId, like, comment)
	console.log({
		user_id: `${id}`,
		post_id: `${postId}`,
		comment: `${comment}`,
		condition: `${like}`
	});
	const data = await axios.post(`${BASE_URL}/api/favorites`, {
		user_id: `${id}`,
		post_id: `${postId}`,
		comment: `${comment}`,
		condition: `${like}`
	})
		.then(r => r.data)
		.catch(e => console.error('Ошибка получения лайков', e))
	console.log('Ответ от апи добавления лойсов', data)
	return await data;
}