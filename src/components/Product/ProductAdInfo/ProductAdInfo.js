import React from "react";
import {Box} from "@material-ui/core";

import ProductSocial from "./ProductSocial/ProductSocial";
import ProductLocation from "./ProductLocation/ProducLocation";
import ProductAdditionalFields from "./ProductAdditionalFields/ProductAdditionalFields";
import ProductShowMoreWrapper from '../ProductWrappers/ProductShowMoreWrapper/ProductShowMoreWrapper'

import {useProductAdInfoStyles} from './style'

const ProductAdInfo = ({productId, status, isMobile}) => {

    const classes = useProductAdInfoStyles()

    return (
        <Box className={classes.noActiveWrapper} >
            <ProductShowMoreWrapper
                align={'left'}
                // isMobile={true}
                isMobile={status === 'no_active' || status === 'time_limit'}
                showArrow={true}
                collapsedSize={'0px'}
                textExpand={'Описание'}
                textCollaps={'Описание'}
                navMovesWithContent={false}
            >
                <ProductLocation/>
                <ProductAdditionalFields
                    isMobile={isMobile}
                />
                <ProductSocial
                    productId={productId}
                />
            </ProductShowMoreWrapper>
        </Box>
    )
}

export default React.memo(ProductAdInfo);
