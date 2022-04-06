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
  },
  wrapper922: {
    maxWidth: 922,
    width: "100%",
    [theme.breakpoints.down(922)]: {
      padding: "0 10px 0 16px",
    },
  },

  links: {
    padding: "0 23px",
    display: "flex",
    position: "relative",
    flexDirection: "column",
    [theme.breakpoints.down(922)]: {
      padding: "0px",
    },
  },

  linksWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    [theme.breakpoints.down(640)]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  linksWrapperDR: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // width: "304px",
    [theme.breakpoints.down(640)]: {
      display: "none",
    },
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  contentWrapperDR: {
    display: "flex",
    flexDirection: "row-reverse",
    position: "relative",
  },

  linksCenter: {
    width: "304px",
  },
  st: {
    position: "sticky",
    top: 80,
  },
  linksCenterDR: {
    width: "220px",
  },
  linksCenterSize: {
    maxWidth: "692px",
  },
}));

export const useFeedBack = () => useStyles();
