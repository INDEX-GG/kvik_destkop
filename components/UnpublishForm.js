import React, { useContext, useState, useEffect } from 'react'
import { Typography, Button, Container, Dialog, Box, CardMedia, makeStyles } from "@material-ui/core";
import { UnpublishCTX } from '../lib/Context/DialogCTX';
import { ToRubles, ToFullDate } from "../lib/services";

const useStyles = makeStyles((theme) => ({
    unpublish_form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 24px',
        color: theme.palette.grey[100],
    },
    unpublish_form__item: {
        width: '100px',
        height: '126px',
        padding: '3px',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '1px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    unpublish_form__item__img: {
        width: '100%',
        height: '88px',
    },
    unpublish_form__item__price: {
        fontSize: '12px',
        fontWeight: '500',
    },
    unpublish_form__item__title: {
        fontSize: '12px',
        fontWeight: '500',
    },
    unpublish_form__desc: {
        fontSize: '18px',
        fontWeight: '500',
        color: theme.palette.grey[100],
        marginBottom: '24px',

    },
    unpublish_form__sub_desc: {
        fontSize: '14px',
        fontWeight: '500',
        color: theme.palette.grey[500],
        marginBottom: '16px',
    },
    unpublish_form__btn: {
        width: '100%',
        height: '32px',
        background: theme.palette.grey[300],
        padding: '8px',
        color: theme.palette.grey[100],
        borderRadius: '8px',
        marginBottom: '24px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 250ms ease-in-out;',

        '&>*:last-child': {
            marginBottom: 0,
        },

        '&:hover': {
            border: '1px solid' + theme.palette.grey[500],
            background: theme.palette.grey[300],
            transition: 'all 150ms ease-in-out;',
        },
    }
}));


export default function UnpublishForm() {
    const classes = useStyles();
    const { offerId, data } = useContext(UnpublishCTX);


    function PushBDVerify(e) {
        var arr = { 'id': [offerId], 'verify': `${e.target.parentElement.id}` }
        console.log(arr)
    }


    
    if (offerId.length === 1) {
        const offerAction = data.offers.filter((item) => item.id === +offerId.join())
        return (
            <>
                {offerAction.map((item, i) =>
                    <Box key={i} className={classes.unpublish_form}>
                        <Box className={classes.unpublish_form__item}>
                            {JSON.parse(item.photo)?.photos?.slice(0, 1).map((imgs, i) => {
                                return <CardMedia className={classes.unpublish_form__item__img} key={i} image={imgs} />
                            })}
                            <Typography className={classes.unpublish_form__item__price}>{ToRubles(item.price)}</Typography>
                            <Typography className={classes.unpublish_form__item__title}>{item.title}</Typography>
                        </Box>
                        <Typography className={classes.unpublish_form__desc}>Снять с публикации</Typography>
                        <Typography className={classes.unpublish_form__sub_desc}>Выберете причину</Typography>
                        <Button id='001' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>Продано на Kvik</Button>
                        <Button id='002' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>Продано в другом месте</Button>
                        <Button id='003' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>Другая причина</Button>
                    </Box>
                )}
            </>
        )
    } else {
        return (
            <>
                <Box className={classes.unpublish_form}>
                    <Typography className={classes.unpublish_form__desc}>Снять с публикации</Typography>
                    <Typography className={classes.unpublish_form__sub_desc}>Выберете причину</Typography>
                    <Button id='001' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>Продано на Kvik</Button>
                    <Button id='002' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>Продано в другом месте</Button>
                    <Button id='003' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>Другая причина</Button>
                </Box>
            </>
        )
    }
}