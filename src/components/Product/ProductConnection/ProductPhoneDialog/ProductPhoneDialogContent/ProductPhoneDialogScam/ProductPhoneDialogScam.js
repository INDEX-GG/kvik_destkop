import React from "react";
import {Box} from "@material-ui/core";
import scamItems from '../../ProductPhoneDialogData.json'
import ProductPhoneDialogScamItem from "../ProductPhoneDialogScamItem/ProductPhoneDialogScamItem";
import {useProductPhoneDialogScamStyles} from "./style";

const ProductPhoneDialogScam = () => {

    const classes = useProductPhoneDialogScamStyles()

    return (
        <Box>
            <Box className={classes.warningMessage}>
                Советы о том как не попасться мошенникам
            </Box>
            <Box component='ul' className={classes.scamList}>
                {scamItems.map(scamItem => (
                    <ProductPhoneDialogScamItem
                        key={scamItem.title}
                        title={scamItem.title}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default React.memo(ProductPhoneDialogScam);
