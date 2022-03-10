import React from 'react';
import {Box} from "@material-ui/core";
import clsx from 'clsx'

import {ToRubles} from "#lib/services";

import {useProductPriceStyles} from "./style";

const ProductPrice = ({price, isMobile, status, trade}) => {

    const classes = useProductPriceStyles();

    return (
        price ? (
            <Box
                className={
                    clsx({
                        ['SellerInfoOldPrice__adaptive']: isMobile,
                    })
                }
            >
                {/*<Box className="SellerInfoOldPrice thin dark crossed">{oldPrice ? ToRubles(oldPrice) : ''}</Box>*/}
                {/* <Box className='SellerInfoPrice thin xxl'>{ToRubles(price)}</Box> */}
                <Box
                    className={clsx(
                        classes.price, {
                            [classes.opacityPrice]: status === 'no_active',
                            [classes.opacityWeight]: status === 'no_active' && !isMobile,
                        }
                    )}
                >
                        {ToRubles(price)}
                </Box>
                {trade && status !== 'no_active' &&
                    <Box className="SellerInfoBargain dark thin"><p>Торг уместен</p></Box>
                }
            </Box>
        ) : null
    );
};

export default React.memo(ProductPrice);
