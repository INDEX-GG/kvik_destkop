import React, {useMemo} from "react";
import CustomSmallModalUI from "../../../UI/UIcomponent/CustomSmallModal/CustomSmallModalUI";
import AdBigMiniature from "../AdBigMiniature/AdBigMiniature";
import AdStatusChange from "../AdStatusChange/AdStatusChange";
import {Box} from "@mui/material";
import {useProductAdStatusChangeDialogStyles} from "./style";

const ProductAdStatusChangeDialog = (
    {
        open,
        onClose,
        adId,
        adPhoto,
        adPrice,
        adTitle,
        adAddress,
        statusData,
        callbackSuccess
    }
) => {

    const classes = useProductAdStatusChangeDialogStyles()
    const isAdMiniature = useMemo(() => (
        !!(adPhoto && adPrice && adTitle && adAddress)
    ), [adPhoto, adPrice, adTitle, adAddress])

    return (
        <CustomSmallModalUI
            openModal={open}
            handleCloseModal={onClose}
            customPaper={classes.modal}
        >
            {isAdMiniature && (
                <Box className={classes.container}>
                    <AdBigMiniature
                        adPhoto={adPhoto}
                        adPrice={adPrice}
                        adTitle={adTitle}
                        adAddress={adAddress}
                    />
                    <AdStatusChange
                        onClose={onClose}
                        callbackSuccess={callbackSuccess}
                        statusData={statusData}
                        productId={adId}
                    />
                </Box>
            )}
        </CustomSmallModalUI>
    )
}

export default React.memo(ProductAdStatusChangeDialog);
