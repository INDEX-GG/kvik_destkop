import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthCTX";
import axios from "axios";

export const OfferAccountContext = createContext();

export const useOfferAccount = () => useContext(OfferAccountContext);

const OfferAccountProvider = ({ children }) => {
	const { id } = useAuth(),
		[query, setQuery] = useState(false),
		[userAccountProvider, setuserAccountProvider] = useState(),
		[isLoading, setLoading] = useState(true);


	useEffect(() => {
		 console.log('вызов данных')
		const getUser = async () => {
			const data = await axios.post('/api/getProductOfUser', { user_id: id })
				.then(r => (r.data.result))
				.catch(e => console.error(e));
			setuserAccountProvider(data);
			setLoading(false);
		}
		if (id !== undefined) {
			getUser();
		}
	}, [query, id])

	return (
		<OfferAccountContext.Provider value={{setQuery, userAccountProvider}}>
			{children}
		</OfferAccountContext.Provider>
	)
}

export default OfferAccountProvider;