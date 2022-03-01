import React, {useState} from "react";
import {Box} from "@material-ui/core";
import {useProductDescriptionStyles} from './style';
import {formatDescription} from "../../../../../services/services";
import ProductShowMoreWrapper from '../../../ProductWrappers/ProductShowMoreWrapper/ProductShowMoreWrapper'

const ProductDescription = ({description}) => {

    const classes = useProductDescriptionStyles()

    return (
        <ProductShowMoreWrapper>
            <Box
                component='pre'
                className={classes.description}
            >
                {formatDescription(description)}
            </Box>
        </ProductShowMoreWrapper>
    )
}

export default React.memo(ProductDescription);
