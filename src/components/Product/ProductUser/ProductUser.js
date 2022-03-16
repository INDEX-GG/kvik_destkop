import React from "react";
import {Box} from "@material-ui/core";
import {useProductUserStyles} from './style';
import ProductUserMiniature from "./ProductUserMiniature/ProductUserMiniature";
import {useProductContext} from "../../../context/ProductContext";
import ProductAdMiniature from "./ProductAdMiniature/ProductAdMiniature";
import ProductUserBlock from "./ProductUserBlock/ProductUserBlock";

const ProductUser = () => {

    const classes = useProductUserStyles()
    const {
        productData:
            {
                userPhoto,
                user_name,
                user_raiting,
                user_products,
                user_products_count,
                user_id,
                isMyAd
            },
            isMobile
    } = useProductContext();

    return (
        user_id ? (
            <Box className={classes.userContainer}>
                <Box className={classes.userInfo}>
                    <ProductUserMiniature
                        userId={user_id}
                        userPhoto={userPhoto}
                        userName={user_name}
                        userRating={user_raiting}
                        isMyAd={isMyAd}
                        isMobile={isMobile}
                        user_products_count={user_products_count}
                    />
                </Box>
                <Box className={classes.adMiniature}>
                    <ProductAdMiniature
                        isMyAd={isMyAd}
                        userId={user_id}
                        miniatureData={user_products}
                        user_products_count={user_products_count}
                    />
                </Box>
                {!isMyAd && !isMobile && (
                    <Box className={classes.userBlock}>
                        <ProductUserBlock/>
                    </Box>
                )}
            </Box>
        ) : <></>
    )
}

export default React.memo(ProductUser);
