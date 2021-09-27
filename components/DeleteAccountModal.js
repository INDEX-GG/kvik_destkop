import React from 'react';
import {Box, Typography, makeStyles, Button} from "@material-ui/core"

const useStyles = makeStyles((theme) =>({
    deleteAccount__wrapper: {
        borderRadius: "8px",
        boxShadow: "0 0 25px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px",
        "& *":{
            fontWeight: "500",
            fontSize: "18px",
        },
        [theme.breakpoints.down('420')]: {
            padding: "14px",
            "& *":{
                fontSize: "14px",
            }
        },
    },
    deleteAccount__designation: {
        color: "#2C2C2C",
        textAlign: "center",
        margin: "0 8px"
    },
    deleteAccount__button_container: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        "& > *": {
            margin: "32px 0 0",
            padding: "5px",
            textTransform: "uppercase"
        },
        [theme.breakpoints.down('420')]: {
            "& > *": {
                margin: "16px 0 0",
            },
        },
    },
    deleteAccount__cancel: {
        color: "#00A0AB",
    },
    deleteAccount__delete: {
        color: "#F44545",
    }
}))

function DeleteAccountModal({setOpen}) {
    const classes = useStyles()

    return (
        <Box className={classes.deleteAccount__wrapper}>
            <Typography className={classes.deleteAccount__designation}>
                Вы хотите удалить аккаунт?<br/>
                Аккаунт будет удален навсегда
            </Typography>
            <Box className={classes.deleteAccount__button_container}>
                <Button className={classes.deleteAccount__cancel} onClick={() => setOpen(false)}>
                    отмена
                </Button>
                <Button className={classes.deleteAccount__delete}>
                    удалить
                </Button>
            </Box>
        </Box>
    )
}

export default DeleteAccountModal
