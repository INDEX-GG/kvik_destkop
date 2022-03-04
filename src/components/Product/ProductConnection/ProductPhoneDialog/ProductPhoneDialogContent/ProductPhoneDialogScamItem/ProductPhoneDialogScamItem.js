import React from "react";
import {Box} from "@material-ui/core";
import Active_icon from "#UI/icons/ActiveIcon";
import {useProductPhoneDialogScamItemStyles} from './style';

const ProductPhoneDialogScamItem = ({title}) => {

    const classes = useProductPhoneDialogScamItemStyles()
    return (
        <Box component='li' className={classes.warningItem}>
            <Active_icon Size={12} Color="#5A5A5A"/>
            &nbsp;{title}
        </Box>
    )
}

export default React.memo(ProductPhoneDialogScamItem);
