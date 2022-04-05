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
  wrapper790: {
    maxWidth: 922,
    width: "100%",
    [theme.breakpoints.down(922)]: {
      padding: "0 10px 0 16px",
    },
  },

  links: {
    padding: "0 23px",
    display: "flex",
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
  linksCenter: {
    width: "304px",
  },
}));

export const useFeedBack = () => useStyles();
