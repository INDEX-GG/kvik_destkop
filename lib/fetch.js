import axios from 'axios';
import { BASE_URL, STATIC_URL } from './constants';
import { SecretPassword } from '#lib/SecretData';

export const getDataByPost = async (url, data) => {

	const res = await axios.post(`${BASE_URL}${url}`, data)
		.then((r => r.data))
		.catch(e => console.error('Ошибка запроса getDataByPost ', e))
	return await res;
}

/**
 * @param {string} url 
 */
export const getDataByGet = async (url) => {
	const res = await axios.get(url)
		.then(r => r.data)
		.catch(e => console.log('Ошибка запроса getDataByGet ', e))
	return await res;
}

/**
 * @param {string} url 
 * @param {any} data 
 * @param {string} token 
 */
export const getTokenDataByPost = async (url, data, token) => {

	const sendToken = token ? token : getDataByGet('/api/refresh').then(r => r);

	const res = await axios.post(url, data, {
		headers: {
			"x-access-token": sendToken
		}
	})
		.then(r => r.data)
		.catch(e => console.log('Ошибка запроса getDataByPost ', e))
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

/**
 * @param {string} userID 
 * @param {string} token
 * @returns {Promise<{ blocked_users: [] }>}
 */
export const getBlockedUsers = async (userID, token) => {
	const data = await getTokenDataByPost(
		'/api/getBlockUsers',
		{ user_id: userID },
		token
	);
	return data;
}

/**
 * @param {string} userID 
 * @param {string} blockUserID 
 * @param {boolean} block 
 * @param {string} token
 */
export const blockUser = async (userID, blockUserID, block, token) => {
	await getTokenDataByPost(
		'/api/blockUser',
		{
			user_id: userID,
			block_user_id: blockUserID,
			block: block
		},
		token
	)
}

/**
 * @param {string} userID 
 * @param {string} token 
 * @returns {Promise<[]>}
 */
export const getSubscriptions = async (userID, token) => {
	const subscriptions = await getTokenDataByPost("/api/getSubscriptions", { user_id: userID }, token);
	return subscriptions;
}

/**
 * @param {string} userID 
 * @param {string} token 
 * @returns 
 */
export const getSubscribers = async (userID, token) => {
	const subscribers = await getTokenDataByPost("/api/getSubscribers", { user_id: userID }, token);
	return subscribers;
}

/**
 * @typedef UserFavorite
 * @property {string} post_id
 * @property {string} comment
 * @property {string} condition booleanString
 */

/**
 * @typedef UserInfo
 * @property {null} [about]
 * @property {null} [address]
 * @property {string} createdAt
 * @property {null} [email]
 * @property {UserFavorite[]} favorites
 * @property {{ name: string, geo: [number, number] }} location
 * @property {string} name
 * @property {string} phone
 * @property {null} raiting
 * @property {[]} subscriptions
 * @property {string} userChatPhoto
 * @property {string} userPhoto
 */

/**
 * @param {string} id 
 * @returns {Promise<UserInfo | undefined>}
 */
export const retrieveUserInfo = async (id) => {
	const userInfo = await getDataByPost('/api/getUser?new', { id: id });
	return userInfo
}

/**
 * @param {string} password 
 * @param {string} token 
 * @returns { Promise<{ message: string }> } "successfully update"
 */
export const updatePassword = async (password, token) => {
	const encryptedData = SecretPassword({ password: password });
	/**
	 * @type {{ message: string }}
	 */
	const data = await getTokenDataByPost(
		'/api/settings/upPassword',
		encryptedData,
		token
	);

	return data;
}

/**
 * @typedef UpdateUserNameArgs
 * @property {number} userID
 * @property {string} userName 
 * @property {string} token
 */

/**
 * @param {UpdateUserNameArgs} userName
 */
export const updateUserName = async ({
	userID,
	userName,
	token
}) => {
	const resData = await getTokenDataByPost(
		"/api/settings/upName",
		{ id: userID, name: userName },
		token
	);

	if (!resData || resData?.message !== "successfully update") {
		throw Error(resData)
	}

	return resData;
}

/**
 * @typedef UpdateUserAddressArgs
 * @property {number} userID
 * @property {string} userAddress
 * @property {string} token
 */

/**
 * @param {UpdateUserAddressArgs} args
 */
export const updateUserAddress = async ({
	userID,
	userAddress,
	token
}) => {
	const resData = await getTokenDataByPost(
		"/api/settings/upAddress",
		{ id: userID, address: userAddress },
		token
	)
	
	if (!resData || resData?.message !== "successfully update") {
		throw Error(resData)
	}

	return resData;
}