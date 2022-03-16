import React, {useMemo} from 'react'
import {useRouter} from 'next/router'

import AccountProvider from "../../../src/context/AccountContext";
import AccountPage from "../../../src/components/Account/AccountPage";

import FavoritesAds from '../../../src/components/Account/Favorites/FavoritesAds/FavoritesAds'
import FavoritesSellers from '../../../src/components/Account/Favorites/FavoritesSellers/FavoritesSellers'
import FavoritesSearchs from '../../../src/components/Account/Favorites/FavoritesSearchs/FavoritesSearchs'

const Index = () => {

    const router = useRouter()

    const query = router.query.content

    const ActiveContent = useMemo(() => {
        switch(query) {
            case 'sellers':
                return FavoritesSellers
            case 'searchs':
                return FavoritesSearchs
            case 'ads':
            default:
                return FavoritesAds
        }
    }, [query])

    const tabs={
        links: [
            {
                href: '/accountV2/favorite?content=ads',
                nameContent: 'ads',
                title: 'Объявления  ',
                count: ''
            },
            {
                href: '/accountV2/favorite?content=sellers',
                nameContent: 'sellers',
                title: 'Продавцы',
                count: 5
            },
            {
                href: '/accountV2/favorite?content=searchs',
                nameContent: 'searchs',
                title: 'Поиски',
                count: 15
            }
        ]
    }

    return (
        <AccountProvider>
            <AccountPage tabs={tabs} >
                <ActiveContent />
            </AccountPage>
        </AccountProvider>
    )
}

export default Index
