import { Box, Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import Verify from '../components/placeOffer/Verify';
import MainLayout from '../layout/MainLayout';
import { useMedia } from '../hooks/useMedia';
import { useForm, FormProvider } from 'react-hook-form';
import Title from '../components/placeOffer/Title';


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
}));

function PlaceOffer() {

    const classes = useStyles();
    const { matchesMobile, matchesTablet } = useMedia();
    const methods = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <MainLayout title={'Подать объявление'}>
            {!matchesMobile && !matchesTablet && <Container className={classes.root}>
                <Verify Verify={1} />
                <Box className={classes.offersBox}>
                    <Typography className={classes.title} variant='h2'>Новое объявление</Typography>
                    <FormProvider {...methods} >
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Box className={classes.formPart}>
                                <Title />
                            </Box>
                            <Box className={classes.formPart}>
                                <Button type='submit' color='primary' variant='contained'>Продолжить</Button>
                            </Box>
                        </form>
                    </FormProvider>
                </Box>
            </Container>}
        </MainLayout>
    )
}

export default PlaceOffer;
