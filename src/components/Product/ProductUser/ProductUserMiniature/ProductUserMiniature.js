import React from 'react';
import {useProductUserMiniatureStyles} from "./style";
import {Box} from "@material-ui/core";
import CustomAvatarUI from "../../../../UI/UIcomponent/CustomAvatar/CustomAvatarUI";
import CustomRatingUI from "../../../../UI/UIcomponent/CustomRating/CustomRatingUI";
import ProductUserMiniatureSubscribe from "./ProductUserMiniatrueSubscribe/ProductUserMiniatureSubscribe";
import {useCustomRouter} from "../../../../hook/globalHooks/useCustomRouter";

const ProductUserMiniature = (
    {
        userId,
        userPhoto,
        userName,
        userRating,
        isMyAd,
        viewSubscribe = true
    }
) => {

    const classes = useProductUserMiniatureStyles();
    const {pushTo} = useCustomRouter();

    const handleClickUser = () => {
        pushTo(`/user/${userId}`)
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
                <Box className={classes.userSubscribe}>
                    {!isMyAd && (
                        <ProductUserMiniatureSubscribe
                            userId={userId}
                        />
                    )}
                </Box>
            )}
        </Box>
    );
};

export default React.memo(ProductUserMiniature);
