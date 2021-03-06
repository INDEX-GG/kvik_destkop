import React from 'react';
import {Box} from "@material-ui/core";
import KvikButtonUI from "../../../UI/UIcomponent/KvikButtonUI";
import {useProductConnectionButtonStyles} from "./style";

const ProductConnectionButton = ({title, icon, isMyAd = false, onClick, customButton = ''}) => {

    const classes = useProductConnectionButtonStyles();
    const Icon = icon;
    const bottomRoot = isMyAd ? `${classes.myButtonRoot}` : `${classes.buttonRoot}`
    const classButton = `${classes.button} ${customButton}`

    return (
        title ? (
            <Box className={classButton}>
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
