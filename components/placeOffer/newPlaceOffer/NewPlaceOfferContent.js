import React, {useEffect, useState} from 'react';
import {Box, Button, Container, makeStyles, Typography} from "@material-ui/core";
import {FormProvider, useForm} from "react-hook-form";
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
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    offersBox: {
        width: '712px',
    },
    formPart: {
        padding: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        marginBottom: theme.spacing(4),
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

const NewPlaceOfferContent = ({functionObj}) => {

    const classes = useStyles();

    const methods = useForm({defaultValues: { price: ''} });
    const {mainCategory, getMoreCategory} = useCategoryV2();

    const [category, setCategory] = useState();

    const {onSubmit, photoesCtx} = functionObj

    /* получение дополнительных полей */
    const aliasObj = {
        aliasOne: methods.watch('alias1'),
        aliasTwo: methods.watch('alias2'),
        aliasThree: methods.watch('alias3'),
    }

    // текущий объект категории
    const currentCategory = getMoreCategory(aliasObj.aliasOne, aliasObj.aliasTwo, aliasObj.aliasThree);
    const title = currentCategory?.title

    //! ИЗМЕНИТЬ ЛОГИКУ
    const { ...subcategoryData } = useCategoryPlaceOffer(category, methods);

    // Получаем выбранную категорию
    useEffect(() => {
        const getValue = methods.getValues
        const aliasValue = (aliasNum) => getValue('alias' + aliasNum);

        const alias2 = aliasValue(2)
        const alias3 = aliasValue(3)
        const alias4 = aliasValue(4)

        if (alias4) {
            setCategory(alias4.toLowerCase())
        } else if (alias3) {
            setCategory(alias3.toLowerCase())
        } else if (alias2) {
            setCategory(alias2.toLowerCase())
        } else {
            setCategory(undefined)
        }

    }, [methods?.watch('alias4'), methods?.watch('alias3'), methods?.watch('alias2')]);



    return (
        <Container className={classes.root}>
            <Box className={classes.offersBox}>
                <Typography className={classes.title} variant='h3'>Новое объявление</Typography>
                <FormProvider {...methods} >
                    <Verify showTitle={title}/>
                    <form onSubmit={methods.handleSubmit((data => onSubmit(data, methods, category, currentCategory)))}>
                        <Box className={classes.formPart}>
                            <Category category={mainCategory}/>
                            {title ? null : <Title title='' />}
                        </Box>
                        {/* Проверка на доп. поле*/}
                        {!!currentCategory?.additional_fields.length && (
                            <Box className={classes.formPart}>
                                <AdditionalInformation currentCategory={currentCategory} />
                            </Box>
                        )}
                        <Box className={classes.formPart}>
                            <Description />
                            {category !== 'vacancies' && category !== 'summary' ?
                                <Price price=''/>
                                :
                                null
                            }
                            <Photoes ctx={photoesCtx} />
                        </Box>
                        <Box className={classes.formPart}>
                            <Location />
                            <Contacts />
                            <Box className={classes.submit}>
                                <ErrorMessages validate={subcategoryData[category]} type={category}/>
                                <Button type='submit' color='primary' variant='contained'>Продолжить</Button>
                            </Box>
                        </Box>
                    </form>
                </FormProvider>
            </Box>
        </Container>
    );
};

export default NewPlaceOfferContent;