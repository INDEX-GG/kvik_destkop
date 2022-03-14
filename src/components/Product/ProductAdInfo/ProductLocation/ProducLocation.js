import React, {useState} from "react";
import {Box} from "@material-ui/core";

import { useProductLocationStyles} from './style';
import ProductMap from "../ProductMap/ProductMap";
import {checkActiveClass} from "../../../../services/services";
import {useProductContext} from "../../../../context/ProductContext";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";

const ProductLocation = () => {

    const classes = useProductLocationStyles()
    const {productData: {address, coordinates}, isMobile} = useProductContext();

    const [openMap, setOpenMap] = useState(false);
    const isLoading = address && coordinates

    const locationMapArrow = checkActiveClass(
        openMap,
        classes.locationMapArrow,
        [classes.locationMapArrowActive]
    )

    const handleOpenMap = () => {
        setOpenMap(!openMap);
    }

    return (
        isLoading ? (
            <Box className={classes.locationContainer}>
                <Box className={classes.locationInfoContainer}>
                    <Box className={classes.locationTitle}>
                        Местоположение
                    </Box>
                    <Box component='p' className={classes.locationAddress}>
                        {address}
                    </Box>
                    <CustomButtonUI>
                    <Box className={classes.locationMap} onClick={handleOpenMap}>
                        <Box className={classes.locationMapText}>
                            {/* если понадобится, чтобы на мобилке был другой текст */}
                            {/* {isMobile ? 'Показать на карте' : 'На карте'} */}
                            На карте
                        </Box>
                        {!isMobile && <Box component='span' className={locationMapArrow}/>}
                    </Box>
                    </CustomButtonUI>
                </Box>
                <ProductMap
                    openMap={openMap}
                    coordinates={coordinates}
                />
            </Box>
        ) : <></>
    )
}

export default React.memo(ProductLocation);
