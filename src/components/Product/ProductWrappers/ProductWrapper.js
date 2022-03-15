import React from 'react';
import { Box } from '@material-ui/core'

const ProductWrapper = ({children}) => {
    return (
        <Box className="product__wrapper">
            <Box className="productPageWrapper">
                {children}
            </Box>
        </Box>
    );
};

export default React.memo(ProductWrapper);
