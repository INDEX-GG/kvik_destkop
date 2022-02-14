import React from 'react';
import ProductView from "./ProductView/ProductView";
import ProductCommentary from "./ProductCommentary/ProductCommentary";
import ProductLike from "./ProductLike/ProductLike";
import ProductStats from "./ProductStats/ProductStats";
import ProductCall from "./ProductCall/ProductCall";

const ProductOptions = () => {
    return (
        <div className="productHeaderStat">
            <ProductView/>
            <ProductCall/>
            <ProductCommentary/>
            <ProductStats/>
            <ProductLike/>
        </div>
    );
};

export default ProductOptions;
