import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthCTX";
import { getDataByPost } from "../fetch";
import { STATIC_URL } from "../constants";
import { photos2arr } from "../services";

export const OfferAccountContext = createContext();

export const useOfferAccount = () => useContext(OfferAccountContext);

const OfferAccountProvider = ({ children }) => {
	const { id } = useAuth(),
		[query, setQuery] = useState(false),
		[userAccountProvider, setuserAccountProvider] = useState(),
		[isLoading, setLoading] = useState(true);

	useEffect(() => {
		const getUser = async () => {
			const data = await getDataByPost('/api/getProductOfUser', { user_id: id })
			// const data = await getTokenDataByPost('/api/PersonalAreaPosts', { user_id: id }, token)
				.then(r => {
					console.log(r)
					if (r !== undefined && r.length > 0) {
						r = r.map(offer => {

							return {
								...offer,
								userPhoto: `${STATIC_URL}/${offer.userPhoto}`,
								photo: photos2arr(offer.photo)?.map(img => `${STATIC_URL}/${img}`)
							}
						})
						return r
					}
				})
				console.log(data, 'data')
			setuserAccountProvider(data);
			setLoading(false);
		}
		if (id !== undefined) {
			getUser();
		}
	}, [query, id])

	return (
		<OfferAccountContext.Provider value={{ setQuery, userAccountProvider, isLoading }}>
			{children}
		</OfferAccountContext.Provider>
	)
}

export default OfferAccountProvider;