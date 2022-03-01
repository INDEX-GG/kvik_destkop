import React from "react";
import {Box} from "@material-ui/core";
import {useProductSocialStyles} from './style';
import VkLogoIcon from "../../../../UI/UIicon/VkLogoIcon";
import FacebookLogoIcon from "../../../../UI/UIicon/FacebookLogoIcon";
import OdnoklasLogoIcon from "../../../../UI/UIicon/OdnoklasLogoIcon";

const ProductSocial = ({productId}) => {

    const classes = useProductSocialStyles()

    return (
        productId ? (
            <Box className={classes.share}>
                <Box className={classes.shareTitle}>
                    Поделиться
                </Box>
                <Box className={classes.shareList}>
                    <Box className={classes.shareItem}>
                        <VkLogoIcon/>
                    </Box>
                    <Box className={classes.shareItem}>
                        <FacebookLogoIcon/>
                    </Box>
                    <Box className={classes.shareItem}>
                        <OdnoklasLogoIcon/>
                    </Box>
                </Box>
            </Box>
        ) : <></>
    )
}

export default React.memo(ProductSocial);
