import React from "react";
// import {useProductUserMiniatureSubscribeStyles} from './style';
import SubscriptionUserFalseIcon from "../../../../../UI/UIicon/SubscriptionUserFalseIcon";
import SubscriptionUserTrueIcon from "../../../../../UI/UIicon/SubscriptionUserTrueIcon";

const ProductUserMiniatureSubscribe = () => {
    // const classes = useProductUserMiniatureSubscribeStyles()
    const subscribe = false

    return (
        subscribe ? (
            <SubscriptionUserTrueIcon/>
        ) : (
            <SubscriptionUserFalseIcon/>
        )

    )
}

export default React.memo(ProductUserMiniatureSubscribe);
