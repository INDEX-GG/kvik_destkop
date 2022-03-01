import React from "react";
import {Box} from "@material-ui/core";
import {useProductAdMiniatureStyles} from './style';
import AdMiniatureItem from "../../../AnyPage/AdMiniatureItem/AdMiniatureItem";
import {useCustomRouter} from "../../../../hook/globalHooks/useCustomRouter";
import CustomButtonUI from "../../../../UI/UIcomponent/CustomButtonUI/CustomButtonUI";

const ProductAdMiniature = ({miniatureData, user_products_count, userId, isMyAd}) => {

    const classes = useProductAdMiniatureStyles()
    const isValidData = Array.isArray(miniatureData) && miniatureData?.length
    const {pushTo} = useCustomRouter()

    const handlePushSeller = () => {
        if (isMyAd) {
            pushTo(`/account/${userId}?account=1&content=1`)
            return
        }
        pushTo(`/user/${userId}`)
    }

    return (
        isValidData ? (
            <>
                <Box className={classes.miniatureContainer}>
                    {miniatureData.map(miniature => (
                        <AdMiniatureItem
                            key={miniature.id}
                            {...miniature}
                        />
                    ))}
                </Box>
                <Box className={classes.allAd}>
                    <CustomButtonUI
                        color='primary'
                        onClick={handlePushSeller}
                    >
                        Все объявления продавца ({user_products_count})
                    </CustomButtonUI>
                </Box>
            </>) : <></>
    )
}

export default React.memo(ProductAdMiniature);
