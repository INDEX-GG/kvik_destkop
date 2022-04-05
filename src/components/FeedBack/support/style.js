import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  support: { display: "flex", flexDirection: "column", marginBottom: 90 },

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
  confirm: {
    marginBottom: 25,
    marginLeft: 100,
    color: "#C7C7C7",
    [theme.breakpoints.down(922)]: {
      marginLeft: 0,
    },
  },
  confirm__link: {
    color: "#C7C7C7",
    textDecoration: "underline",
  },
  h1: {
    color: "#2C2C2C",
    fontSize: 34,
    fontWeight: 600,
    "&:first-child": {
      marginBottom: 15,
    },
    marginBottom: 10,
    [theme.breakpoints.down(922)]: {
      fontSize: "16px",
    },
  },
}));

export const useSupport = () => useStyles();
