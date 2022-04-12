import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: "0px auto",
    maxWidth: 1248,
    backgroundColor: "#fff",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.down(866)]: {
      boxShadow: "none",
    },
  },
  wrapper922: {
    // maxWidth: 866,
    padding: "0 10px 0 10px",
    [theme.breakpoints.down(653)]: {
      // maxWidth: 866,
      // width: "100%",
      // display: "flex",
      // justifyContent: "center",
    },
  },

  links: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
  },

  linksWrapper: {
    display: "flex",
    justifyContent: "space-between",

    marginBottom: 20,
    [theme.breakpoints.down(642)]: {},
  },

  contentWrapper: {
    display: "flex",
    justifyContent: "center",
  },

  linksCenter: {
    display: "flex",
    justifyContent: "space-between",
    width: 866,
    [theme.breakpoints.down(866)]: {
      width: 750,
    },
    [theme.breakpoints.down(780)]: {
      gap: 30,
      maxWidth: 630,
      width: "100%",
    },
    [theme.breakpoints.down(654)]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 0,
    },
  },
  btn: {
    padding: "12px 24px",
    color: "#fff",
    border: "none",
    backgroundColor: "#A1DCE0",
    fontSize: 14,
    alignSelf: "center",
    "&:hover": {
      backgroundColor: "#A1DCE0",
    },
    marginBottom: 40,
  },
  linksCenterSize: {
    maxWidth: "692px",
  },
}));

export const useContent = () => useStyles();
