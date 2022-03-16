import React, {useMemo} from 'react';
import {useProductContext} from "../../context/ProductContext";
import {Box} from "@material-ui/core";

import ScrollTop from "#UI/ScrollTop"
import ProductName from "./ProductName/ProductName"
import ProductDate from "./ProductDate/ProductDate"
import ProductUser from "./ProductUser/ProductUser"
import ProductPrice from "./ProductPrice/ProductPrice"
import BreadCrumbs from "#components/header/BreadСrumbs"
import ProductSlider from "./ProductSlider/ProductSlider"
import ProductAdInfo from "./ProductAdInfo/ProductAdInfo"
import ProductOption from "./ProductOptions/ProductOptions"
import ProductWrapper from "./ProductWrappers/ProductWrapper"
import ProductBody from "./ProductWrappers/ProductBody/ProductBody"
import ProductConnection from "./ProductConnection/ProductConnection"
import BreadCrumbsProduct from "#components/product/BreadCrumbsProduct"
import ProductNoActive from "./ProductAdInfo/ProductNoActive/ProductNoActive"
// import NewCategoryScrollPostData from '#components/NewCategoryScrollPostData'
import CategoryScrollPostData from "../NewCategoryScrollPostData/CategoryScrollPostData"
import ProductMobileWrapper from './ProductWrappers/ProductMobileWrapper/ProductMobileWrapper'
import ProductPlaceHolder from "#components/placeHolders/ProductPlaceHolder/ProductPlaceHolder"

import {useProductPageStyles} from "./styles";
import MetaLayout from "#layout/MetaLayout";

const ProductPage = () => {

    const contextData = useProductContext()
    const {
        productData: {
            id,
            title,
            category_id,
            created_at,
            price,
            trade,
            isMyAd,
            status, isNoActive, isBanned, isTimeLimit, isOpacity,
            dayBefore,
            all_time_contact_count,
            last_day_contact_count,
            all_time_viewing_count,
            last_day_viewing_count
        },
        isMobile
    } = contextData;

    const classes = useProductPageStyles()

    const breadData = useMemo(() => BreadCrumbsProduct(category_id), [category_id])
    const isLoading = typeof id === 'undefined' && id !== null

    {/* у дочерних блоков productPageDescription заданы order
        в соответсвтвующих ./style для изменения расположения на мобилке/десктопе, смотри useProductPageStyles
    */}
    return (
        <MetaLayout title={title ? title : ''}>
            <ProductMobileWrapper isMobile={isMobile}>
                <Box className={classes.productPage} id="productPage">
                    <Box className={classes.productPageContainer}>
                        {!isLoading ? (
                            <Box>
                                <Box component='nav' className={classes.productBreadCrumbs}>
                                    <BreadCrumbs
                                        data={breadData}
                                        product={title}
                                    />
                                </Box>
                                <ProductWrapper>
                                    <ProductBody>
                                        <Box className={classes.productPageDescription}>
                                            <Box className={classes.productTitle}>
                                                {isMobile && (
                                                    <ProductPrice
                                                        price={price}
                                                        isMobile={isMobile}
                                                        trade={trade}
                                                        status={status}
                                                    />
                                                )}
                                                <ProductName
                                                    title={title}
                                                    status={status}
                                                    isOpacity={isOpacity}
                                                />
                                            )}
                                        </Box>
                                        {/* плашка объявление снято с публикации на мобилке */}
                                        { isMobile && (
                                            <Box className={classes.productNoActive}>
                                                <ProductNoActive
                                                    isMyAd={isMyAd}
                                                    status={status}
                                                    isBanned={isBanned}
                                                    isOpacity={isOpacity}
                                                    isNoActive={isNoActive}
                                                    isTimeLimit={isTimeLimit}
                                                />
                                            </Box>
                                        )}
                                        <Box className={classes.productAdButtons}>
                                            {isMobile &&
                                                <ProductConnection
                                                    productData={contextData.productData}
                                                    isMobile={isMobile}
                                                />
                                            }
                                        </Box>
                                        <ProductSlider
                                            status={status}
                                            isOpacity={isOpacity}
                                        />
                                        <Box className={classes.productAdInfo}>
                                            <ProductAdInfo
                                                productId={id}
                                                status={status}
                                                isMobile={isMobile}
                                            />
                                        </Box>
                                    </Box>
                                    <Box className={classes.productAd}>
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
                                            <Box className={classes.productDate}>
                                                <ProductDate
                                                    date={created_at}
                                                    dayBefore={dayBefore}
                                                    isMyAd={isMyAd}
                                                    status={status}
                                                    isOpacity={isOpacity}
                                                />
                                            </Box>
                                            <ProductSlider status={status} />
                                            <Box component='article'className={classes.productAdInfo}>
                                                <ProductAdInfo
                                                    productId={id}
                                                    status={status}
                                                    isOpacity={isOpacity}
                                                    isMobile={isMobile}
                                                />
                                            </Box>
                                        </Box>
                                        <Box className={classes.productAd}>
                                            <Box component='aside' className={classes.productUser}>
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
                                                <Box component='time' className={classes.productDate}>
                                                    <ProductDate
                                                        date={created_at}
                                                        dayBefore={dayBefore}
                                                        isMyAd={isMyAd}
                                                        status={status}
                                                    />
                                                </Box>

                                                <Box className={classes.productPrice}>
                                                    <ProductPrice
                                                        price={price}
                                                        isMobile={isMobile}
                                                        trade={trade}
                                                        status={status}
                                                    />
                                                </Box>

                                                {!isMobile &&
                                                    <ProductConnection
                                                        productData={contextData.productData}
                                                        isMobile={isMobile}
                                                    />
                                                }
                                                <ProductUser/>
                                            </Box>
                                        </Box>
                                    </ProductBody>
                                    <Box className={classes.productPageContent}>
                                        <Box className={classes.productPageCard}>
                                            {/* плашка объявление снято с публикации на десктопе */}
                                            {isNoActiveDesktop && <ProductNoActive />}
                                            <CategoryScrollPostData url='/api/similarPosts' product={contextData.productData} />
                                        </Box>
                                    </Box>
                                </ProductBody>
                                <Box className={classes.productPageContent}>
                                    <Box className={classes.productPageCard}>
                                        {/* плашка объявление снято с публикации на десктопе */}
                                        {!isMobile && (
                                            <ProductNoActive
                                                isMyAd={isMyAd}
                                                status={status}
                                                isBanned={isBanned}
                                                isOpacity={isOpacity}
                                                isNoActive={isNoActive}
                                                isTimeLimit={isTimeLimit}
                                            />
                                        )}
                                        <CategoryScrollPostData url='/api/similarPosts' product={contextData.productData} />
                                    </Box>
                                </Box>
                            </ProductWrapper>
                        </Box>
                    ) : <ProductPlaceHolder />}
                </Box>
            </ProductMobileWrapper>
        </MetaLayout>
    );
};

export default React.memo(ProductPage);
