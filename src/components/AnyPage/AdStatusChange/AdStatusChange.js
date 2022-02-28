import React from "react";
import {Box} from "@material-ui/core";
import {useAdStatusChangeStyles} from './style';
import {useAdStatusChange} from "./useAdStatusChange";
import AdStatusButton from "./AdStatusButton/AdStatusButton";

const AdStatusChange = ({
    onClose,
    productId,
    statusData = 'active',
    callbackSuccess = () => null
}) => {

    const classes = useAdStatusChangeStyles()
    const {viewContent, isButtons} = useAdStatusChange(statusData, onClose)


    return (
        <Box className={classes.container}>
            <Box className={classes.title}>
                {viewContent.title}
            </Box>
            <Box className={classes.confirm}>
                {viewContent.subtitle}
            </Box>
            {isButtons && (
                <Box className={classes.buttons}>
                    {
                        viewContent.buttons.map(button => (
                            <AdStatusButton
                                key={button.title}
                                title={button.title}
                                onClick={button.onClick}
                                active={button.active}
                                successStatus={viewContent.successStatus}
                                callbackSuccess={callbackSuccess}
                                productId={productId}
                            />
                        ))
                    }
                </Box>
            )}
        </Box>
    )
}

export default React.memo(AdStatusChange);
