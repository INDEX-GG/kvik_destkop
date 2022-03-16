import React, {useMemo} from 'react'
import {useRouter} from 'next/router'

import AccountProvider from "../../../src/context/AccountContext";
import AccountPage from "../../../src/components/Account/AccountPage";

import SettingsBlackList from '../../../src/components/Account/Settings/SettingsBlackList/SettingsBlackList'
import SettingsPersonalData from '../../../src/components/Account/Settings/SettingsPersonalData/SettingsPersonalData'
import SettingsNotification from '../../../src/components/Account/Settings/SettingsNotification/SettingsNotification'

const Index = () => {

    const router = useRouter()

    const query = router.query.content

    const ActiveContent = useMemo(() => {
        switch(query) {
            case 'blacklist':
                return SettingsBlackList
            case 'notification':
                return SettingsNotification
            case 'user':
            default:
                return SettingsPersonalData
        }
    }, [query])

    const tabs={
        links: [
            {
                href: '/accountV2/settings?content=user',
                nameContent: 'user',
                title: 'Личные данные',
                count: ''
            },
            {
                href: '/accountV2/settings?content=notification',
                nameContent: 'notification',
                title: 'Уведомления',
                count: ''
            },
            {
                href: '/accountV2/settings?content=blacklist',
                nameContent: 'blacklist',
                title: 'Черный список',
                count: ''
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
