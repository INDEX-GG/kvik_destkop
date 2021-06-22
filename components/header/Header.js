import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useUser } from '../../hooks/useUser';
import { AppBar, Avatar, Box, Button, Container, Dialog, IconButton, makeStyles, TextField } from '@material-ui/core';
import UpPanel from './UpPanel';
import SearchIcon from '@material-ui/icons/Search';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Logo from '../../UI/icons/Logo';
import RegForm from '../RegForm';
import Categories from './Categories';
import CategoriesMobile from './CategoriesMobile';
import { useMedia } from '../../hooks/useMedia';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Filter from '../../UI/icons/Filter';
import FiltersApplied from '../../UI/icons/FiltersApplied';
import { withStyles } from "@material-ui/core/styles";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { stringToColor, initials } from '../../lib/services';
import Loader from '../../UI/icons/Loader';

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 12px',
        paddingBottom: '8px',
    },
    header: {
        boxShadow: theme.shadows[0],
    },
    shadow: {
        boxShadow: '0px 9px 14px 0px rgb(0 0 0 / 12%)',
    },
    logo: {
        borderRadius: theme.shape.borderRadius,
        marginRight: '24px',
        padding: '8px',
        position: 'relative',
        bottom: '6px',
    },
    avatar: {
        cursor: 'pointer',
    },
    menu__categorys: {
        width: '222px',
        marginRight: '24px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    main_block__input: {
        flexGrow: 1,
        marginRight: '12px',
        position: 'relative',
    },
    input: {
        position: 'relative',
    },
    main_block__input__radio: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        width: '100%',
    },
    input__radio: {
        color: '#C7C7C7',
        marginLeft: '0px',
        marginRight: '0px',

        '&:first-child': {
            marginRight: '34px',
            [theme.breakpoints.down('md')]: {
                marginRight: '18px',

            },
        },
        '& span': {
            fontSize: '12px',
        },
    },
    input__radio_right: {
        color: '#C7C7C7',
        marginLeft: '0px',
        marginRight: '0px',

        '& span': {
            fontSize: '12px',
        },
    },
    icon: {
        position: 'absolute',
        right: '14px',
        height: '100%',
    },
    btn__filter: {
        padding: 0,
        minWidth: '32px',
        margin: '0 12px',
        position: 'relative',
    },
    btn__filter_count: {
        position: 'absolute',
        fontSize: '10px',
        color: theme.palette.secondary.main,
        right: '2px',
        top: '0px',
        display: 'flex',
        width: '12px',
        justifyContent: 'center',
    },
    btn__add_ad: {
        marginLeft: '12px',
        marginRight: '12px',
    },
    btn__out: {
        marginLeft: '12px',
    },
}));

const GreenCheckbox = withStyles({
    root: {
        padding: 0,
        color: '#C7C7C7',
        '&$checked': {
            color: '#C7C7C7',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Header = () => {
    const { isAuth, id, isLoading, username, photo } = useUser();
    const classes = useStyles();
    const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD, matchesCustom1100 } = useMedia();
    const [openCat, setCategories] = useState();
    const [openPanel, setOpenRadioPanel] = useState();
    const [openRegForm, setOpenRegForm] = useState(false);
    const handleRegFormDialog = () => setOpenRegForm(!openRegForm);
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
            <UpPanel />
            <AppBar className={headerScroll} position="sticky" color="secondary">
                <Container className={classes.root}>
                    <IconButton onClick={() => Router.push('/')} className={classes.logo}><Logo /></IconButton>
                    <Button className={classes.menu__categorys} variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={() => setCategories(!openCat)}>Категории <ExpandMoreIcon /></Button>
                    <Box className={classes.main_block__input}>
                        <Box className={classes.input} >
                            <TextField onClick={() => setOpenRadioPanel(!openPanel)} variant='outlined' size='small' placeholder="Поиск по объявлениям" fullWidth />
                            <SearchIcon className={classes.icon} />
                        </Box>
                        {openPanel && !matchesCustom1100 && !matchesMobile && !matchesTablet &&
                            <Box className={classes.main_block__input__radio}>
                                <Box>
                                    <FormControlLabel className={classes.input__radio} control={<GreenCheckbox icon={<FiberManualRecordOutlinedIcon />} checkedIcon={<FiberManualRecordIcon />} name="checkedH" />} label="Только с фото" />
                                    <FormControlLabel className={classes.input__radio} control={<GreenCheckbox icon={<FiberManualRecordOutlinedIcon />} checkedIcon={<FiberManualRecordIcon />} name="checkedH" />} label="Безопасная сделка" />
                                </Box>
                                <FormControlLabel className={classes.input__radio_right} control={<GreenCheckbox icon={<FiberManualRecordOutlinedIcon />} checkedIcon={<FiberManualRecordIcon />} name="checkedH" />} label="Сохранить поиск" />
                            </Box>
                        }
                    </Box>
                    {!matchesLaptop && !matchesDesktop && !matchesHD &&
                        <Button className={classes.btn__filter}>
                            <Filter />
                            <FiltersApplied /><span className={classes.btn__filter_count}>99</span>
                        </Button>
                    }
                    <Button className={classes.btn__add_ad} onClick={() => Router.push('/placeOffer')} variant="contained" color="primary"><AddRoundedIcon />Подать объявление</Button>
                    {isLoading && <Loader size={40} />}
                    {!isAuth && <Button className={classes.btn__out} onClick={() => setOpenRegForm(!openRegForm)} variant="contained">Войти</Button>}
                    {isAuth && !isLoading && <Link href={`/account/${id}`}><Avatar className={classes.avatar} src={photo} style={{ backgroundColor: `${username.toColor()}` }}>{username.initials()}</Avatar></Link>}
                </Container>
                <Dialog open={openRegForm} onClose={() => setOpenRegForm(!openRegForm)} fullWidth maxWidth='sm'>
                    <RegForm Close={handleRegFormDialog} />
                </Dialog>
                {openCat && !matchesMobile && !matchesTablet && <Categories />}
                {openCat && !matchesLaptop && !matchesDesktop && !matchesHD && <CategoriesMobile />}
            </AppBar>
        </>
    )
}

export default Header;