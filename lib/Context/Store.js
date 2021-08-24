import { createContext, useState, useContext, useEffect } from "react";
import { STATIC_URL } from "../constants";
import { getDataByPost } from "../fetch";
import { useAuth } from "./AuthCTX";

export const StoreContext = createContext();
export const useStore = () => useContext(StoreContext);

const StoreProvider = ({children}) => {
	const { id } = useAuth();
	const [userInfo, setUserInfo] = useState();

	//Получение информации о пользователе по id
	useEffect(async() => {
		if (id !== undefined) {
			await getDataByPost('/api/getUser?new', {id: id})
			.then(r => {
				if (r !== undefined && r !== null) {
					r.userPhoto = `${STATIC_URL}/${r.userPhoto}`;
					console.log(r);
					setUserInfo(r);
				}
			})
		}
	},[id])

	const store = {userInfo, setUserInfo};
	return (
		<StoreContext.Provider value={store}>
			{children}
		</StoreContext.Provider>
	)
}

export default StoreProvider;