import React from "react";
import {Box} from "@material-ui/core";
import {useProductAdMiniatureStyles} from './style';
import ProductAdMiniatureItem from "./ProductAdMiniatureItem/ProductAdMiniatureItem";
import {useCustomRouter} from "../../../../hook/globalHooks/useCustomRouter";

const ProductAdMiniature = ({miniatureData, user_products_count, userId}) => {

    const classes = useProductAdMiniatureStyles()
    const isValidData = Array.isArray(miniatureData) && miniatureData?.length
    const {pushTo} = useCustomRouter()

    const handlePushSeller = () => {
        pushTo(`/user/${userId}`)
    }

    return (
        isValidData ? (
            <>
                <Box className={classes.miniatureContainer}>
                    {miniatureData.map(miniature => (
                        <ProductAdMiniatureItem
                            key={miniature.id}
                            {...miniature}
                        />
                    ))}
                </Box>
                <Box className={classes.allAd} onClick={handlePushSeller}>
                    Все объявления продавца ({user_products_count})
                </Box>
            </>) : <></>
    )
}

export default React.memo(ProductAdMiniature);
