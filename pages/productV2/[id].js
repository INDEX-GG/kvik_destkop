import React from 'react';
import MetaLayout from '../../layout/MetaLayout'
import ProductPage from '../../src/components/Product/ProductPage';
import ProductProvider from "../../src/context/ProductContext";
import {Box} from "@material-ui/core";

const Product = () => {
    return (
        <MetaLayout>
            <ProductProvider>
              <Box className="productPage" id="productPage">
                <Box className="productPageContainer text">
                  <ProductPage/>
                </Box>
              </Box>
            </ProductProvider>
        </MetaLayout>
    );
};

export default Product;
