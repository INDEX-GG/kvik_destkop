import React from "react";
import {Box} from "@material-ui/core";
import {useProductDescriptionStyles} from './style';
import {formatDescription} from "../../../../../services/services";

const ProductDescription = ({description}) => {

    const classes = useProductDescriptionStyles()

    return (
        <Box component='pre' className={classes.description}>
            {formatDescription(description)}
        </Box>
    )
}

export default React.memo(ProductDescription);
