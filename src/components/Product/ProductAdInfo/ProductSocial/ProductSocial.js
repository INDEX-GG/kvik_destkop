import React from "react";
import {Box} from "@material-ui/core";
import {useProductSocialStyles} from './style';

const ProductSocial = () => {

    const classes = useProductSocialStyles()

    return (
        <Box>
            component
        </Box>
    )
}

export default React.memo(ProductSocial);
