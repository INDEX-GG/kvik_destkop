import { AppBar, Avatar, Button, Container, makeStyles } from "@material-ui/core";
import Logo from "./Logo";
import Search from "./Search";
import MobileMenu from "../../UI/icons/MobileMenu";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import MobileFilter from "../../UI/icons/MobileFilter";
import { useAuth } from "../../lib/Context/AuthCTX";
import { useUser } from "../../hooks/useUser";
import { initials, stringToColor } from "../../lib/services";
import { useRouter } from "next/router";
import { DialogCTX } from "../../lib/Context/DialogCTX";
import { useState } from "react";
import { useMedia } from "../../hooks/useMedia"
import Link from "next/link"
import Login from "../auth/Login";
import BurgerCategories from "./BurgerCategories";

const useStyles = makeStyles(() => ({
  container: {
    flexDirection: "column",
    padding: "0 24px",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "4px 0 12px"
  },
  menu: {
    width: "32px",
    heighth: "32px",
    borderRadius: "4px",
    backgroundColor: "#00A0AB",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "100px",
    height: "53px",
  },
  avatar: {
    width: "32px",
    height: "32px",
  },
  block2: {
    display: "flex",
    marginBottom: "19px",
  },
  changeMenu: {
    marginLeft: "24px",
    position: "relative",
  },
  filter: {
    display: "none",
    transition: "0.2s all linear",
  },
  test: {
    marginBottom: "124px",
  }
}));

function HeaderMobile({ chageMenu = false }) {
  const {id, isAuth} = useAuth()
  const {userPhoto, name} = useUser()
  const classes = useStyles();
    const [openRegForm, setOpenRegForm] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const Router = useRouter()
  const {matchesMobile} = useMedia()

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Container className={classes.container}>
          <div className={classes.info}>
            <BurgerCategories/>
            <Logo className={classes.logo} />
            {isAuth ?
              <Link href={`/account/${id}`}>
                <Avatar className={classes.avatar} src={userPhoto} style={{ backgroundColor: `${stringToColor(name)}` }}>
                  {initials(name)}
                </Avatar>
              </Link> : 
              <div className={classes.avatar}></div>}
          </div>
          <div className={classes.block2}>
            <Search text={matchesMobile ? "Поиск" : false} />
            {isAuth ? 
            (chageMenu ? (
              <Button className={classes.changeMenu} onClick={() => Router.push("/placeOffer")} variant="contained" color="primary">
                <AddRoundedIcon />
                Подать объявление
              </Button>
            ) : (
              <div className={classes.changeMenu}>
                <MobileFilter className={classes.filter} number={10} />
              </div>
            )) :  
            <div className={classes.changeMenu}>
              <Button onClick={() => setOpenLoginForm(!openLoginForm)} variant="contained">
                Войти
              </Button>
            </div>}
          </div>
        </Container>
        <DialogCTX.Provider value={{ openRegForm, setOpenRegForm, openLoginForm, setOpenLoginForm }}>
          <Login />
        </DialogCTX.Provider>
      </AppBar>
      <div className={classes.test}></div>
    </>
  );
}
export default HeaderMobile;
