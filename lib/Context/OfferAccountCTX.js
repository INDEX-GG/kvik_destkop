import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthCTX";
import { /*getDataByPost,*/ getTokenDataByPost } from "../fetch";
import { STATIC_URL } from "../constants";
import { photos2arr } from "../services";

export const OfferAccountContext = createContext();

export const useOfferAccount = () => useContext(OfferAccountContext);

const OfferAccountProvider = ({ children }) => {
const { id, token } = useAuth(),
		[/*query,*/ setQuery] = useState(false),
		[isLoading, setLoading] = useState(true),
		[page, setPage] = useState(1),
		[page_limit, /*setPageLimit*/] = useState(20),
		[userAccountProvider, setuserAccountProvider] = useState({
			active: [],
			archive: [],
			wait: []
		}),
		[totalPosts, setTotalPosts] = useState({
			active: 0,
			archive: 0,
			wait: 0
		})


	useEffect(() => {
		const getUser = async () => {
			try {			
				const data = await getTokenDataByPost(`/api/PersonalAreaPosts`, { user_id: id, page, page_limit }, token, )
				// если пришли пустые посты, не выполняем дальнейшие операции
				if(!data.active_posts?.length && !data.archive_posts?.length && !data?.wait_posts.length) {
					return
				}
				// на первой странице приходит информация о кол-ве данных, сохраняем ее
				if(page === 1) {
					setTotalPosts({
						active: data.active_posts_count,
						archive: data.archive_posts_count,
						wait: data.wait_posts_count
					})
				}
				// локальные переменные для хранения массивов по отдельности.
				let active 
				let archive 
				let wait 
				// раскидываем объявления по типу, каждый в свои массивы (активные в активные, архивные в архивные и тд.)
				if([...data.active_posts, ...data.archive_posts, ...data.wait_posts]?.length) {
					active = data.active_posts.map(item => ({
						...item,
						photo: photos2arr(item.photo).map(img => `${STATIC_URL}/${img}`),
					}))

					archive = data.archive_posts.map(item => ({
						...item,
						photo: photos2arr(item.photo).map(img => `${STATIC_URL}/${img}`),
					}))

					wait = data.wait_posts.map(item => ({
						...item,
						photo: photos2arr(item.photo).map(img => `${STATIC_URL}/${img}`),
					}))
				}
				// собираем все объявления в один объект и обновляем состояние.
				const allPosts = {
					active: [...userAccountProvider.active, ...active],
					archive: [...userAccountProvider.archive, ...archive],
					wait: [...userAccountProvider.wait, ...wait],
				}
				setuserAccountProvider(allPosts);
				setLoading(false);

			}			
			catch (error) {
					console.log('offerAccCTXError')
					console.log(error)
			}
		}
		if (id !== undefined) {
			getUser();
		}
	}, [id, page, page_limit])

	return (
		<OfferAccountContext.Provider value={{ setQuery, userAccountProvider, isLoading, setPage, page, totalPosts, page_limit }}>
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