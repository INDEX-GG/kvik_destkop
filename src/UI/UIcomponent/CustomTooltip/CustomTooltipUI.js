import React from 'react';
import {Tooltip} from "@material-ui/core";
import {useCustomTooltipUIStyles} from "./style";

const CustomTooltipUI = ({children, title = '', arrow = true}) => {

    const classes = useCustomTooltipUIStyles();

    return (
        <Tooltip
            title={title}
            arrow={arrow}
            classes={{tooltip: classes.tooltip, arrow: classes.arrow}}
        >
            {children}
        </Tooltip>
    );
};

export default CustomTooltipUI;
