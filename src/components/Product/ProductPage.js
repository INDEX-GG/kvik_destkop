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
            user_id,
            title,
            category_id,
            created_at,
            price,
            trade,
            isMyAd,
            isPhone,
            isMessage,
            dayBefore,
            all_time_contact_count,
            last_day_contact_count,
            all_time_viewing_count,
            last_day_viewing_count
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
                    <ProductOption
                        isMyAd={isMyAd}
                        productID={id}
                        allContactCount={all_time_contact_count}
                        lastDayContactCount={last_day_contact_count}
                        allViewingCount={all_time_viewing_count}
                        lastDayViewingCount={last_day_viewing_count}
                    />
                </ProductHeader>
                <ProductBody>
                    <Box className='productPageDescription'>
                        <ProductSlider/>
                        <ProductAdInfo
                            productId={id}
                        />
                    </Box>
                    <Box className='block__my_active_ad'>
                        <Box className='ad__block_top'>
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
                                sellerId={user_id}
                                productId={id}
                                isMobile={isMobile}
                                isMyAd={isMyAd}
                                isPhone={isPhone}
                                isMessage={isMessage}
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
