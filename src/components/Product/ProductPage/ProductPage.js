import React, {useMemo} from 'react';
import {useProductContext} from "../../../context/ProductContext";
import BreadCrumbs from "#components/header/BreadСrumbs";
import BreadCrumbsProduct from "#components/product/BreadCrumbsProduct";
import ProductWrapper from "../ProductWrappers/ProductWrapper";
import ProductHeader from "../ProductWrappers/ProductHeader/ProductHeader";
import ProductName from "../ProductName/ProductName";
import ProductOption from '../../../../src/components/Product/ProductOptions/ProductOptions';
import ProductSlider from "../ProductSlider/ProductSlider";
import ProductBody from "../ProductWrappers/ProductBody/ProductBody";
import {Box} from "@material-ui/core";

const ProductPage = () => {
    const {productData: {title, category_id}, isMobile} = useProductContext();
    const breadData = useMemo(() => BreadCrumbsProduct(category_id), [category_id])

    console.log(isMobile);

    return (
        <>
            <BreadCrumbs data={breadData} product={title}/>
            <ProductWrapper>
                <ProductHeader>
                    <ProductName/>
                    <ProductOption/>
                </ProductHeader>
                <ProductBody>
                    <Box className='productPageDescription'>
                        <ProductSlider/>
                    </Box>
                    <Box className='block__my_active_ad'>

                    </Box>
                </ProductBody>
            </ProductWrapper>
        </>
    );
};

export default React.memo(ProductPage);
