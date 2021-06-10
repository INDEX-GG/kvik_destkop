import { useState } from 'react';
import { AppBar, Box, Button, Container, Dialog, IconButton, InputBase, makeStyles, Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import React from 'react';
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
    input: {
        flexGrow: 1,
        padding: '0 24px',
        position: 'relative',
        border: '1px solid #5A5A5A',
        borderRadius: '8px',
    },
    icon: {
        position: 'absolute',
        right: '24px',
        height: '100%',
    },
    
}));

const Header = () => {
    const [open, setOpen] = useState();
    const classes = useStyles();

    const [openCat, setCategories] = useState();
    return (
        <>
            {/* <Toolbar>
                <Container>
                    UpPanel
                </Container>
            </Toolbar> */}
            <AppBar position="sticky" color="secondary">
                <Container className={classes.root}>
                    <IconButton><Logo /></IconButton>
                    <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={() => setCategories(!openCat)}>Категории</Button>
                    <Box className={classes.input}>
                        <InputBase placeholder="Поиск по объявлениям" fullWidth />
                        <SearchIcon className={classes.icon} />
                    </Box>
                    <Button variant="contained" color="primary"><AddRoundedIcon />Подать объявление</Button>
                    <Button onClick={() => setOpen(!open)} variant="contained">Войти</Button>  
                </Container>
                <Dialog open={open} onClose={() => setOpen(!open)} fullWidth maxWidth='sm'><RegForm /></Dialog>
               { !openCat ? '' :<Categories/>}             

            </AppBar>
        </>
    )
}

export default Header
