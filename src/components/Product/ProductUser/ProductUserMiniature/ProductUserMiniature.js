import React, {useMemo} from 'react';
import {Box} from "@material-ui/core";
import clsx from 'clsx'

import {useCustomRouter} from "../../../../hook/globalHooks/useCustomRouter";
import CustomAvatarUI from "../../../../UI/UIcomponent/CustomAvatar/CustomAvatarUI";
import CustomRatingUI from "../../../../UI/UIcomponent/CustomRating/CustomRatingUI";
import CustomButtonUI from "../../../../UI/UIcomponent/CustomButtonUI/CustomButtonUI";
import ProductUserMiniatureSubscribe from "./ProductUserMiniatrueSubscribe/ProductUserMiniatureSubscribe";

import {wordAutoEnding, checkEmptyNumber} from '../../../../services/services'

import {useProductUserMiniatureStyles} from "./style";

const ProductUserMiniature = (
    {
        userId,
        userPhoto,
        userName,
        userRating,
        isMyAd,
        isMobile,
        user_products_count,
        viewSubscribe = true
    }
) => {

    const classes = useProductUserMiniatureStyles();
    const {pushTo} = useCustomRouter();

    const userProductsCountLabel = useMemo(
        () => wordAutoEnding('объявлен', checkEmptyNumber(user_products_count), ['ий', 'ие', 'ия', 'ий'], [0, 1, 2, 5]),
        [user_products_count]
    )


    const handleClickUser = () => {
        pushTo(`/user/${userId}`)
    }

    const handlePushSeller = () => {
        if (isMyAd) {
            pushTo(`/account/${userId}?account=1&content=1`)
            return
        }
        handleClickUser()
    }

    return (
        <Box className={classes.userMiniature}>
            <Box
                className={classes.avatar}
                onClick={handleClickUser}>
                <CustomAvatarUI
                    src={userPhoto}
                    userName={userName}
                    alt='SellerAvatar'
                />
            </Box>
            <Box className={classes.userInfo}>
                <Box
                    className={classes.name}
                    onClick={handleClickUser}
                >
                    {userName}
                </Box>
                <CustomRatingUI rating={userRating}/>
            </Box>
            {viewSubscribe && (
                <Box
                    className={clsx(
                        classes.userSubscribe, {
                            [classes.mobileView]: isMobile
                        }
                    )}
                >
                    {!isMyAd && (
                        <ProductUserMiniatureSubscribe
                            userId={userId}
                        />
                    )}
                    {isMobile && (
                        <Box className={classes.allAd}>
                            <CustomButtonUI
                                color='primary'
                                onClick={handlePushSeller}
                                customRoot={classes.buttonAllOffers}
                            >
                                {userProductsCountLabel}
                            </CustomButtonUI>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default React.memo(ProductUserMiniature);
