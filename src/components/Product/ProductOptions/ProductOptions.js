import React from 'react';
import ProductView from "./ProductView/ProductView";
import ProductCommentary from "./ProductCommentary/ProductCommentary";
import ProductLike from "./ProductLike/ProductLike";
// import ProductStats from "./ProductStats/ProductStats";
import ProductCall from "./ProductCall/ProductCall";
import {useProductOptionsStyles} from "./style";
import {Box} from "@material-ui/core";

const ProductOptions = (
    {
        productID,
        isMyAd,
        allContactCount,
        lastDayContactCount,
        allViewingCount,
        lastDayViewingCount
    }
) => {

    const classes = useProductOptionsStyles();
    const classWrapper = `${classes.iconWrapper} ${!isMyAd ? classes.myIconWrapper : ''}`

    return (
        productID ? (
            <Box className={classWrapper}>
                <ProductView
                    allViewingCount={allViewingCount}
                    lastDayViewingCount={lastDayViewingCount}
                />
                <ProductCall
                    allContactCount={allContactCount}
                    lastDayContactCount={lastDayContactCount}
                    isMyAd={isMyAd}
                />
                <ProductCommentary
                    isMyAd={isMyAd}
                />
                <ProductLike
                    productID={productID}
                    isMyAd={isMyAd}
                />
                {/*<ProductStats/>*/}
            </Box>
        ) : <></>
    );
};


export default React.memo(ProductOptions);
