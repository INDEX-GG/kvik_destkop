import React, {useMemo} from 'react';
import {useProductContext} from "../../context/ProductContext";
import {Box} from "@material-ui/core";
import BreadCrumbs from "#components/header/BreadСrumbs";
import BreadCrumbsProduct from "#components/product/BreadCrumbsProduct";
import ProductWrapper from "./ProductWrappers/ProductWrapper";
import ProductHeader from "./ProductWrappers/ProductHeader/ProductHeader";
import ProductName from "./ProductName/ProductName";
import ProductOption from './ProductOptions/ProductOptions';
import ProductSlider from "./ProductSlider/ProductSlider";
import ProductBody from "./ProductWrappers/ProductBody/ProductBody";
import ProductDate from "./ProductDate/ProductDate";
import ProductPrice from "./ProductPrice/ProductPrice";
import ProductConnection from "./ProductConnection/ProductConnection";
import ProductUser from "./ProductUser/ProductUser";
import ProductAdInfo from "./ProductAdInfo/ProductAdInfo";

const ProductPage = () => {
    const {
        productData: {
            id,
            title,
            category_id,
            created_at,
            price,
            trade,
            isMyAd,
            additional_fields
        },
        isMobile
    } = useProductContext();
    const breadData = useMemo(() => BreadCrumbsProduct(category_id), [category_id])

    console.log(useProductContext());

    return (
        <Box style={{padding: '0 12px'}}>
            <BreadCrumbs
                data={breadData}
                product={title}/>
            <ProductWrapper>
                <ProductHeader>
                    <ProductName/>
                    <ProductOption/>
                </ProductHeader>
                <ProductBody>
                    <Box className='productPageDescription'>
                        <ProductSlider/>
                        <ProductAdInfo/>
                    </Box>
                    <Box className='block__my_active_ad'>
                        <Box className='ad__block_top'>
                            <ProductDate date={created_at}/>
                            <ProductPrice price={price} isMobile={isMobile} trade={trade}/>
                            <ProductConnection id={id} isMyAd={isMyAd}/>
                            <ProductUser/>
                        </Box>
                    </Box>
                </ProductBody>
            </ProductWrapper>
        </Box>
    );
};

export default React.memo(ProductPage);
