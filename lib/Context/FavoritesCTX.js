import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthCTX";
import axios from "axios";

export const FavContext = createContext();

export const useFavorits = () => useContext(FavContext);

const FavProvider = ({ children }) => {
	const { id } = useAuth(),
		[query, setQuery] = useState(false),
		[userFav, setUserFav] = useState(),
		[isLoading, setLoading] = useState(true);

	useEffect(() => {
		// console.log('вызов данных')
		const getUser = async () => {
			const data = await axios.post('/api/getUser', { id: id })
				.then(r => r.data.user.favorites,)
				.catch(e => console.error(e));
			setUserFav(data);
			setLoading(false);
		}
		if (id !== undefined) {
			getUser();
		}
	}, [query, id])

	return (
		<FavContext.Provider value={{setQuery, userFav}}>
			{children}
		</FavContext.Provider>
	)
}

export default FavProvider;