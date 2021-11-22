import React, { useEffect, useState } from 'react';
import Offers from './tabs/Offers';
import Searches from './tabs/Searches';
import Sellers from './tabs/Sellers';
import { brooklyn } from '../../../lib/services';
import { useSubList } from '../../../hooks/useSubscriptions';
import { useAuth } from '../../../lib/Context/AuthCTX';
import { useRouter } from 'next/router';
import safeAccountTab from '../../safeAccountTab';
import {getTokenDataByPost} from "../../../lib/fetch";
// Поиски
const SearchesBox = [
	// {
	// 	id: 1, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
	// 	data: 'Снять, На длительный срок, > 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, 20 000 - 25 000 ₽.',
	// 	locality: 'Челябинск'
	// },
	// {
	// 	id: 2, title: 'Категория 1 уровня / Категория 2 уровня',
	// 	data: 'Снять, На длительный срок, > 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, 20 000 - 25 000 ₽.',
	// 	locality: 'Владивосток'
	// },
	// {
	// 	id: 3, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
	// 	data: 'Снять, На длительный срок, > 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, 20 000 - 25 000 ₽.',
	// 	locality: 'Миасс'
	// },
	// {
	// 	id: 4, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня',
	// 	data: 'Снять, На длительный срок, > 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, 20 000 - 25 000 ₽.',
	// 	locality: 'Старокамышинск'
	// },
	// {
	// 	id: 5, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория / Подкатегория 2 уровня / Подкатегория 3 уровня',
	// 	data: 'Снять, На длительный срок, > 9 комнат, 9 комнат, 8 комнат, 7 комнат, 6 комнат, 5 комнат, 4 комнаты, 3 комнаты, 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, Блочный, Панельный, Кирпичный, Частные, Арендная плата 56 655 — 67 778 ₽.',
	// 	locality: 'Челябинск'
	// },
	// {
	// 	id: 6, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
	// 	data: 'Снять, На длительный срок, > 9 комнат, 9 комнат, 8 комнат, 7 комнат, 6 комнат, 5 комнат, 4 комнаты, 3 комнаты, 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, Блочный.',
	// 	locality: 'Москва'
	// },
	// {
	// 	id: 7, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
	// 	data: 'Снять, На длительный срок, > 9 комнат, 9 комнат, 8 комнат, 7 комнат, 6 комнат, 5 комнат, 4 комнаты, 3 комнаты, 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, Блочный.',
	// 	locality: 'Москва'
	// },
	// {
	// 	id: 8, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
	// 	data: 'Снять, На длительный срок, > 9 комнат, 9 комнат, 8 комнат, 7 комнат, 6 комнат, 5 комнат, 4 комнаты, 3 комнаты, 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, Блочный.',
	// 	locality: 'Москва'
	// },
];

// Пагинация
const Favorites = () => {

	const { id, token } = useAuth();
	const [itemNav, setItemNav] = useState({ i: 1, ttl: 'Объявления' });
	const router = useRouter()

	const [offetFav, setOfferFav] = useState()


	useEffect(() => {
		getTokenDataByPost('/api/getFavorites', { user_id: id }, token)
			.then(data => setOfferFav(data))
			.catch(error => console.log(error))

		// if (offetFav) {
		// 	favAciveOffer = offetFav?.posts.filter((item) => item.condition === 'true')
		// }
	}, [id])

	let favAciveOffer = offetFav?.posts?.filter((item) => item.condition === 'true')

	useEffect(() => {
		if (router) {
			if (router.query.content !== undefined) {
				setItemNav({ i: +router.query.content, ttl: navItems[router.query.content - 1].title })
			}
		}
	}, [router])



	const [seller, setSeller] = useState(0)


	const { subList } = useSubList(id)

	useEffect(() => {
		setSeller(subList)
	})

	// console.log(seller)
	const navItems = [
		{ id: 1, title: 'Объявления', content: <Offers key={1} itemsPost={favAciveOffer} />, count: favAciveOffer !== undefined ? favAciveOffer?.length : 0 },
		{ id: 2, title: 'Продавцы', content: <Sellers key={2} sellers={seller} />, count: seller !== undefined ? seller.length : 0 },
		{ id: 3, title: 'Поиски', content: <Searches key={3} searches={SearchesBox} />, count: SearchesBox.length }
	];

	return (
		<>
			<div className="clientPage__container_top">
			<div className="clientPage__container_nav__wrapper">
				<div className="clientPage__container_nav">
					{navItems.map(item => {
						return (
							<a key={item.id} className={(itemNav.i === item.id) ? ('navActive') : ('')}
							   onClick={() => {
								   setItemNav({i: item.id, ttl: item.title})
								   safeAccountTab(item.id)
							   }}>{item.title} {brooklyn(item.count)}</a>
						)
					})}
				</div>
			</div>
			</div>
			{offetFav && navItems.map(item => {
				return (
				(itemNav.i === item.id) && (item.content)
				)
			})}
		</>
	)
}
export default Favorites;
