import React from 'react';
import {Box} from "@material-ui/core";
import {useBalanceHintItemStyles} from "./style";

const BalanceHintItem = ({hint}) => {

    const classes = useBalanceHintItemStyles();
    const {title, subtitle} = hint;


    return (
        <Box className={classes.hintItem}>
            <Box className={classes.hintContainer}>
                <Box className={classes.title}>
                    {title}
                </Box>
                <Box className={classes.subtitle}>
                    {subtitle}
                </Box>
            </Box>
        </Box>
    );
};

export default BalanceHintItem;
