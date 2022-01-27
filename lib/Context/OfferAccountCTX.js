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

	// новая логика еще не готова
// const { id, token } = useAuth(),
// 		[query, setQuery] = useState(false),
// 		[userAccountProvider, setuserAccountProvider] = useState({
// 			active: [],
// 			archive: [],
// 			wait: []
// 		}),
// 		[isLoading, setLoading] = useState(true),
// 		[page, setPage] = useState(1),
// 		[page_limit, setPageLimit] = useState(10),
// 		[totalPosts, setTotalPosts] = useState({})

// 			const data = await getTokenDataByPost(`/api/PersonalAreaPosts`, { user_id: id, page, page_limit }, token, )
// 			const active = data.active_posts;
// 			const archive = data.archive_posts;
// 			const wait = data.wait_posts;

// 			if(page === 1) {
// 				setTotalPosts({
// 					active: data.active_posts_count,
// 					archive: data.archive_posts_count,
// 					wait: data.wait_posts_count
// 				})
// 			}

// 			if([...active, ...archive, wait].length) {
// 				active.map(item => ({
// 					...item,
// 					photo: photos2arr(item.photo).map(img => `${STATIC_URL}/${img}`),
// 				}))

// 				archive.map(item => ({
// 					...item,
// 					photo: photos2arr(item.photo).map(img => `${STATIC_URL}/${img}`),
// 				}))

// 				wait.map(item => ({
// 					...item,
// 					photo: photos2arr(item.photo).map(img => `${STATIC_URL}/${img}`),
// 				}))
// 			}
// 			const allPosts = {
// 				active: [...userAccountProvider.active, ...active],
// 				archive: [...userAccountProvider.archive, ...archive],
// 				wait: [...userAccountProvider.wait, ...wait],
// 			}
// 			console.log(data)