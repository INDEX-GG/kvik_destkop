import React from "react";
import ProductLocation from "./ProductLocation/ProducLocation";
import ProductAdditionalFields from "./ProductAdditionalFields/ProductAdditionalFields";
import ProductSocial from "./ProductSocial/ProductSocial";

const ProductAdInfo = ({productId}) => {
    return (
        <>
            <ProductLocation/>
            <ProductAdditionalFields/>
            <ProductSocial
                productId={productId}
            />
        </>
    )
}

export default React.memo(ProductAdInfo);
