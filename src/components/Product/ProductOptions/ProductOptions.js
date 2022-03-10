import React from 'react';
import {Box} from "@material-ui/core";

import ProductView from "./ProductView/ProductView";
import ProductCommentary from "./ProductCommentary/ProductCommentary";
import ProductLike from "./ProductLike/ProductLike";
// import ProductStats from "./ProductStats/ProductStats";
import ProductCall from "./ProductCall/ProductCall";

import {checkEmptyNumber} from '../../../services/services'

import {useProductOptionsStyles} from "./style";

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
                    allViewingCount={checkEmptyNumber(allViewingCount)}
                    lastDayViewingCount={checkEmptyNumber(lastDayViewingCount)}
                />
                <ProductCall
                    allContactCount={checkEmptyNumber(allContactCount)}
                    lastDayContactCount={checkEmptyNumber(lastDayContactCount)}
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
