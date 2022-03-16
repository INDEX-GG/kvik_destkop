import React from "react";
import {Box} from "@material-ui/core";
import CustomAvatarUI from "../../../../UI/UIcomponent/CustomAvatar/CustomAvatarUI";
import {useAccountContext} from "../../../../context/AccountContext";
import {ToRusDate} from "#lib/services";
import {useAccountUserStyles} from './style';
import CustomRatingUI from "../../../../UI/UIcomponent/CustomRating/CustomRatingUI";
import CustomTooltipUI from "../../../../UI/UIcomponent/CustomTooltip/CustomTooltipUI";
import AccountReviews from "./AccountReviews/AccountReviews";
import AccountSubscribers from "./AccountSubscribers/AccountSubscribers";
import AccountSubscriptions from "./AccountSubscriptions/AccountSubscriptions";

const AccountUser = () => {
    const classes = useAccountUserStyles()
    const {
        userInfo: {
            name,
            raiting,
            createdAt,
            userPhoto,
            subscribers_count,
            subscriptions_count
        },
    } = useAccountContext();


    return (
        <>
            <Box className={classes.avatar}>
                <CustomAvatarUI
                    customStyle={classes.avatar}
                    userName={name}
                    src={userPhoto}
                />
            </Box>
            <Box component='h6' className={classes.userName}>
                {name}
            </Box>
            <Box component='div' className={classes.userCreate}>
                на Kvik с {ToRusDate(createdAt)}
            </Box>
            <CustomTooltipUI title='В разработке'>
                <Box component='div' className={classes.userRating}>
                    <CustomRatingUI rating={raiting} readOnly/>
                </Box>
            </CustomTooltipUI>
            <Box className={classes.userMorInfo}>
                <AccountReviews raiting={raiting}/>
                <AccountSubscribers
                    subscribersCount={subscribers_count}
                />
                <AccountSubscriptions
                    subscriptionsCount={subscriptions_count}
                />
            </Box>
        </>
    )
}

export default React.memo(AccountUser);
