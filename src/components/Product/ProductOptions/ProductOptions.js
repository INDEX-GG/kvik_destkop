import React from 'react';
import ProductView from "./ProductView/ProductView";
import ProductCommentary from "./ProductCommentary/ProductCommentary";
import ProductLike from "./ProductLike/ProductLike";
import ProductStats from "./ProductStats/ProductStats";
import ProductCall from "./ProductCall/ProductCall";
import {makeStyles} from "@material-ui/core";

const ProductOptions = () => {

    const classes = useStyles();

    return (
        <div className={`productHeaderStat ${classes.iconWrapper}`}>
            <ProductView/>
            <ProductCall/>
            <ProductCommentary/>
            <ProductStats/>
            <ProductLike/>
        </div>
    );
};


const useStyles = makeStyles(() => ({
    iconWrapper: {
        display: 'flex'
    }
}))

export default React.memo(ProductOptions);
