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
import RatingStartIcon from "../../../../UI/UIicon/RatingStartIcon";
import AccountSettingIcon from "../../../../UI/UIicon/AccountSettingIcon";
import AccountLeaveIcon from "../../../../UI/UIicon/AccountLeaveIcon";

const tabData = [
    {
        title: 'Мои объявления',
        href: '/account/offer',
        icon: AccountOffersIcon
    },
    {
        title: 'Сделки',
        href: '/account/deal',
        icon: AccountDealIcon
    },
    {
        title: 'Кошелёк',
        href: '/account/wallet',
        icon: AccountWalletIcon
    },
    {
        title: 'Избранное',
        href: '/account/favorite',
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
        icon: RatingStartIcon
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
