import React, { useEffect, useState } from 'react';
import PersonalData from './tabs/PersonalData';
import Pushes from './tabs/Pushes';
import BlackList from './tabs/BlackList';
import { brooklyn } from '../../../lib/services';
import { useRouter } from 'next/router';
import safeAccountTab from '../../safeAccountTab';
import { blockUser, getBlockedUsers } from "../../../lib/fetch";

// Чёрный список
// const blackListBox = [
// 	{ id: 1, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 2, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жанна', date: '00.00.00' },
// 	{ id: 3, userPic: 'https://source.unsplash.com/random?portrait', username: 'Евгений', date: '00.00.00' },
// 	{ id: 4, userPic: 'https://source.unsplash.com/random?portrait', username: 'Марина', date: '00.00.00' },
// 	{ id: 5, userPic: 'https://source.unsplash.com/random?portrait', username: 'Андрей', date: '00.00.00' },
// 	{ id: 6, userPic: 'https://source.unsplash.com/random?portrait', username: 'Василий', date: '00.00.00' },
// 	{ id: 7, userPic: 'https://source.unsplash.com/random?portrait', username: 'Длинное имя', date: '00.00.00' },
// 	{ id: 8, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жорка', date: '00.00.00' },
// 	{ id: 9, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 10, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 11, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 12, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 13, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 14, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 15, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 16, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// ];

/**
 * @typedef SettingsProps
 * @property {number} userID
 * @property {string} token
 */

/**
 * @param {SettingsProps} props
 */
const Settings = ({userID, token}) => {
	const [blackListData, setBlackListData] = useState([]);

	/**
	 * @param {string | string[]} users 
	 * @returns 
	 */
	const updateBlackList = (users) => {
		if (Array.isArray(users)) {
			setBlackListData(arr => arr.filter(el => !users.includes(el.id)))
			return
		}
		setBlackListData(arr => arr.filter(el => el.id !== users))
	}

	/**
	 * @param {string[] | string} usersUnlock
	 */
	const unblockUsers = async (usersUnlock) => {
		updateBlackList(usersUnlock)
		
		if (Array.isArray(usersUnlock)) {
			for (let user of usersUnlock) {
				await blockUser(userID, user, false, token)
			}
		} else {
			await blockUser(userID, usersUnlock, false, token)
		}
		
	}
	
	const navItems = [
		{ id: 1, title: 'Личные данные', content: <PersonalData key={1} />, count: 0 },
		{ id: 2, title: 'Уведомления', content: <Pushes key={2} />, count: 0 },
		{ 
			id: 3, 
			title: 'Черный список', 
			content: (<BlackList 
				key={3} 
				data={blackListData} 
				unblockUser={(u) => unblockUsers(u)} />
			), 
			count: blackListData.length 
		},
	]

	const router = useRouter();

	useEffect(() => {
		(async () => {
			if (userID && token) {
				const data = await getBlockedUsers(userID, token);
				if (data?.blocked_users?.length) {
					setBlackListData(data.blocked_users)
				}
			}
		})();
	}, [])

	useEffect(() => {
		if (router) {
			if (router.query.content != undefined) {
				setItemNav({ i: +router.query.content, ttl: navItems[router.query.content - 1].title })
			}
		}
	}, [router])

	const [itemNav, setItemNav] = useState({ i: 1, ttl: 'Личные данные' });

	return (
		<>
			<div className="clientPage__container_top">
				<div className="clientPage__container_nav__wrapper">
					<nav className="clientPage__container_nav">
						{navItems.map(item => {
							const titleClass = [
								"clientPage__container_nav__title", 
								(itemNav.i === item.id) ? 'navActive' : ""
							].join(" ");

							return (
								<a 
									className={titleClass} 
									key={item.id} 
									onClick={() => {
										setItemNav({ i: item.id, ttl: item.title })
										safeAccountTab(item.id)
									}}
								>{item.title} {brooklyn(item.count)}</a>
							)
						})}
					</nav>
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
export default Settings;
