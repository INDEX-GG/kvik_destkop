import React from 'react';

import { BalanceHeader } from './BalanceHintItem/BalanceHeader/BalanceHeader';
import balanceHintsData from './BalanceHintsData.json';
import BalanceHintItem from './BalanceHintItem/BalanceHintItem';

import { Button } from '@mui/material';
import { Box } from '@material-ui/core';
import { useBalanceStyles } from './style';

const Balance = () => {
    const classes = useBalanceStyles();
    
    return (<>
        <Box className={classes.container}>
            <BalanceHeader />
            <Box className={classes.containerMore}>
                <Button variant="text"  classes={{root: classes.more}}>Подробнее</Button>
            </Box>
                <Box className={classes.hints}>
                    {balanceHintsData.map(hint => (
                        <BalanceHintItem
                            key={hint.title}
                            hint={hint}
                        />
                    ))}
                </Box>
        </Box>        
</>)
}
export default React.memo(Balance);
