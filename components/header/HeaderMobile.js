import { AppBar, Avatar, Button, Container, makeStyles } from "@material-ui/core";
import Logo from "./Logo";
import Search from "./Search";
import MobileMenu from "../../UI/icons/MobileMenu";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import MobileFilter from "../../UI/icons/MobileFilter";

const useStyles = makeStyles(() => ({
  container: {
    flexDirection: "column",
    padding: "0 24px",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginBottom: "144px",
  }
}));

function HeaderMobile({ chageMenu = false }) {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Container className={classes.container}>
          <div className={classes.info}>
            <div className={classes.menu}>
              <MobileMenu />
            </div>
            <Logo className={classes.logo} />
            <Avatar className={classes.avatar} alt="photo" />
          </div>
          <div className={classes.block2}>
            <Search />
            {chageMenu ? (
              <Button className={classes.changeMenu} variant="contained" color="primary">
                <AddRoundedIcon />
                Подать объявление
              </Button>
            ) : (
              <div className={classes.changeMenu}>
                <MobileFilter className={classes.filter} number={10} />
              </div>
            )}
          </div>
        </Container>
      </AppBar>
      <div className={classes.test}></div>
    </>
  );
}
export default HeaderMobile;
