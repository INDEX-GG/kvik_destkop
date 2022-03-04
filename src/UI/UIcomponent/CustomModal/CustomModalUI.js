import React from 'react';
import {Box, Dialog, useMediaQuery} from "@material-ui/core";
import {useCustomModalUIStyles} from "./style";

const CustomModalUI = (
    {
        open,
        title,
        subtitle,
        handleCloseModal,
        customMobile = 768,
        dopElement = null,
        customHeader = null,
        maxWidth = 'sm',
        customStyle = {},
        children,
    }
) => {

    const classes = useCustomModalUIStyles();
    const isMobile = useMediaQuery(`(max-width: ${customMobile}px)`);
    const DopElement = dopElement;
    const CustomHeader = customHeader;

    return (
        <Dialog
            open={open}
            maxWidth={maxWidth}
            onClose={handleCloseModal}
            fullScreen={isMobile}
            classes={{paper: classes.modalPaper, container: classes.modalClassesContainer, ...customStyle}}
        >
            {isMobile && (
                CustomHeader ? <CustomHeader/> :  (
                    <Box className={classes.modalHeader}>
                        {handleCloseModal && (
                            <Box onClick={handleCloseModal} className={classes.modalHeaderIcon}>
                                <Box className={classes.modalHeaderArrow}/>
                            </Box>
                        )}
                        <Box>
                            {title && (
                                <Box className={classes.modalHeaderTitle}>
                                    {title}
                                </Box>
                            )}
                            {subtitle && (
                                <Box className={classes.modalHeaderSubtitle}>
                                    {subtitle}
                                </Box>
                            )}
                        </Box>
                        {dopElement && (
                            <Box className={classes.modalHeaderOptionalElement}>
                                <DopElement/>
                            </Box>
                        )}
                    </Box>
                )
            )}
            <Box className={classes.modalContainer}>
                <Box className={classes.closeIcon} onClick={handleCloseModal}/>
                {children}
            </Box>
        </Dialog>
    );
};

export default React.memo(CustomModalUI);
