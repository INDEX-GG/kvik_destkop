import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down(800)]: {
      position: "relative",
    },
  },
  wrapper: {
    backgroundColor: "#5a5a5a",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    padding: "8px 16px",
  },
  footerInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down(800)]: {
      alignItems: "start",
    },
  },
  about: {
    flexGrow: 1,
    width: 100,
  },
  aboutLinks: {
    display: "flex",
    // width: "254px",
    "& > *:last-child": {
      marginRight: 0,
    },
    [theme.breakpoints.down(800)]: {
      flexDirection: "column",
      width: "90px",
    },
  },
  aboutLink: {
    marginRight: "16px",
    "& > a": {
      color: "#ffffff",
      fontSIze: "14px",
      lineHeight: "14px",
      outline: "none",
      transition: ".2s all linear",
      "&:hover": {
        color: "#d9d9d9",
      },
    },
    [theme.breakpoints.down(800)]: {
      marginRight: "0",
      lineHeight: "16px",
      margin: "2px 0",
    },
    [theme.breakpoints.down(400)]: {
      "& > a": {
        fontSize: "12px",
      },
    },
  },
  social: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    width: 100,
    "& > *:last-child": {
      marginRight: "0px",
    },
    [theme.breakpoints.down(800)]: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: "10px",
    },
  },
  socialItem: {
    marginRight: "24px",
    [theme.breakpoints.down(400)]: {
      marginRight: "12px",
    },
  },
  product: {
    display: "flex",
    flexGrow: 1,
    width: 100,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    [theme.breakpoints.down(800)]: {
      height: "60px",
      width: "200px",
    },
  },
  website: {
    paddingTop: "5px",
    "& > a": {
      fontSize: "12px",
      fontWeight: 500,
      color: "#a1dce0",
      transition: ".2s all linear",
      "&:hover": {
        color: "#00A0AB",
      },
    },
    [theme.breakpoints.down(800)]: {
      order: 3,
      paddingTop: "0",
      marginTop: "10px",
    },
    [theme.breakpoints.down(400)]: {
      "& > a": {
        fontSize: "12px",
        lineHeight: "14px",
      },
    },
  },
  app: {
    marginLeft: "22px",
    [theme.breakpoints.down(400)]: {
      marginLeft: "12px",
    },
  },
  payment: {
    marginTop: "5px",
    width: "300px",
    height: "30px",
    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
    [theme.breakpoints.down(800)]: {
      width: "100%",
    },
  },
}));

export const useFooterStyles = () => useStyles();
