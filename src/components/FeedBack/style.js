import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  wrapper: {
    maxWidth: 1240,
    backgroundColor: "#fff",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  wrapper790: {
    width: 790,
  },

  ads: {
    padding: "0 23px",
    display: "flex",
    flexDirection: "column",
  },
  ads__wrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const useFeedBack = () => useStyles();
