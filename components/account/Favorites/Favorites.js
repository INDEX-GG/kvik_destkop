import React, { useEffect, useState } from 'react';
import Offers from './tabs/Offers';
import Searches from './tabs/Searches';
import Sellers from './tabs/Sellers';
import axios from 'axios';
import { brooklyn } from '../../../lib/services';
import { useSubList } from '../../../hooks/useSubscriptions';
import { useAuth } from '../../../lib/Context/AuthCTX';
import { useRouter } from 'next/router';
import safeAccountTab from '../../safeAccountTab';

// Поиски
const SearchesBox = [
	{
		id: 1, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
		data: 'Снять, На длительный срок, > 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, 20 000 - 25 000 ₽.',
		locality: 'Челябинск'
	},
	{
		id: 2, title: 'Категория 1 уровня / Категория 2 уровня',
		data: 'Снять, На длительный срок, > 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, 20 000 - 25 000 ₽.',
		locality: 'Владивосток'
	},
	{
		id: 3, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
		data: 'Снять, На длительный срок, > 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, 20 000 - 25 000 ₽.',
		locality: 'Миасс'
	},
	{
		id: 4, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня',
		data: 'Снять, На длительный срок, > 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, 20 000 - 25 000 ₽.',
		locality: 'Старокамышинск'
	},
	{
		id: 5, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория / Подкатегория 2 уровня / Подкатегория 3 уровня',
		data: 'Снять, На длительный срок, > 9 комнат, 9 комнат, 8 комнат, 7 комнат, 6 комнат, 5 комнат, 4 комнаты, 3 комнаты, 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, Блочный, Панельный, Кирпичный, Частные, Арендная плата 56 655 — 67 778 ₽.',
		locality: 'Челябинск'
	},
	{
		id: 6, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
		data: 'Снять, На длительный срок, > 9 комнат, 9 комнат, 8 комнат, 7 комнат, 6 комнат, 5 комнат, 4 комнаты, 3 комнаты, 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, Блочный.',
		locality: 'Москва'
	},
	{
		id: 7, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
		data: 'Снять, На длительный срок, > 9 комнат, 9 комнат, 8 комнат, 7 комнат, 6 комнат, 5 комнат, 4 комнаты, 3 комнаты, 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, Блочный.',
		locality: 'Москва'
	},
	{
		id: 8, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
		data: 'Снять, На длительный срок, > 9 комнат, 9 комнат, 8 комнат, 7 комнат, 6 комнат, 5 комнат, 4 комнаты, 3 комнаты, 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, Блочный.',
		locality: 'Москва'
	},
];

// Пагинация
const Favorites = () => {

	const { id } = useAuth();
	const [itemNav, setItemNav] = useState({ i: 1, ttl: 'Объявления' });
	const router = useRouter()


	const [offetFav, setOfferFav] = useState()
	let favAciveOffer = offetFav?.posts.filter((item) => item.condition === true)

	useEffect(() => {
		axios.post('/api/getFavorites', { user_id: id })
			.then(data => setOfferFav(data.data))
			.catch(error => console.log(error))

		if (offetFav) {
			favAciveOffer = offetFav?.posts.filter((item) => item.condition === 'true')
		}
	
	}, [id])

	console.log(offetFav);

	useEffect(() => {
		if (router) {
			if (router.query.content != undefined) {
				setItemNav({ i: +router.query.content, ttl: navItems[router.query.content - 1].title })
			}
		}
	}, [router])



	const [seller, setSeller] = useState(0)


	const { subList } = useSubList(id)

	useEffect(() => {
		setSeller(subList)
	})

	async function subscribeUser(id = 58, sellerID) {
		const subscribe = {
			user_id: id + "",
			seller_id: sellerID + ""
		}

		axios.post("/api/getSubscriptions", { user_id: String(id) }).then(data => console.log(data.data))

		await axios.post("/api/subscriptions", subscribe)
			.then(res => console.log(res.data))
			.catch(error => console.log(error))

		axios.post("/api/getSubscriptions", { user_id: String(id) }).then(data => setSeller(data.data))

		console.log(seller)

	}

	const navItems = [
		{ id: 1, title: 'Объявления', content: <Offers itemsPost={favAciveOffer} />, count: favAciveOffer != undefined ? favAciveOffer?.length : 0 },
		{ id: 2, title: 'Продавцы', content: <Sellers sellers={seller} sellerSub={subscribeUser} />, count: seller != undefined ? seller.length : 0 },
		{ id: 3, title: 'Поиски', content: <Searches searches={SearchesBox} />, count: SearchesBox.length }
	];

	return (
		<>
			<div className="clientPage__container_top">
				<div className="clientPage__container_nav__wrapper">
					<div className="clientPage__container_nav">
						{navItems.map(item => {
							return (
								<a className={(itemNav.i === item.id) ? ('navActive') : ('')} key={item.id} onClick={() => {
									setItemNav({ i: item.id, ttl: item.title })
									safeAccountTab(item.id)
								}}>{item.title} {brooklyn(item.count)}</a>
							)
						})}
					</div>
				</div>
			</div>
			{navItems.map(item => {
				return (
					(itemNav.i === item.id) && (item.content)
				)
			})}
		</>
	)
}
export default Favorites;
