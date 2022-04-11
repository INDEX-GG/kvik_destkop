import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textPage: {
    // display: "flex",
    // width: "100%",
    minHeight: "300px",
    width: 914,
    padding: "0 0px",
    // justifyContent: "space-between",
    display: "grid",
    gridTemplateColumns: "1fr 200px",
    gap: 35,

    [theme.breakpoints.down(1000)]: {
      padding: "0 30px",
      width: "100%",
    },
    [theme.breakpoints.down(914)]: {
      padding: "0 30px",
    },
    [theme.breakpoints.down(768)]: {},
    [theme.breakpoints.down(655)]: {
      gridTemplateColumns: "1fr",
      // flexDirection: "column",
      padding: "0 0",
      marginBottom: 25,
    },
  },
  nav: {
    fontSize: 14,
    marginBottom: 41,
    display: "flex",
    color: "#2C2C2C",
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

  textContentWrapper: { marginRight: 0 },
  h1: {
    fontSize: 36,
    fontWeight: 500,
    marginBottom: 25,
    [theme.breakpoints.down(748)]: {
      fontSize: 18,
      marginBottom: 15,
      marginTop: 15,
    },
  },
  errortext: {
    margin: "20px 0",
    width: "100%",
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
    [theme.breakpoints.down(748)]: {
      fontSize: 14,
    },
  },
  textContent: {
    marginBottom: 40,
    [theme.breakpoints.down(748)]: {
      marginBottom: 10,
    },
  },
}));

export const useText = () => useStyles();
