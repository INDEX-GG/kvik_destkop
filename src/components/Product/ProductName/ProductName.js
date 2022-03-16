import React from 'react';
import {useProductNameStyles} from "./style";
import {Box} from '@material-ui/core'
import clsx from 'clsx'

const ProductName = ({title, isOpacity}) => {

    const classes = useProductNameStyles()

    return (
        <Box
            component='h1'
            className={clsx(
                classes.name, {
                    [classes.opacityName]: isOpacity,
                }
            )}>
            {title}
        </Box>
    );
};

export default React.memo(ProductName);
