import React from "react";
import {Box} from "@mui/material";
import {useProductUserMiniatureSubscribeStyles} from './style';
import SubscriptionUserFalseIcon from "../../../../../UI/UIicon/SubscriptionUserFalseIcon";
import SubscriptionUserTrueIcon from "../../../../../UI/UIicon/SubscriptionUserTrueIcon";
import {useProductUserMiniatureSubscribe} from "./useProductUserMiniatureSubscribe";
import CustomTooltipUI from "../../../../../UI/UIcomponent/CustomTooltip/CustomTooltipUI";

const ProductUserMiniatureSubscribe = ({userId}) => {
    const classes = useProductUserMiniatureSubscribeStyles()
    const {
        handleChangeSubscribe,
        isSubscribe,
        tooltipTitle
    } = useProductUserMiniatureSubscribe(userId);

    return (
        <CustomTooltipUI
            title={tooltipTitle}
            arrow={true}>
            <Box
                className={classes.icon}
                onClick={handleChangeSubscribe}
            >
                {isSubscribe && <SubscriptionUserTrueIcon/>}
                {!isSubscribe && <SubscriptionUserFalseIcon/>}
            </Box>
        </CustomTooltipUI>
    )
}

export default React.memo(ProductUserMiniatureSubscribe);
