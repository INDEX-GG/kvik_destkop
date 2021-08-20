import { useState, useEffect } from 'react';
import { Backdrop, Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import Verify from '../components/placeOffer/Verify';
import MetaLayout from '../layout/MetaLayout';
import { useMedia } from '../hooks/useMedia';
import { useForm, FormProvider } from 'react-hook-form';
import Title from '../components/placeOffer/Title';
import Category from '../components/placeOffer/Category';
import Description from '../components/placeOffer/Description';
import Price from '../components/placeOffer/Price/Price';
import Photoes from '../components/placeOffer/Photoes';
import Location from '../components/placeOffer/Location';
import Contacts from '../components/placeOffer/Contacts';
import ErrorMessages from '../components/placeOffer/ErrorMessages';
import { useAuth } from '../lib/Context/AuthCTX';
import Loader from '../UI/icons/Loader';
import PlaceOfferMobile from '../components/placeOffer/placeOfferMobile';
import Promotion from '../components/placeOffer/Promotion';
import { useCategoryPlaceOffer } from '../hooks/useCategoryPlaceOffer';
import AdditionalInformation from '../components/placeOffer/AdditionalInformation';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
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

function PlaceOffer() {
    const { id } = useAuth();
    const classes = useStyles();
    const loading = false;
    const promotion = false;
    const product = {};
    const { matchesMobile, matchesTablet } = useMedia();
    const methods = useForm();
    let photoes = [];
    const photoesCtx = (obj) => {
        return photoes = obj;
    }

    /* получение дополнительных полей */
    const [asd, setAsd] = useState();
    const { ...newOBJ } = useCategoryPlaceOffer(asd);
    useEffect(() => {
        if (methods?.watch('alias4') && methods.control.fieldsRef.current.alias4?._f.value !== '') {
            setAsd(methods?.watch('alias4'));
        } else if (methods?.watch('alias3') && methods.control.fieldsRef.current.alias4?._f.name === undefined) {
            setAsd(methods?.watch('alias3'));
        } else if (methods?.watch('alias2') && methods.control.fieldsRef.current.alias3?._f.name === undefined) {
            setAsd(methods?.watch('alias2'));
        } else {
            setAsd(undefined);
        }
    }, [methods]);





    const onSubmit = data => {
        console.log(data)
        console.log(photoes, photoes.length)
        data.price = data.price.replace(/\D+/g, '');
        const alias = [data?.alias1, data?.alias2];
        if (data?.alias3) {
            alias.push(data.alias3);
        }
        if (data?.alias4) {
            alias.push(data.alias4);
        }


        const sendData = new FormData;
        const photoData = new FormData;
        sendData.append('user_id', id);
        sendData.append('title', data.title);
        sendData.append('alias', alias);
        sendData.append('description', data.description);
        sendData.append('price', data.price);
        sendData.append('trade', data.trade);
        sendData.append('safedeal', data.safedeal);
        sendData.append('delivery', data.delivery);
        sendData.append('address', data.location);
        sendData.append('byphone', data.byphone);
        sendData.append('bymessage', data.bymessages);
        console.log(photoes)
        console.log(photoes[0])
        if (photoes.length > 1) {
            photoes.forEach(photo => photoData.append('files[]', photo));
        } else if (photoes.length === 1) {
            photoData.append('files[]', photoes[0]);
        }
        console.log(data, alias)
        // setLoading(true);

        // axios.post('/api/setPosts', sendData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     }
        // }).then(r => {
        //     axios.post(`http://192.168.8.111:6001/post/${r?.data?.id}`, photoData, {
        //         headers: {
        //             "Content-Type": "multipart/form-data"
        //         }
        //     }).then(() => {
        //         console.log(r?.data?.id, photoData)
        //         setProduct({ title: data.title, price: data.price, id: r?.data?.id, photo: photoes[0].name })
        //         console.log(product)
        //         setPromotion(true)
        //     })
        // })
    }

    return (
        promotion ? <Promotion product={product} /> :
            <MetaLayout title={'Подать объявление'}>
                {!matchesMobile && !matchesTablet && <Container className={classes.root}>
                    <Box className={classes.offersBox}>
                        <Typography className={classes.title} variant='h3'>Новое объявление</Typography>
                        <FormProvider {...methods} >
                            <Verify />
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <Box className={classes.formPart}>
                                    <Title />
                                    <Category />
                                </Box>
                                {newOBJ[asd?.toLowerCase()] !== undefined ?
                                    <Box className={classes.formPart}>

                                        <AdditionalInformation newOBJ={newOBJ} asd={asd?.toLowerCase()} />

                                    </Box>
                                    : ''}
                                <Box className={classes.formPart}>
                                    <Description />
                                    <Price />
                                    <Photoes ctx={photoesCtx} />
                                </Box>

                                <Box className={classes.formPart}>
                                    <Location />
                                    <Contacts />
                                    <Box className={classes.submit}>
                                        <ErrorMessages />
                                        <Button type='submit' color='primary' variant='contained'>Продолжить</Button>
                                    </Box>
                                </Box>
                            </form>
                        </FormProvider>
                    </Box>
                </Container>}
                {matchesMobile || matchesTablet ? <PlaceOfferMobile /> : null}

                <Backdrop className={classes.backdrop} open={loading}>
                    <Loader size={64} />
                </Backdrop>
            </MetaLayout>
    )
}

export default PlaceOffer;