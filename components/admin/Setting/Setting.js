import { useState } from 'react';
import Loading from '../../../UI/icons/Loader';

import PersonalData from './tabs/PersonalData';
import BlackList from './tabs/BlockList'

export const Setting = (userInfo) => {
    const [itemNav, setItemNav] = useState({ i: 1, ttl: 'Личные данные' });


    const navItems = [
        { id: 1, title: 'Личные данные', content: < PersonalData {...userInfo} /> },
        { id: 2, title: 'Заблокированные пользователи', content: < BlackList /> }
    ];


    return (
        <>
            <div className="clientPage__container_top">
                <div className="clientPage__container_nav__wrapper">
                    <div className="clientPage__container_nav">
                        {navItems.map(item => {
                            return (
                                <a key={item.id} className={(itemNav.i === item.id) ? ('navActive') : ('')} key={item.id} onClick={() => setItemNav({ i: item.id, ttl: item.title })}>{item.title}</a>
                            )
                        })}
                    </div>
                </div>
            </div>
            {navItems.map(item => {
                return (
                    (itemNav.i === item.id) && (item.content ? item.content : (<div className="userPageContentCompare"><Loading /></div>))
                )
            })}
        </>
    )
}