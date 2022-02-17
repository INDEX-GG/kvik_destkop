import React from 'react';
import {Box, Button} from "@material-ui/core";
import {useBalanceStyles} from "./style";
import KvikPayIcon from "../../../../UI/UIicon/KvikPayIcon";
import KvikButtonUI from "../../../../UI/UIcomponent/KvikButtonUI";
import balanceHintsData from './BalanceHintsData.json';
import BalanceHintItem from "./BalanceHintItem/BalanceHintItem";

const Balance = () => {
    const classes = useBalanceStyles();

    return (
        <Box className={classes.container}>
            <Box className={classes.info}>
                <Box className={classes.balance}>
                    100 ₽ / 150&nbsp;
                    <Box className={classes.icon}>
                        <KvikPayIcon/>
                    </Box>
                </Box>
                <Box className={classes.button}>
                    <KvikButtonUI>
                        <Box className={classes.balanceAdd}/>
                        Пополнить баланс
                    </KvikButtonUI>
                </Box>
                <Button classes={{root: classes.more}}>
                    Подробнее
                </Button>
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
    );
};

export default React.memo(Balance);
