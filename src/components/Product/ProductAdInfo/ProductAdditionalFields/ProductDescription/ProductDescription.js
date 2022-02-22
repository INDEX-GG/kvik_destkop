import React from "react";
import {Box} from "@material-ui/core";
import {useProductDescriptionStyles} from './style';

const ProductDescription = ({description}) => {

    const classes = useProductDescriptionStyles()


    return (
        <Box className={classes.description}>
            {description}
        </Box>
    )
}

export default React.memo(ProductDescription);
