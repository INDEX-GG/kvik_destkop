import { Box, makeStyles, CardMedia, Typography, TextField, Button } from '@material-ui/core';
import StarRating/* , {ActiveStarRating} */ from './StarRating';
import React from 'react'
import { ToRubles } from '../lib/services';

const useStyles = makeStyles((theme) => ({
    feedModal__wrapper: {
    },
    feedModal__modal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px",
        background: "white",
        [theme.breakpoints.down(370)]: {
            padding: "10px",
        },
    },
    feedModal__offer_wrapper: {
        background: "white",
        padding: "3px",
        width: "94px",
        height: "126px",
        borderRadius: "1px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    },
    feedModal__offer_pict: {
        height: "88px",
        width: "88px",
        borderRadius: "1px",
    },
    feedModal__offer_price: {
        fontSize: "12px",
        fontWeight: "500",
        textAlign: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        height: "17px",
        whiteSpace: "nowrap",
    },
    feedModal__designation: {
        fontSize: "18px",
        fontWeight: "500",
        margin: "16px 0 24px 0",
    },
    feedModal__rating: {
        display: "flex",
        padding: "0 0 16px 0",
        alignItems: "center",
    },
    feedModal__stars: {
        width: "400px !important"
    },
    feedModal__textArea: {
        minWidth: "280px",
        "& div": {
            height: "128px !important",
            alignItems: "flex-start",
            padding: "5px 10px",
            fontSize: "12px",
        },
        "& div>textarea:first-child": {
            height: "125px !important",
            overflow: "scroll !important",
        },
        [theme.breakpoints.down(370)]: {
            minWidth: "230px",
        },
    },
    feedModal__symbolNumber: {
        alignSelf: "start",
        color: "#C7C7C7",
        fontSize: "12px",
    },
    feedModal__button: {
        height: "32px",
        width: "147px",
        background: "#A1DCE0",
        borderRadius: "8px",
        color: "#FFFFFF",
        margin: "24px 0 0 0",
        "&hover": {
        },
        [theme.breakpoints.down(370)]: {
            margin: "10px 0 0 0"
        },
    },
    MuiTextFieldRoot: {

    },
}));  


function FeedbackModal({offer}) {
    const classes = useStyles();
    const [disable, setDisable] = React.useState(false)
    const [length, setLength] = React.useState(4000)
    
    console.log("render")
    return (
        <Box className={classes.feedModal__wrapper}>
            <Box className={classes.feedModal__modal}>
                <Box className={classes.feedModal__offer_wrapper}>
                    <CardMedia className={classes.feedModal__offer_pict} image={offer.img}/>
                    <Typography className={classes.feedModal__offer_price}>{ToRubles(offer.price)}</Typography>
                    <Typography className={classes.feedModal__offer_price}>{offer.title}</Typography>
                </Box>
                <Typography className={classes.feedModal__designation}>Оценка и отзыв</Typography>
                <Box className={classes.feedModal__rating}>
                    <Box component="span">0.0</Box>
                    {/* <ActiveStarRating/> */}
                    <StarRating rating={0} className={classes.feedModal__stars}/>
                </Box>
                <TextField 
                    variant='outlined'
                    className={classes.feedModal__textArea}
                    multiline
                    placeholder="Поделитесь своими впечатлениями, что вам понравилось, а что нет"
                    onChange={ (event) => {event.target.value.length > 0 ? setDisable(true) : setDisable(false);
                        setLength(4000 - event.target.value.length)
                    }}
                />
                <Typography className={classes.feedModal__symbolNumber}>{length == 4000 ? "До 4000 символов" : `Осталось ${length}`}</Typography>
                <Button className={classes.feedModal__button} style={disable ? {background: "#00a0ab"} : null}>Оставить отзыв</Button>
            </Box>
        </Box>
    )
}

export default FeedbackModal;
