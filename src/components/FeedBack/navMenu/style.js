import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navMenu: {
    color: "#2C2C2C",
    marginLeft: "20px",
    // [theme.breakpoints.down(640)]: {
    //   display: "none",
    // },
  },

  navMenuClose: {
    display: "none",
  },
  st: {
    position: "sticky",
    top: 100,
    height: 100,
  },
}));

export const useNavMenu = () => useStyles();
