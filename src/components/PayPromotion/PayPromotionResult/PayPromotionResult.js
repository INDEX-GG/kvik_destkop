import React from 'react';
import {Box} from "@material-ui/core";
import KvikButton from "../../../UI/UIcomponent/KvikButtonUI";
import {usePayPromotionResultStyles} from "./styles";

const PayPromotionResult = ({handleCloseModal, title, icon}) => {
    const classes = usePayPromotionResultStyles()
    const Icon = icon
    return (
        <Box className={classes.container}>
            <Box className={classes.icon}>
                <Icon/>
            </Box>
            <Box className={classes.title} component='h6'>{title}</Box>
            <KvikButton onClick={handleCloseModal}>
                Понятно
            </KvikButton>
        </Box>
    );
};

export default PayPromotionResult;
