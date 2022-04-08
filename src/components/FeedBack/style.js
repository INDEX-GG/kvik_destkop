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
    maxWidth: 866,
    width: "100%",
    padding: "0 10px 0 16px",
    [theme.breakpoints.down(866)]: {
      padding: "0 10px 0 16px",
    },
  },

  links: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
  },

  linksWrapper: {
    display: "flex",

    // justifyContent: "space-between",
    // width: "100%",
    marginBottom: 20,
    [theme.breakpoints.down(642)]: {
      // flexDirection: "column",
      // alignItems: "center",
    },
  },

  contentWrapper: {
    display: "flex",
    justifyContent: "center",
    // flexDirection: "column",
  },
  // contentWrapperDR: {
  //   display: "flex",
  //   flexDirection: "row-reverse",
  //   position: "relative",
  // },

  linksCenter: {
    // width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    [theme.breakpoints.down(660)]: {
      // flexDirection: "column",
      // alignItems: "center",
      justifyContent: "center",
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
  },
  linksCenterSize: {
    maxWidth: "692px",
  },
  ggg: {
    display: "flex",
    flexDirection: "column",
  },
}));

export const useFeedBack = () => useStyles();
