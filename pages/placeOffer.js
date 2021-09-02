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
import axios from 'axios';
import { BASE_URL, STATIC_URL } from '../lib/constants';

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

function PlaceOffer() {
    const { id } = useAuth();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [promotion, setPromotion] = useState(false);
    const [product, setProduct] = useState({});
    const { matchesMobile, matchesTablet } = useMedia();
    const methods = useForm();
    let photoes = [];
	let postId = 0;
    const photoesCtx = (obj) => {
        return photoes = obj;
    }
console.log(methods)
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

		console.log(alias);
        data.alias = alias.join(',');
        data.user_id = id
        delete data.alias1
        delete data.alias2
        delete data.alias3
        delete data.alias4
        delete data.photoes
        const photoData = new FormData;
        console.log(photoes)
        if (photoes.length > 1) {
            photoes.forEach(photo => photoData.append('files[]', photo));
        } else if (photoes.length === 1) {
            photoData.append('files[]', photoes[0]);
        }
        console.log(data, alias)
        setLoading(true);

        axios.post(`${BASE_URL}/api/setPosts`, data)
            .then(r => {
			postId = r?.data?.id;
            axios.post(`${STATIC_URL}/post/${r?.data?.id}`, photoData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((r) => {
                console.log(r)
                setProduct({ title: data.title, price: data.price, id: postId, photo: `${STATIC_URL}/${r?.data.images.photos[0]}` })
                console.log(product)
				console.log(r?.data.images.photos[0])
                setPromotion(true)
            })
        })
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