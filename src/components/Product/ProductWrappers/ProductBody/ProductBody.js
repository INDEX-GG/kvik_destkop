import React from 'react';
import {Box} from "@material-ui/core";

const ProductBody = ({children}) => {
    return (
        <Box className='product__main_block'>
            {children}
        </Box>
    );
};

export default ProductBody;
