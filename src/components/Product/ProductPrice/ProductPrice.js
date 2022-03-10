import React from 'react';
import {ToRubles} from "#lib/services";
import {Box} from "@material-ui/core";
import {useProductPriceStyles} from "./style";

const ProductPrice = ({price, isMobile}) => {

    const classes = useProductPriceStyles();

    return (
        price ? (
            <Box className={isMobile ? 'SellerInfoOldPrice__adaptive' : ''}>
                {/*<Box className="SellerInfoOldPrice thin dark crossed">{oldPrice ? ToRubles(oldPrice) : ''}</Box>*/}
                {/* <Box className='SellerInfoPrice thin xxl'>{ToRubles(price)}</Box> */}
                <Box className={classes.price}>{ToRubles(price)}</Box>
                {/*{trade && (*/}
                {/*    <Box className="SellerInfoBargain dark thin"><p>Торг уместен</p></Box>*/}
                {/*)}*/}
            </Box>
        ) : null
    );
};

export default React.memo(ProductPrice);
