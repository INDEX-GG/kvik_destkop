import { createContext, useState, useContext, useEffect } from "react";
import { STATIC_URL } from "../constants";
import { /*getDataByPost,*/ getTokenDataByPost, /*postLikeComment,*/ postLikeCommentArray } from "../fetch";
// import { text2Bool } from "../services";
import { useAuth } from "./AuthCTX";

export const StoreContext = createContext();

/**
 * @callback SetLikeComment
 * @param {number} id
 * @param {string} comment
 * @param {boolean} like
 * @returns {void}
 */

/**
 * @callback SetLikeCommentArray
 * @param {[]} array
 * @returns {void}
 */

/**
 * @typedef {React.Dispatch <(prevState: import("../fetch").UserInfo) => import("../fetch").UserInfo>} SetUserInfo
 */

/**
 * @typedef IStoreContext
 * @property {import("../fetch").UserInfo} userInfo
 * @property {SetUserInfo} setUserInfo
 * @property {SetLikeComment} setLikeComment
 * @property {SetLikeCommentArray} setLikeCommentArray
 */

/**
 * @returns {IStoreContext}
 */
export const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
	const { id, signOut, token } = useAuth();
	/**
	 * @type { [import("../fetch").UserInfo, SetUserInfo] }
	 */
	const [userInfo, setUserInfo] = useState();
	//Получение информации о пользователе по id
	const storeUser = async (id) => {
		if (id !== undefined) {
			// await getDataByPost('/api/getUser?new', { id: id })
			// сменился АПИ, теперь стучимся по токену
			await getTokenDataByPost('/api/getUser?new', { id: id }, token)
				.then(userData => {
					if (userData === null) {
						return signOut()
					}
					if (userData !== undefined) {
						if (userData.userPhoto !== null) {
							userData.userChatPhoto = userData.userPhoto
							userData.userPhoto = `${STATIC_URL}/${userData.userPhoto}`;
						}
						// сменили API. эта часть логики больше не нужна
						// if (userData.favorites !== null) {
						// 	userData.favorites = JSON.parse(userData.favorites)
						// 	if (userData.favorites.length > 0) {
						// 		userData.favorites = userData.favorites.map(item => {
						// 			return {
						// 				post_id: +item.post_id,
						// 				comment: item.comment,
						// 				condition: text2Bool(item.condition)
						// 			}
						// 		})
						// 	}
						// }
						// if (typeof userData.subscriptions === 'string') {
						// 	userData.subscriptions = JSON.parse(userData.subscriptions)
						// }
						setUserInfo(userData);
					}
				})
		}
	}

	useEffect(() => {
		storeUser(id)
	}, [id])

	const checkTwin = (arr, id) => {
		if (arr !== null && arr instanceof Array) {
			return arr.filter(item => item.post_id != id)
		}
	}

	/**
	 * @type {SetLikeComment}
	 */
	// const setLikeComment = (postId, comment, like) => {
	// 	postLikeComment(id, postId, like, comment, token)
	// 	setUserInfo(p => {
	// 		p.favorites = checkTwin(p.favorites, postId)
	// 		return {
	// 			...p,
	// 			favorites: p.favorites.length > 0 ? [...p.favorites, { post_id: postId, comment: comment, condition: like }] : [{ post_id: postId, comment: comment, condition: like }]
	// 		}
	// 	})
	// }

	/* массив удаленных */
	const setLikeCommentArray = (array) => {
		postLikeCommentArray(id, token, array )
		array.map((item) =>{
			setUserInfo(p => {
				p.favorites = checkTwin(p.favorites, +item.post_id)
				return {
					...p,
					favorites: p.favorites.filter(favorits => !array.includes(favorits))
				}
			})
		})
	}

	const store = { storeUser, userInfo, setUserInfo,/* setLikeComment,*/ setLikeCommentArray };
	return (
		<StoreContext.Provider value={store}>
			{children}
		</StoreContext.Provider>
	)
}

export default StoreProvider;
