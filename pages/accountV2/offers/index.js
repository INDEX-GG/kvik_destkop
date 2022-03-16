import React, {useMemo} from 'react'
import {useRouter} from 'next/router'

import AccountProvider from "../../../src/context/AccountContext";
import AccountPage from "../../../src/components/Account/AccountPage";

import OfferCardActive from '../../../src/components/Account/Offers/OffersCard/OfferCardActive/OfferCardActive'
import OfferCardWait from '../../../src/components/Account/Offers/OffersCard/OfferCardWait/OfferCardWait'
import OfferCardArchive from '../../../src/components/Account/Offers/OffersCard/OfferCardArchive/OfferCardArchive'

import Switch from '../../../src/components/AnyPage/Switch/Switch'
import ScrollGetMore from '../../../src/components/ScrollGetMore/ScrollGetMore'

const Index = ({data}) => {

    const router = useRouter()

    const query = router.query.content

    const tabs = useMemo(
        () => [
            {
                href: '/accountV2/offers?content=active',
                nameContent: 'active',
                title: 'Активные',
                count: data?.active_posts_count || ''
            },
            {
                href: '/accountV2/offers?content=wait',
                nameContent: 'wait',
                title: 'Ждут действия',
                count: data?.wait_posts_count || ''
            },
            {
                href: '/accountV2/offers?content=archive',
                nameContent: 'archive',
                title: 'Архив',
                count: data?.archive_posts_count || ''
            }
    ], [])

    return (
        <AccountProvider>
            <AccountPage tabs={tabs} >
                <Switch test={query}>
                    <OfferCardActive
                        testValue={"active"}
                        />
                    <OfferCardWait
                        testValue={"wait"}
                        // data={state}
                    />
                    <OfferCardArchive
                        testValue={"archive"}
                        // data={state}
                    />
                </Switch>
            </AccountPage>
        </AccountProvider>
    )
}

export default React.memo(ScrollGetMore({
	url: "/api/PersonalAreaPosts",
    tabs: ['active_posts', 'wait_posts', 'archive_posts'],
    routers: [
    {
        route: 'active',
        content: 1,
    },
    {
        route: 'wait',
        content: 2,
    },
    {
        route: 'archive',
        content: 3,
    }]
})(Index))
