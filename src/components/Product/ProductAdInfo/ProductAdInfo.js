import React from "react";
import ProductLocation from "./ProductLocation/ProducLocation";
import ProductAdditionalFields from "./ProductAdditionalFields/ProductAdditionalFields";

const ProductAdInfo = () => {
    return (
        <>
            <ProductLocation/>
            <ProductAdditionalFields/>
        </>
    )
}

export default React.memo(ProductAdInfo);
