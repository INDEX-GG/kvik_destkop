import { useState, useEffect } from 'react';
import Router from 'next/router';
import { AppBar, Box, Button, Container, Dialog, IconButton, makeStyles, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import Logo from '../UI/icons/Logo';
import RegForm from './RegForm';
import Categories from './Categories'

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'space-between',
        alignItems: 'center',
        '&>*': {
            margin: '0 8px',
        }
    },
    header: {
        boxShadow: theme.shadows[0],
    },
    shadow: {
        boxShadow: theme.shadows[5],
    },
    logo: {
        borderRadius: theme.shape.borderRadius,
    },
    input: {
        flexGrow: 1,
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        right: '14px',
        height: '100%',
    },
    
}));

const Header = () => {
    const [openCat, setCategories] = useState();
    const [openRegForm, setOpenRegForm] = useState(false);
    const handleRegFormDialog = () => setOpenRegForm(!openRegForm);
    const classes = useStyles();

    const [headerScroll, setHeaderScroll] = useState(classes.header);
    const listenScroll = () => {
        if (scrollY > 0) {
            setHeaderScroll(classes.shadow)
        } else {
            setHeaderScroll(classes.header)
        }
    };
    useEffect(() => {
        document.addEventListener('scroll', listenScroll);
        return () =>
            document.removeEventListener('scroll', listenScroll);
    }, []);

    
    return (
        <>
            <Container>
                <Button variant='text' size='small'><RoomOutlinedIcon fontSize='small' />Челябинск</Button>
                <Box>

                </Box>
            </Container>
            <AppBar className={headerScroll} position="sticky" color="secondary">
                <Container className={classes.root}>
                    <IconButton onClick={() => Router.push('/')} className={classes.logo}><Logo /></IconButton>
                    <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={() => setCategories(!openCat)}>Категории</Button>
                    <Box className={classes.input}>
                        <TextField variant='outlined' size='small' placeholder="Поиск по объявлениям" fullWidth />
                        <SearchIcon className={classes.icon} />
                    </Box>
                    <Button onClick={() => Router.push('/placeOffer')} variant="contained" color="primary"><AddRoundedIcon />Подать объявление</Button>
                    <Button onClick={() => setOpenRegForm(!openRegForm)} variant="contained">Войти</Button>
                </Container>
                <Dialog open={openRegForm} onClose={() => setOpenRegForm(!openRegForm)} fullWidth maxWidth='sm'>
                    <RegForm Close={handleRegFormDialog} />
                </Dialog>
                { !openCat ? '' :<Categories/>}  
            </AppBar>
        </>
    )
}

export default Header;