import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  navMenu: {
    color: "#2C2C2C",
    marginLeft: "20px",
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
