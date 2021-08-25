import { useState, useEffect } from "react";
import Router from "next/router";
import { AppBar, Button, Container, Box, makeStyles } from "@material-ui/core";
import UpPanel from "./UpPanel";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Logo from "./Logo";
import Categories from "./Categories";
import CategoriesMobile from "./CategoriesMobile";
import { useMedia } from "../../hooks/useMedia";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Loader from "../../UI/icons/Loader";
import { DialogCTX } from "../../lib/Context/DialogCTX";
import Search from "./Search";
import Login from "../auth/Login";
import { useAuth } from "../../lib/Context/AuthCTX";
import { useRouter } from "next/router";
import HeaderAccount from "./HeaderAccount";
import { useStore } from "../../lib/Context/Store";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    justifyContent: "space-between",
    padding: "9px 12px ",
    display: 'flex',
    alignItems: "flex-end",
    "&>*": {
      margin: "0 12px",
    },
    "&>*:first-child": {
      marginLeft: 0,
    },
    "&>*:last-child": {
      marginRight: 0,
    },
  },
  header: {
    boxShadow: theme.shadows[0],
  },
  shadow: {
    boxShadow: "0px 9px 14px 0px rgb(0 0 0 / 12%)",
  },
  logo: {
    borderRadius: theme.shape.borderRadius,
    padding: "8px 8px 0px 8px",
  },
  avatar: {
    cursor: "pointer",
    width: "32px",
    height: "32px",
  },
  input: {
    position: "relative",
    flexGrow: 1,
  },
  icon: {
    position: "absolute",
    right: "14px",
    height: "100%",
  },
  categories__back: {
    width: '100%',
    minHeight: '110vh',
    position: 'absolute',
    left: '0px',
    top: '0px',
    zIndex: '0',
  },
  menu__categorys: {
    minWidth: "220px",
    justifyContent: "space-between"
  }
}));

const Header = ({ category }) => {
  const { isAuth} = useAuth();
  const router = useRouter();
  const {userInfo} = useStore();
  const classes = useStyles();
  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();
  const [openCat, setCategories] = useState();
  const [openRegForm, setOpenRegForm] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [headerScroll, setHeaderScroll] = useState(classes.header);
  
  const listenScroll = () => {
    if (scrollY > 0) {
      setHeaderScroll(classes.shadow);
    } else {
      setHeaderScroll(classes.header);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", listenScroll);
    return () => document.removeEventListener("scroll", listenScroll);
  }, []);

  return (
    <>
      <UpPanel />
      <AppBar className={headerScroll} position="sticky" color="secondary">
        <Container className={classes.root}>
          <Logo />
          <Button className={classes.menu__categorys} variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={() => setCategories(!openCat)}>
            {router.route === '/search/[alias]' ? category : "Категории"}
            <ExpandMoreIcon />
          </Button>
          <Search />
          {isAuth && <Button onClick={() => Router.push("/placeOffer")} variant="contained" color="primary">
            <AddRoundedIcon />
           Новое объявление
          </Button>}

          {!isAuth && <Button onClick={() => setOpenLoginForm(!openLoginForm)} variant="contained">
            Войти
          </Button>
            || (userInfo === undefined) && <Loader size={32} /> || (userInfo !== undefined) &&
            <HeaderAccount userPhoto={userInfo.userPhoto} name={userInfo.name} />}

        </Container>
        {openCat && !matchesMobile && !matchesTablet && <Box onClick={() => setCategories(!openCat)} className={classes.categories__back} ><Categories /></Box>}
        {openCat && !matchesLaptop && !matchesDesktop && !matchesHD && <CategoriesMobile />}
      </AppBar>
      <DialogCTX.Provider value={{ openRegForm, setOpenRegForm, openLoginForm, setOpenLoginForm }}>
        <Login />
      </DialogCTX.Provider>
    </>
  );
};

export default Header;