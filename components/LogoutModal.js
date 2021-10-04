import * as React from 'react';
import {Button, Box, CardActions, CardContent, Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    logout_wrapper: {
        height: "100%",
        display: "flex",
        alignItems: "center",
    },
    logout__block__title: {
        textAlign: 'center',
        fontWeight: "500",
        fontSize: "18px",
        color: "$tp",
        margin: "0",
        marginBottom: "32px",
    },
    modal__block_btn: {
        width: '100%',
        display: 'flex',
        justifyContent: 'spaceBetween',
        padding: '0 20px',
        fontWeight: '500',
        fontSize: '18px',
    },
    btn_blue__accountLogoutButtonYes: {
        color: '$prime',
    },
    btn_red__accountLogoutButtonYes: {
        color: '$primered',
    }
}))

export default function LogoutModal(){
    const classes = useStyles();

    return (
        <Box className={classes.logout_wrapper}>
                <CardContent className={classes.logout__block__title}>
                    <Typography variant="h6" >
                        Вы уверены
                    </Typography>
                    <Typography variant="h6" >
                        что хотите
                    </Typography>
                    <Typography variant="h6" >
                        выйти?
                    </Typography>
                </CardContent>
            <Box className={classes.modal__block_btn}>
            <CardActions>
                <Button className={classes.btn_blue__accountLogoutButtonYes}>ОТМЕНА</Button>
            </CardActions>
            <CardActions>
                <Button   className={classes.btn_red__accountLogoutButtonYes}>ВЫЙТИ</Button>
            </CardActions>
            </Box>
        </Box>
    );
}
