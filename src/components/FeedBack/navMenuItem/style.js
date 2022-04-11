import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  navMenuBtn: {
    width: 220,
    marginBottom: 15,
  },

  navMenuClose: {
    display: "none",
  },
  navMenuBtnOpen: {
    "&>svg": {
      color: "#00A0AB",
    },
  },

  name: {
    "&>span": {
      fontSize: 18,
      fontWeight: 500,
    },
  },
  nameActive: {
    "&>span": {
      color: "#00A0AB",
    },
  },
  navLinks: {
    transform: "translate(50px)",
  },
  navLink: {
    marginBottom: 10,
    width: 200,
    "&>a": {
      fontSize: 18,
      fontWeight: 500,
      color: "#2C2C2C",
    },
  },
  linkActive: {
    color: "#00A0AB",
    "&>a": {
      color: "#00A0AB",
      fontSize: 18,
      fontWeight: 500,
    },
  },
}));

export const useNavMenuItem = () => useStyles();
