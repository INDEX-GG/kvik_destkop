import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  navMenu: {
    color: "#2C2C2C",
    margin: "0 40px 0 0",
  },

  navMenuClose: {
    display: "none",
  },
  st: {
    position: "sticky",
    top: 100,
    height: 100,
    "&>div": {
      "&>div": {
        padding: 0,
        width: 220,
      },
    },
  },
}));

export const useNavMenu = () => useStyles();
