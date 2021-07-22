import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
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
import axios from 'axios';
import {useRouter} from 'next/router';
import { useAuth } from '../lib/Context/AuthCTX';

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
    }
}));

function PlaceOffer() {
    const {id} = useAuth();
    const classes = useStyles();
    const { matchesMobile, matchesTablet } = useMedia();
    const methods = useForm();
	const router = useRouter();
    let photoes = [];
    const photoesCtx = (obj) => {
        return photoes = obj;
    }

    const onSubmit = data => {
        console.log(photoes, photoes.length)
        data.price = data.price.replace(/\D+/g, '');
		const alias = data?.alias4 || data?.alias3 || data?.alias2;
        const sendData = new FormData;
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
		router.push('/');
    }

    return (
        <MetaLayout title={'Подать объявление'}>
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
        </MetaLayout>
    )
}

export default PlaceOffer;