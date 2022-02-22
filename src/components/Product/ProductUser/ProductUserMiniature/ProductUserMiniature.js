import React from 'react';
import {useProductUserMiniatureStyles} from "./style";
import {Box} from "@material-ui/core";
import CustomAvatarUI from "../../../../UI/UIcomponent/CustomAvatar/CustomAvatarUI";
import CustomRatingUI from "../../../../UI/UIcomponent/CustomRating/CustomRatingUI";
import ProductUserMiniatureSubscribe from "./ProductUserMiniatrueSubscribe/ProductUserMiniatureSubscribe";

const ProductUserMiniature = ({userPhoto, userName, userRating}) => {

    const classes = useProductUserMiniatureStyles();

    return (
        <Box className={classes.userMiniature}>
            <Box className={classes.avatar}>
                <CustomAvatarUI
                    src={userPhoto}
                    userName={userName}
                    alt='SellerAvatar'
                />
            </Box>
            <Box className={classes.userInfo}>
                <Box className={classes.name}>
                    {userName}
                </Box>
                <CustomRatingUI rating={userRating}/>
            </Box>
            <Box className={classes.userSubscribe}>
                <ProductUserMiniatureSubscribe/>
            </Box>
        </Box>
    );
};

export default React.memo(ProductUserMiniature);
