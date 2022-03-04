import React from "react";
import {useProductPhoneDialogStyles} from './style';
import CustomSmallModalUI from "../../../../UI/UIcomponent/CustomSmallModal/CustomSmallModalUI";
import ProductPhoneDialogScam from "./ProductPhoneDialogContent/ProductPhoneDialogScam/ProductPhoneDialogScam";
import ProductPhoneDialogUserInfo
    from "./ProductPhoneDialogContent/ProductPhoneDialogUserInfo/ProductPhoneDialogUserInfo";
import {Box} from '@material-ui/core'

const ProductPhoneDialog = ({open, onClose}) => {

    const classes = useProductPhoneDialogStyles()

    return (
        <CustomSmallModalUI
            openModal={open}
            handleCloseModal={onClose}
            maxWidth='sm'
            customPaper={classes.paper}
        >
            <Box className={classes.container}>
                <ProductPhoneDialogUserInfo/>
                <ProductPhoneDialogScam/>
            </Box>
        </CustomSmallModalUI>
    )
}

export default React.memo(ProductPhoneDialog);
