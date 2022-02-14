import React from 'react';
import MetaLayout from '../../layout/MetaLayout'
import ProductPage from '../../src/components/Product/ProductPage/ProductPage';
import ProductProvider from "../../src/context/ProductContext";

const Product = () => {
    return (
        <MetaLayout>
            <ProductProvider>
              <div className="productPage" id="productPage">
                <div className="productPageContainer text">
                  <ProductPage/>
                </div>
              </div>
            </ProductProvider>
        </MetaLayout>
    );
};

export default Product;
