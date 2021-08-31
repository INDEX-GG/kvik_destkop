import { createContext, useState, useContext, useEffect } from "react";
import { STATIC_URL } from "../constants";
import { getDataByPost, postLikeComment } from "../fetch";
import { text2Bool } from "../services";
import { useAuth } from "./AuthCTX";

export const StoreContext = createContext();
export const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
	const { id } = useAuth();
	const [userInfo, setUserInfo] = useState();
	//Получение информации о пользователе по id

	const storeUser = async (id) => {
		if (id !== undefined) {
			await getDataByPost('/api/getUser?new', { id: id })
				.then(r => {
					if (r !== undefined) {
						if (r.userPhoto !== null) {
							r.userPhoto = `${STATIC_URL}/${r.userPhoto}`;
						}
						if (r.favorites !== null) {
							r.favorites = JSON.parse(r.favorites)
							if (r.favorites.length > 0) {
								r.favorites = r.favorites.map(item => {
									return {
										post_id: +item.post_id,
										comment: item.comment,
										condition: text2Bool(item.condition)
									}
								})
							}
						}
						setUserInfo(r);
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

	const setLikeComment = (postId, comment, like) => {
		postLikeComment(id, postId, like, comment)
		setUserInfo(p => {
			p.favorites = checkTwin(p.favorites, postId)
			return {
				...p,
				favorites: p.favorites.length > 0 ? [...p.favorites, { post_id: postId, comment: comment, condition: like }] : [{ post_id: postId, comment: comment, condition: like }]
			}
		})
	}

	const store = { storeUser, userInfo, setUserInfo, setLikeComment };
	return (
		<StoreContext.Provider value={store}>
			{children}
		</StoreContext.Provider>
	)
}

export default StoreProvider;