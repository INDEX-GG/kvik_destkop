import React from 'react';
import {useProductContext} from "../../../context/ProductContext";

const ProductName = () => {

    const {productData: {title}} = useProductContext();

    return (
        <div className="productPageTitle xl">{title}</div>
    );
};

export default React.memo(ProductName);
