import { Box, Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import Verify from '../components/placeOffer/Verify';
import MainLayout from '../layout/MainLayout';
import { useMedia } from '../hooks/useMedia';
import { useForm, Controller } from 'react-hook-form';
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
    formElem: {
        display: 'flex',
        flexDirection: 'row',
    },
    formTitleField: {
        flexGrow: 1,
        padding: '4px 0',
    },
    formInputField: {
        width: '490px',
    },
    input: {
        '& input': {
            padding: '8px 16px',
        }
    }
}));

function PlaceOffer() {

    const classes = useStyles();
    const { matchesMobile, matchesTablet } = useMedia();
    const { handleSubmit, control, watch } = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <MainLayout title={'Подать объявление'}>
            {!matchesMobile && !matchesTablet && <Container className={classes.root}>
                <Verify Verify={1} />
                <Box className={classes.offersBox}>
                    <Typography className={classes.title} variant='h2'>Новое объявление</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box className={classes.formPart}>
                            {/* <Box className={classes.formElem}>
                                <Typography className={classes.formTitleField}>Название</Typography>
                                <Box className={classes.formInputField}>
                                    <Controller
                                        name="title"
                                        control={control}
                                        defaultValue=''
                                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <TextField
                                                className={classes.input}
                                                variant='outlined'
                                                type="text"
                                                fullWidth
                                                autoComplete="on"
                                                value={value}
                                                onChange={onChange}
                                                error={!!error} helperText={error ? error.message : ' '} />
                                        )}
                                        rules={{ required: 'Введите название товара' }}
                                    />
                                </Box>
                            </Box> */}
                            <Title />
                        </Box>
                        <Box className={classes.formPart}>
                            <Button type='submit' color='primary' variant='contained'>Продолжить</Button>
                        </Box>
                    </form>
                </Box>
            </Container>}
        </MainLayout>
    )
}

export default PlaceOffer;
