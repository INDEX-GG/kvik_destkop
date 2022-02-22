import React from "react";
import {Box} from "@material-ui/core";
import {useProductAdditionalFieldsArrStyles} from './style';

const ProductAdditionalFieldsArr = ({columnData}) => {

    console.log(columnData);

    const classes = useProductAdditionalFieldsArrStyles()

    return (
        <Box>
            component
        </Box>
    )
}

export default React.memo(ProductAdditionalFieldsArr);
