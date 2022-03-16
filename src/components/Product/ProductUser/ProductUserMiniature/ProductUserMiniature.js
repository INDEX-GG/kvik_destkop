import React, {useMemo} from 'react';
import {Box} from "@material-ui/core";
import clsx from 'clsx'

import ProductUserBlock from "../ProductUserBlock/ProductUserBlock"
import CustomLinkUI from "../../../../UI/UIcomponent/CustomLinkUI/CustomLinkUI"
import CustomAvatarUI from "../../../../UI/UIcomponent/CustomAvatar/CustomAvatarUI"
import CustomRatingUI from "../../../../UI/UIcomponent/CustomRating/CustomRatingUI"
import ProductUserMiniatureSubscribe from "./ProductUserMiniatrueSubscribe/ProductUserMiniatureSubscribe"

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
        viewSubscribe = true,
        showRaiting = true,
    }
) => {

    const classes = useProductUserMiniatureStyles();

    const userProductsCountLabel = useMemo(
        () => wordAutoEnding('объявлен', checkEmptyNumber(user_products_count), ['ий', 'ие', 'ия', 'ий'], [0, 1, 2, 5]),
        [user_products_count]
    )

    const urlToAdOwner = useMemo(
        () => isMyAd ? `/account/${userId}?account=1&content=1` : `/user/${userId}`,
        [isMyAd]
    )

    return (
        <Box className={clsx(
            classes.userMiniature, {
                [classes.alignItemsCenter]: !showRaiting
            }
        )}
        >
            <CustomLinkUI
                href={urlToAdOwner}
                customRoot={classes.avatar}
            >
                <CustomAvatarUI
                    src={userPhoto}
                    userName={userName}
                    alt='SellerAvatar'
                />
            </CustomLinkUI>
            <Box className={classes.userInfo}>
                <CustomLinkUI
                    href={urlToAdOwner}
                    customRoot={classes.name}
                >
                    {userName}
                </CustomLinkUI>
               {showRaiting && <Box className={classes.raiting}><CustomRatingUI rating={userRating}/></Box> }
            </Box>
            {viewSubscribe && (
                <Box
                    className={clsx(
                        classes.userSubscribe, {
                            [classes.mobileView]: isMobile
                        }
                    )}
                >
                    <Box className={classes.userReviews}>
                        <CustomLinkUI
                            href='#'
                            customRoot={classes.userReviewsLink}
                        >
                            12 отзывов
                        </CustomLinkUI>
                    </Box>
                    {!isMyAd && (
                        <Box className={classes.userMiniatureSubscribe}>
                            <ProductUserMiniatureSubscribe
                                userId={userId}
                                isMobile={isMobile}
                            />
                        </Box>
                    )}
                    {isMobile && (
                        <>
                            <Box className={classes.allAd}>
                                <CustomLinkUI
                                    href={urlToAdOwner}
                                    customRoot={classes.buttonAllOffers}
                                >
                                    {userProductsCountLabel}
                                </CustomLinkUI>
                            </Box>
                            <Box className={classes.userComplainBlock}>
                                <ProductUserBlock />
                            </Box>
                        </>

                    )}
                </Box>
            )}
        </Box>
    );
};

export default React.memo(ProductUserMiniature);
