import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import KvikButton from "../../UI/UIcomponent/KvikButton";

const PayPromotionResult = ({handleCloseModal, title, icon}) => {
    const classes = useStyles()
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

const useStyles = makeStyles(() => ({
    container: {
        padding: '15px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        width: '130px',
        height: '130px',
        marginBottom: '20px'
    },
    title: {
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '19px',
        color: '#2C2C2C',
        marginBottom: '33px' ,
    }
}));

export default PayPromotionResult;
