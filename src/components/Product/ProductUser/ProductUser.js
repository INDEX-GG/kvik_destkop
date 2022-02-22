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
                user_id
            }
    } = useProductContext();

    return (
        <Box className={classes.userContainer}>
            <Box className={classes.userInfo}>
                <ProductUserMiniature
                    userPhoto={userPhoto}
                    userName={user_name}
                    userRating={user_raiting}
                />
            </Box>
            <Box className={classes.adMiniature}>
                <ProductAdMiniature
                    userId={user_id}
                    miniatureData={user_products}
                    user_products_count={user_products_count}
                />
            </Box>
            <Box className={classes.userBlock}>
                <ProductUserBlock/>
            </Box>
        </Box>
    )
}

export default React.memo(ProductUser);
