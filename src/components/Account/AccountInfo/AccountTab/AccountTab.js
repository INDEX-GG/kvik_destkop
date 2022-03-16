import React from "react";
import {Box} from "@material-ui/core";
import {useAccountTabStyles} from './style';
import AccountTabItem from "./AccountTabItem/AccountTabItem";
import AccountOffersIcon from "../../../../UI/UIicon/AccountOffersIcon";
import AccountDealIcon from "../../../../UI/UIicon/AccountDealIcon";
import AccountWalletIcon from "../../../../UI/UIicon/AccountWalletIcon";
import AccountLikeIcon from "../../../../UI/UIicon/AccountLikeIcon";
import AccountMessageIcon from "../../../../UI/UIicon/AccountMessageIcon";
import AccountStatsIcon from "../../../../UI/UIicon/AccountStatsIcon";
import AccountSettingIcon from "../../../../UI/UIicon/AccountSettingIcon";
import AccountLeaveIcon from "../../../../UI/UIicon/AccountLeaveIcon";
import AccountStarIcon from "../../../../UI/UIicon/AccountStarIcon";

const tabData = [
    {
        title: 'Мои объявления',
        href: '/accountV2/offers/active',
        icon: AccountOffersIcon,
        style: 'offerIcon'
    },
    {
        title: 'Сделки',
        href: '/accountV2/deal',
        icon: AccountDealIcon,
        style: 'dealIcon'
    },
    {
        title: 'Кошелёк',
        href: '/accountV2/wallet/balance',
        icon: AccountWalletIcon,
        style: 'likeIcon'
    },
    {
        title: 'Избранное',
        href: '/accountV2/favorite/',
        icon: AccountLikeIcon
    },
    {
        title: 'Сообщения',
        href: '/account/message',
        icon: AccountMessageIcon
    },
    {
        title: 'Сравнить',
        href: '/account/compare',
        icon: AccountStatsIcon
    },
    {
        title: 'Отзывы',
        href: '/account/reviews',
        icon: AccountStarIcon
    },
    {
        title: 'Настройки',
        href: '/account/settings',
        icon: AccountSettingIcon
    },
    {
        title: 'Выход',
        href: '/',
        icon: AccountLeaveIcon
    }
]

const AccountTab = () => {

    const classes = useAccountTabStyles()

    return (
        <Box className={classes.tabContainer} component='ul'>
            {tabData.map(tab => (
                <AccountTabItem
                    key={tab.href}
                    title={tab.title}
                    href={tab.href}
                    icon={tab.icon}
                />
            ))}
        </Box>
    )
}

export default React.memo(AccountTab);
