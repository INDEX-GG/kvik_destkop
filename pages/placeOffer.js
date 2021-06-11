import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Verify from '../components/placeOffer/Verify';
import MainLayout from '../layout/MainLayout';
import {useMedia} from '../hooks/useMedia';

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
    offersBox: {
        width: '712px',
    },
 
}));

function PlaceOffer() {

    const classes = useStyles();
    const { matchesMobile, matchesTablet} = useMedia();

    return (
            <MainLayout title={'Подать объявление'}>
                {!matchesMobile && !matchesTablet && <Container className={classes.root}>
                    <Verify Verify={4} />
                    <Box className={classes.offersBox}>
                        <Typography variant='h2'>Новое объявление</Typography>
                        <form>Форма</form>
                    </Box>
                </Container>}
            </MainLayout>
    )
}

export default PlaceOffer;
