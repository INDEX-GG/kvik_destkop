import React from "react";
import {Button} from "@material-ui/core";
import {useCustomButtonUIStyles} from './style';

const CustomButtonUI = (
    {
        children,
        color='default',
        type = 'button',
        onClick = () => null,
        customRoot = null,
        customCircle = null,
    }
) => {

    const classes = useCustomButtonUIStyles()
    const classesButton = customRoot ? `${customRoot} ${classes.button}` : classes.button;
    const classesCircle = customCircle ? `${customCircle} ${classes.circle}` : classes.circle;
    const classesRoot = type === 'circle' ? `${classesButton} ${classesCircle}` : classesButton;

    return (
        <Button
            color={color}
            onClick={onClick}
            classes={{
                root: `${classes.default} ${classesRoot}`
            }}
        >
            {children}
        </Button>
    )
}

export default React.memo(CustomButtonUI);
