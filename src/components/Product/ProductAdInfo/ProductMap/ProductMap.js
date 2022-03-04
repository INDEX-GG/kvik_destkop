import React from "react";
import {Collapse} from "@material-ui/core";
import ProductYMAP from "#components/product/ProductYMAP";
import {stringArrayToNumberArray} from "../../../../services/services";

const ProductMap = ({openMap, coordinates}) => {

    const numberCoordinates = stringArrayToNumberArray(coordinates)

    return (
        <Collapse in={openMap}>
            <ProductYMAP
                coordinates={numberCoordinates}
                width='100%'
                height={400}
            />
        </Collapse>
    )
}

export default React.memo(ProductMap);
