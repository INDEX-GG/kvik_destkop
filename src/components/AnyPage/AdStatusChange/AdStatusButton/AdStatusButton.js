import React from "react";
import {useAdStatusButtonStyles} from './style';
import ProductConnectionButton
    from "../../ProductConnectionButtons/ProductConnectionButton";

const AdStatusButton = ({title, onClick, active, productId, callbackSuccess, successStatus}) => {
    const classes = useAdStatusButtonStyles()

    return (
        <ProductConnectionButton
            customButton={classes.button}
            title={title}
            isMyAd={true}
            onClick={onClick(active, productId, callbackSuccess, successStatus)}
        />
    )
}

export default React.memo(AdStatusButton);
