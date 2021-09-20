import { Box, makeStyles, CardMedia, Typography, TextField, Button } from '@material-ui/core';
import StarRating from './StarRating';
import React from 'react'
import { ToRubles } from '../lib/services';

const useStyles = makeStyles({
    feedModal__wrapper: {
        
    },
    feedModal__modal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px",
        background: "#E5E5E5",
    },
    feedModal__offer_wrapper: {
        background: "white",
        padding: "3px",
        width: "94px",
        height: "126px",
        
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
    feedModal__textArea: {
        minWidth: "280px",
        "& div": {
            height: "128px !important",
            alignItems: "flex-start",
            padding: "16px 0 0 16px",
            fontSize: "12px",
        },
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
    },
})  


function FeedbackModal({offer}) {
    const classes = useStyles();
    const [disable, setDisable] = React.useState(false)
    console.log("disable===========?>", disable)
    console.log("dataCard===========?>", offer)
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
                    <StarRating rating={0}/>
                </Box>
                <TextField 
                    variant='outlined'
                    className={classes.feedModal__textArea}
                    multiline
                    placeholder="Поделитесь своими впечатлениями, что вам понравилось, а что нет"
                    onChange={ (event) => event.target.value.length > 0 ? setDisable(true) : setDisable(false)}
                />
                {/* <Typography>До 4000? символов</Typography> */}
                <Button className={classes.feedModal__button} style={disable ? {background: "#00a0ab"} : null}>Оставить отзыв</Button>
            </Box>
        </Box>
    )
}

export default FeedbackModal;
