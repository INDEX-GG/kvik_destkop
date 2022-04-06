import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  nav: {
    marginBottom: 41,

    "&>a": {
      color: "#8F8F8F",
      marginRight: 18,
      position: "relative",
      "&:after": {
        content: "''",
        position: "absolute",
        left: 64,
        top: 0,
        width: "2px",
        height: "17px",
        backgroundColor: "#8F8F8F",
        borderRadius: 1,
      },
      "&:last-child": {
        color: "#2C2C2C",
        marginRight: 0,
      },
      "&:last-child:after": {
        backgroundColor: "blue",
        content: "none",
      },
    },
  },

  h1: {
    fontSize: 36,
    fontWeight: 500,
    marginBottom: 25,
  },
  textBox: {
    maxWidth: 691,

    marginRight: 20,
    [theme.breakpoints.down(640)]: {
      marginRight: 0,
    },
  },
  textBoxClose: {
    display: "none",
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  textContent: {
    marginBottom: 40,
  },
}));

export const useText = () => useStyles();
