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
// import NewCategoryScrollPostData from '#components/NewCategoryScrollPostData'
import CategoryScrollPostData from '../NewCategoryScrollPostData/CategoryScrollPostData'
import ProductPlaceHolder from '#components/placeHolders/ProductPlaceHolder/ProductPlaceHolder'

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

    return (
        <Box className={classes.productPage} id="productPage">
            <Box className="productPageContainer text">
                {!isLoading ? (
                    <Box>
                        <BreadCrumbs
                            data={breadData}
                            product={title}/>
                        <ProductWrapper>
                            <ProductBody>
                                <Box className={classes.productPageDescription}>
                                    <Box className={classes.productTitle}>
                                        {isMobile &&
                                            <ProductPrice
                                                price={price}
                                                isMobile={isMobile}
                                                trade={trade}
                                            />
                                        }
                                        <ProductName
                                            title={title}
                                        />
                                    </Box>
                                    <Box className={classes.productAdButtons}>
                                        {isMobile &&
                                            <ProductConnection
                                                productData={contextData.productData}
                                            />
                                        }
                                    </Box>
                                    <ProductSlider/>
                                    <ProductAdInfo
                                        productId={id}
                                    />
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
                                            />
                                        </Box>

                                        <Box className={classes.productPrice}>
                                            <ProductPrice
                                                price={price}
                                                isMobile={isMobile}
                                                trade={trade}
                                            />
                                        </Box>

                                        {!isMobile &&
                                            <ProductConnection
                                                productData={contextData.productData}
                                            />
                                        }
                                        <ProductUser/>
                                    </Box>
                                </Box>
                            </ProductBody>
                            {/* TODO: временно повесил, похожие перепишутся */}
                            <Box className={classes.productPageContent}>
                                <Box className={classes.productPageCard}>
                                    <NewCategoryScrollPostData url='/api/similarPosts' product={contextData.productData} />
                                </Box>
                            </Box>
                        </ProductWrapper>
                    </Box>
                ) : <ProductPlaceHolder />}
            </Box>
        </Box>
    );
};

export default React.memo(ProductPage);
