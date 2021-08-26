import { createContext, useState, useContext, useEffect } from "react";
import { STATIC_URL } from "../constants";
import { getDataByPost, postLikeComment } from "../fetch";
import { useAuth } from "./AuthCTX";

export const StoreContext = createContext();
export const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
	const { id } = useAuth();
	const [userInfo, setUserInfo] = useState();
	//Получение информации о пользователе по id
	useEffect(async () => {
		if (id !== undefined) {
			await getDataByPost('/api/getUser?new', { id: id })
				.then(r => {
					if (r !== undefined) {
						if (r.userPhoto !== null) {
							r.userPhoto = `${STATIC_URL}/${r.userPhoto}`;
						} else if (r.favorites) {
							r.favorites = JSON.parse(r.favorites)
						}
						console.log(r);
						setUserInfo(r);
					}
				})
		}
	}, [id])

	const checkTwin = (arr, id) => {
		if (arr !== null) {
			return arr.filter(item => item.post_id != id)
		}
	}

	const setLikeComment = (postId, comment, like) => {
		postLikeComment(id, postId, like, comment)
			.then(r => {
				if (r) {
					setUserInfo(p => {
						p.favorites = checkTwin(p.favorites, postId)
						return {
							...p,
							favorites: p.favorites.length > 0 ? [...p.favorites, { post_id: postId, comment: comment, condition: like }] : [{ post_id: postId, comment: comment, condition: like }]
						}
					})
				}
			})
	}

	const store = { userInfo, setUserInfo, setLikeComment };
	return (
		<StoreContext.Provider value={store}>
			{children}
		</StoreContext.Provider>
	)
}

export default StoreProvider;