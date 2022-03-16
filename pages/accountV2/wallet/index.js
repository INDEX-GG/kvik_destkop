import React, {useMemo} from 'react'
import {useRouter} from 'next/router'

import AccountProvider from "../../../src/context/AccountContext";
import AccountPage from "../../../src/components/Account/AccountPage";

import Balance from '../../../src/components/Account/Wallet/Balance/Balance'
import BalanceHistory from '../../../src/components/Account/Wallet/BalanceHistory/BalanceHistory'

const Index = () => {

    const router = useRouter()

    const query = router.query.content

    const ActiveContent = useMemo(() => {
        switch(query) {
            case 'history':
                return BalanceHistory
            case 'balance':
            default:
                return Balance
        }
    }, [query])

    const tabs={
        links: [
            {
                href: '/accountV2/wallet?content=balance',
                nameContent: 'balance',
                title: 'Баланс кошелька',
                count: ''
            },
            {
                href: '/accountV2/wallet?content=history',
                nameContent: 'history',
                title: 'История Операций',
                count: ''
            },
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
