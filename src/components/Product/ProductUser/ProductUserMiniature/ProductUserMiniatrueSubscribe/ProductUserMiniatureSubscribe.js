import React from "react";
import {Box} from "@mui/material";
import clsx from 'clsx'

import {useProductUserMiniatureSubscribeStyles} from './style';
import SubscriptionUserFalseIcon from "../../../../../UI/UIicon/SubscriptionUserFalseIcon";
import SubscriptionUserTrueIcon from "../../../../../UI/UIicon/SubscriptionUserTrueIcon";
import {useProductUserMiniatureSubscribe} from "./useProductUserMiniatureSubscribe";
import CustomTooltipUI from "../../../../../UI/UIcomponent/CustomTooltip/CustomTooltipUI";

const ProductUserMiniatureSubscribe = ({userId, isMobile}) => {
    const classes = useProductUserMiniatureSubscribeStyles()
    const {
        handleChangeSubscribe,
        isSubscribe,
        tooltipTitle
    } = useProductUserMiniatureSubscribe(userId);

    return (
        <CustomTooltipUI
            title={tooltipTitle}
            arrow={true}
        >
            <Box className={classes.subscribeBlock}>
                {isMobile && (
                    <Box className={clsx(
                        classes.subscribeTitle, {
                            [classes.subscribed]: isSubscribe,
                            [classes.noSubscribed]: !isSubscribe,
                        }
                    )}
                    >
                        {isSubscribe ? 'Вы подписаны' : 'Подписаться'}
                    </Box>
                )}
                <Box
                    className={classes.icon}
                    onClick={handleChangeSubscribe}
                >
                    {isSubscribe && <SubscriptionUserTrueIcon/>}
                    {!isSubscribe && <SubscriptionUserFalseIcon/>}
                </Box>
            </Box>
        </CustomTooltipUI>
    )
}

export default React.memo(ProductUserMiniatureSubscribe);
