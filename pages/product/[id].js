import React from 'react';
import ProductPage from '../../src/components/Product/ProductPage';
import ProductProvider from "../../src/context/ProductContext";

const Product = () => {
    return (
        <ProductProvider>
            <ProductPage/>
        </ProductProvider>
    );
};

export default Product;
