import React from 'react';
import {Box} from "@material-ui/core";
import {ToRusDate} from "#lib/services";

const ProductDate = ({date}) => {
    return (
        <Box className='SellerInfoDate_active'>
            Размещено {ToRusDate(date)}
        </Box>
    );
};

export default React.memo(ProductDate);
