import React, {useMemo} from 'react';
import {useProductContext} from "../../context/ProductContext";
import {Box} from "@material-ui/core";
import BreadCrumbs from "#components/header/BreadСrumbs";
import BreadCrumbsProduct from "#components/product/BreadCrumbsProduct";
import ProductWrapper from "./ProductWrappers/ProductWrapper";
import ProductName from "./ProductName/ProductName";
import ProductOption from './ProductOptions/ProductOptions';
import ProductSlider from "./ProductSlider/ProductSlider";
import ProductBody from "./ProductWrappers/ProductBody/ProductBody";
import ProductDate from "./ProductDate/ProductDate";
import ProductPrice from "./ProductPrice/ProductPrice";
import ProductConnection from "./ProductConnection/ProductConnection";
import ProductUser from "./ProductUser/ProductUser";
import ProductAdInfo from "./ProductAdInfo/ProductAdInfo";
import {useProductPageStyles} from "./styles";

const ProductPage = () => {

    const contextData = useProductContext()
    const classes = useProductPageStyles()

    const {
        productData: {
            id,
            title,
            category_id,
            created_at,
            price,
            trade,
            isMyAd,
            dayBefore,
            all_time_contact_count,
            last_day_contact_count,
            all_time_viewing_count,
            last_day_viewing_count
        },
        isMobile
    } = contextData;
    const breadData = useMemo(() => BreadCrumbsProduct(category_id), [category_id])
    console.log(contextData);


    return (
        <Box style={{padding: '0 12px'}}>
            <BreadCrumbs
                data={breadData}
                product={title}/>
            <ProductWrapper>
                <ProductBody>
                    <Box className='productPageDescription'>
                        <Box className={classes.productTitle}>
                            <ProductName
                                title={title}
                            />
                        </Box>
                        <ProductSlider/>
                        <ProductAdInfo
                            productId={id}
                        />
                    </Box>
                    <Box className='block__my_active_ad'>
                        <Box className={classes.productUser}>
                            <Box className={classes.productCounts}>
                                <ProductOption
                                    isMyAd={isMyAd}
                                    productID={id}
                                    allContactCount={all_time_contact_count}
                                    lastDayContactCount={last_day_contact_count}
                                    allViewingCount={all_time_viewing_count}
                                    lastDayViewingCount={last_day_viewing_count}
                                />
                            </Box>
                            <ProductDate
                                date={created_at}
                                dayBefore={dayBefore}
                                isMyAd={isMyAd}
                            />
                            <ProductPrice
                                price={price}
                                isMobile={isMobile}
                                trade={trade}
                            />
                            <ProductConnection
                                productData={contextData.productData}
                            />
                            <ProductUser/>
                        </Box>
                    </Box>
                </ProductBody>
            </ProductWrapper>
        </Box>
    );
};

export default React.memo(ProductPage);
