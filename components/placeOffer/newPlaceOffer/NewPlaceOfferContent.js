import React from 'react';
import {Box, Button, Container, makeStyles, Typography, useMediaQuery} from "@material-ui/core";
import {useFormContext} from "react-hook-form";
import Verify from "#components/placeOffer/Verify";
import Category from "#components/placeOffer/Category";
import Title from "#components/placeOffer/Title";
import AdditionalInformation from "#components/placeOffer/AdditionalInformation";
import Description from "#components/placeOffer/Description";
import Price from "#components/placeOffer/Price/Price";
import Photoes from "#components/placeOffer/Photoes";
import Location from "#components/placeOffer/Location";
import Contacts from "#components/placeOffer/Contacts";
import ErrorMessages from "#components/placeOffer/ErrorMessages";
import useCategoryV2 from "#hooks/useCategoryV2";
import {useCategoryPlaceOffer} from "#hooks/useCategoryPlaceOffer";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        marginTop: '25px',
        [theme.breakpoints.down('md')]: {
            paddingLeft: '220px',
        },
        [theme.breakpoints.down(960)]: {
            marginTop: 0,
            padding: 0,
        },
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    offersBox: {
        width: '712px',
        [theme.breakpoints.down(960)]: {
            width: '100%'
        },
    },
    formPart: {
        padding: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        marginBottom: theme.spacing(4),
        [theme.breakpoints.down(960)]: {
            margin: '0 0 15px 0',
            padding: 0,
            background: '#fff'
        },
    },
    submit: {
        display: 'flex',
        alignItems: 'center'
    },
    backdrop: {
        zIndex: 2000,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
    },

}));

const NewPlaceOfferContent = ({photoesCtx, category, title, currentCategory}) => {

    const classes = useStyles();

    const methods = useFormContext();
    const {mainCategory} = useCategoryV2();


    const media960 = useMediaQuery('(max-width: 960px');


    //! ИЗМЕНИТЬ ЛОГИКУ
    const {...subcategoryData} = useCategoryPlaceOffer(category, methods);


    return (
        <Container className={classes.root}>
            <Box className={classes.offersBox}>
                {!media960 && <Typography className={classes.title} variant='h3'>Новое объявление</Typography>}
                {!media960 && <Verify showTitle={title}/>}
                <Box className={classes.formPart}>
                    {!media960 && mainCategory.length ? <Category category={mainCategory}/> : null}
                    {title ? null : <Title title=''/>}
                </Box>
                {/* Проверка на доп. поле*/}
                {!!currentCategory?.additional_fields.length && (
                    <Box className={classes.formPart}>
                        <AdditionalInformation currentCategory={currentCategory}/>
                    </Box>
                )}
                <Box className={classes.formPart}>
                    <Description media960={media960}/>
                    {category !== 'vacancies' && category !== 'summary' ?
                        <Price price=''/>
                        :
                        null
                    }
                    <Photoes ctx={photoesCtx}/>
                </Box>
                <Box className={classes.formPart}>
                    <Location/>
                    <Contacts/>
                    <Box className={classes.submit}>
                        <ErrorMessages validate={subcategoryData[category]} type={category}/>
                        <Button type='submit' color='primary' variant='contained'>Продолжить</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default NewPlaceOfferContent;