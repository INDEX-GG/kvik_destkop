import React from 'react';
import {useProductNameStyles} from "./style";
import {Box} from '@material-ui/core'
import clsx from 'clsx'

const ProductName = ({title, status}) => {

    const classes = useProductNameStyles()

    return (
        <Box
            className={clsx(
                classes.name, {
                    [classes.opacityName]: status === 'no_active',
                }
            )}>
            {title}
        </Box>
    );
};

export default React.memo(ProductName);
