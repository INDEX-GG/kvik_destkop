import React from "react";
import {useProductPhoneDialogStyles} from './style';
import CustomSmallModalUI from "../../../../UI/UIcomponent/CustomSmallModal/CustomSmallModalUI";
import CustomButtonUI from '../../../../UI/UIcomponent/CustomButtonUI/CustomButtonUI'
import ProductPhoneDialogScam from "./ProductPhoneDialogContent/ProductPhoneDialogScam/ProductPhoneDialogScam";
import ProductPhoneDialogUserInfo
    from "./ProductPhoneDialogContent/ProductPhoneDialogUserInfo/ProductPhoneDialogUserInfo";
import {Box} from '@material-ui/core'

const ProductPhoneDialog = ({isMobile, open, onClose}) => {

    const classes = useProductPhoneDialogStyles()

    return (
        <CustomSmallModalUI
            openModal={open}
            handleCloseModal={onClose}
            maxWidth='sm'
            customPaper={classes.paper}
        >
            <Box className={classes.container}>
                {!isMobile ? (
                    <>
                        <ProductPhoneDialogUserInfo/>
                        <ProductPhoneDialogScam/>
                    </>
                ) : (
                    <Box className={classes.mobileContainer}>
                        <ProductPhoneDialogUserInfo showRaiting={false} smallPhone={true}/>
                        <CustomButtonUI customRoot={classes.callButton}>
                            Позвонить
                        </CustomButtonUI>
                    </Box>
                )
            }
            </Box>
        </CustomSmallModalUI>
    )
}

export default React.memo(ProductPhoneDialog);
