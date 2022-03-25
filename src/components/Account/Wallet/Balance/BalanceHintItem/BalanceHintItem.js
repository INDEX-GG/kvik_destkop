import React, { useState } from 'react';
import {Box, Collapse} from "@material-ui/core";
import {useBalanceHintItemStyles} from "./style";
import {useMedia} from "../../../../../../hooks/useMedia";

const BalanceHintItem = ({hint}) => {

    const classes = useBalanceHintItemStyles();
    const {matchesMobile, matchesTablet} = useMedia();
    const [open, setOpne] = useState(false);
    const {title, subtitle} = hint;


    return (
        <Box className={classes.hintItem}>
            <Box className={classes.hintContainer}>
                <Box className={classes.title}  onClick={() => setOpne(!open)}>
                    {title}
                </Box>
                {matchesMobile || matchesTablet
                ? <Collapse in={open} className={classes.subtitle}>
                    {subtitle}
                  </Collapse>
                : <Box className={classes.subtitle}>
                    {subtitle}
                  </Box>
                }
                
            </Box>
        </Box>
    );
};

export default BalanceHintItem;
