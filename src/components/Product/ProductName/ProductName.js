import React from 'react';
import {useProductNameStyles} from "./style";
import {Box} from '@material-ui/core'

const ProductName = ({title}) => {

    const classes = useProductNameStyles()

    return (
        <Box
            className={classes.name}>
            {title}
        </Box>
    );
};

export default React.memo(ProductName);
