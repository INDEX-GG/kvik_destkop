import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  support: { display: "flex", flexDirection: "column" },
  confirm__link: {
    color: "#C7C7C7",
    textDecoration: "underline",
  },
  btn: {
    padding: "12px 24px",
    color: "#fff",
    border: "none",
    backgroundColor: "#A1DCE0",
    alignSelf: "center",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  confirm: {
    marginBottom: 25,
    marginLeft: 40,
  },
  h1: {
    color: "#2C2C2C",
    fontSize: "1.88rem",
    "&:first-child": {
      margin: 15,
    },
    marginBottom: 15,
  },
}));

export const useSupport = () => useStyles();
