import React from 'react';
import MetaLayout from '../../layout/MetaLayout'
import ProductPage from '../../src/components/Product/ProductPage';
import ProductProvider from "../../src/context/ProductContext";

const Product = () => {
    return (
        <MetaLayout>
            <ProductProvider>
                <ProductPage/>
            </ProductProvider>
        </MetaLayout>
    );
};

export default Product;
