import { AppBar, Box, Button, Container, IconButton, InputBase, makeStyles, Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import React from 'react'
import Logo from '../UI/icons/Logo'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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

const classes = useStyles();

    return (
        <>
            {/* <Toolbar>
                <Container>
                    UpPanel
                </Container>
            </Toolbar> */}
            <AppBar position="sticky" color="transparent">
                <Container className={classes.root}>
                    <IconButton><Logo /></IconButton>
                    <Button variant="contained" color="primary">Категории</Button>
                    <Box className={classes.input}>
                        <InputBase placeholder="Поиск по объявлениям" fullWidth/>
                        <SearchIcon className={classes.icon} />
                    </Box>
                    <Button variant="contained" color="primary"><AddRoundedIcon />Подать объявление</Button>
                    <Button variant="contained">Войти</Button>
                </Container>
            </AppBar>
        </>
    )
}

export default Header
