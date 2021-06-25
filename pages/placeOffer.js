import { Box, Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import Verify from '../components/placeOffer/Verify';
import MainLayout from '../layout/MainLayout';
import { useMedia } from '../hooks/useMedia';
import { useForm, FormProvider } from 'react-hook-form';
import Title from '../components/placeOffer/Title';
import Category from '../components/placeOffer/Category';
import Description from '../components/placeOffer/Description';
import Price from '../components/placeOffer/Price/Price';
import Photoes from '../components/placeOffer/Photoes';
import Location from '../components/placeOffer/Location';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        [theme.breakpoints.down('md')]: {
            alignItems: 'flex-end',
        },
    },
    fg: {
        flexGrow: 1,
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
    }
}));

function PlaceOffer() {
    const classes = useStyles();
    const { matchesMobile, matchesTablet } = useMedia();
    const methods = useForm();
    let photoes = [];
    const photoesCtx = (obj) => {
        return photoes = obj;
    }

    const onSubmit = data => {
        console.log(photoes, photoes.length)
        data.price = data.price.replace(/\D+/g, '');
        let id = Math.max(
            data.category_1, 
            data.category_2, 
            data.category_3 !== undefined ? data.category_3 : 0, 
            data.category_4 !== undefined ? data.category_4 : 0);
        data = {...data, category_id: id}
        console.log(data);
        const sendData = new FormData;
        sendData.append('title', data.title);
        sendData.append('category_id', data.category_id);
        sendData.append('description', data.description);
        sendData.append('price', data.price);
        sendData.append('trade', data.trade);
        sendData.append('safedeal', data.safedeal);
        sendData.append('delivery', data.delivery);
        if (photoes.length > 1) {
            photoes.forEach(photo => sendData.append('image', photo));
        } else if (photoes.length === 1) {
            sendData.append('image', photoes[0]);
        }
        console.log(sendData);
        axios.post('/api/setPosts', sendData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    return (
        <MainLayout title={'Подать объявление'}>
            {!matchesMobile && !matchesTablet && <Container className={classes.root}>
                <Box className={classes.offersBox}>
                    <Typography className={classes.title} variant='h3'>Новое объявление</Typography>
                    <FormProvider {...methods} >
                    <Verify/>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Box className={classes.formPart}>
                                <Title />
                                <Category />
                            </Box>
                            <Box className={classes.formPart}>
                                <Description />
                                <Price />
                                <Photoes ctx={photoesCtx}/>
                            </Box>
                            <Box className={classes.formPart}>
                                <Location />
                            </Box>
                            <Box className={classes.formPart}>
                                <Box className={classes.submit}>
                                    <Typography variant='subtitle2' className={classes.fg}>Заполните все обязательные поля</Typography>
                                    <Button type='submit' color='primary' variant='contained'>Продолжить</Button>
                                </Box>
                            </Box>
                        </form>
                    </FormProvider>
                </Box>
            </Container>}
        </MainLayout>
    )
}

export default PlaceOffer;