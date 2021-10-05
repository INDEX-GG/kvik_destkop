import React from 'react'
import {Button, Box, CardActions, CardContent, Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    logout_wrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '350px',
        height: '250px',
        padding: '8px 12px',
    },
    logout__block__title: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: '18px',
        color: '#2c2c2c',
        marginBottom: '32px',
    },
    modal__block_btn: {
        width: '100%',
        display: 'flex',
        justifyContent: 'spaceBetween',
    },
    btn_blue__accountLogoutButtonYes: {
        color: '#00A0ABFF',
        fontSize: '18px',
    },
    btn_red__accountLogoutButtonYes: {
        color: '#F44545FF',
        fontSize: '18px',
    }
}))

const LogoutModal = () => {
    const classes = useStyles();

    return (
        <Box className={classes.logout_wrapper}>
                <CardContent className={classes.logout__block__title}>
                    <Typography className={classes.logout__block__title}>Вы уверены что хотите выйти?</Typography>
                </CardContent>
            <Box className={classes.modal__block_btn}>
            <CardActions>
                <Button className={classes.btn_blue__accountLogoutButtonYes} href="">ОТМЕНА</Button>
                <Button   className={classes.btn_red__accountLogoutButtonYes} href="">ВЫЙТИ</Button>
            </CardActions>
            </Box>
        </Box>
    );
}
export default LogoutModal