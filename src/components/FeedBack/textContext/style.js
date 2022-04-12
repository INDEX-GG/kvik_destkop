import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  textContent: {
    marginBottom: 40,
    [theme.breakpoints.down(748)]: {
      marginBottom: 10,
    },
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
}));

export const useTextContent = () => useStyles();
