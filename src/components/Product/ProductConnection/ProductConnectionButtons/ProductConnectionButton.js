import React from 'react';
import {Box} from "@material-ui/core";
import KvikButtonUI from "../../../../UI/UIcomponent/KvikButtonUI";
import {useProductConnectionButtonStyles} from "./style";

const ProductConnectionButton = ({title, icon, isMyAd = false, onClick}) => {

    const classes = useProductConnectionButtonStyles();
    const Icon = icon;
    const bottomRoot = isMyAd ? `${classes.myButtonRoot}` : `${classes.buttonRoot}`

    return (
        title ? (
            <Box className={classes.button}>
                <KvikButtonUI
                    onClick={onClick}
                    fullWidth={true}
                    customRoot={bottomRoot}
                >
                    <Box className={classes.buttonContainer}>
                        {Icon && (
                            <Box className={classes.buttonIcon}>
                                <Icon/>
                            </Box>
                        )}
                        {title}
                    </Box>
                </KvikButtonUI>
            </Box>
        ) : <></>
    );
};

export default React.memo(ProductConnectionButton);
