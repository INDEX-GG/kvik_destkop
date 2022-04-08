import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  h1: {
    color: "#2C2C2C",
    fontSize: 34,
    fontWeight: 600,
    "&:first-child": {
      marginBottom: 15,
    },
    marginBottom: 25,
    [theme.breakpoints.down(960)]: {
      fontSize: "16px",
    },
  },

  confirm: {
    marginBottom: 25,
    marginLeft: 62,
    color: "#C7C7C7",
    fontSize: "16px",
    alignSelf: "end",
    [theme.breakpoints.down(960)]: {
      marginLeft: 0,
    },
  },

  confirm__link: {
    color: "#C7C7C7",
    textDecoration: "underline",
  },
}));

export const useSupportText = () => useStyles();
