import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "552px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
  },
  input: {
    width: "100%",
    marginBottom: "15px",
    "&> input": {
      border: "1px solid #C7C7C7",
      borderRadius: "5px",
      padding: "15px",
      fontSize: "15px",
      width: "100%",
    },
  },
  formText: {
    width: "100%",
    minHeight: "110px",
    border: "1px solid #C7C7C7",
    borderRadius: "5px",
    padding: "15px",
    fontSize: "15px",
    marginBottom: 15,
    resize: "vertical",
    "&::placeholder": {
      color: "#8F8F8F",
    },
  },
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
  btn: {
    padding: "12px 24px",
    color: "#fff",
    border: "none",
    backgroundColor: "#A1DCE0",
    fontSize: 14,
    marginBottom: 10,
    alignSelf: "end",
    "&:hover": {
      backgroundColor: "#A1DCE0",
    },
  },
  confirm: {
    marginBottom: 25,
    // marginLeft: 62,
    color: "#C7C7C7",
    fontSize: "16px",
    alignSelf: "end",
    [theme.breakpoints.down(960)]: {
      marginLeft: 0,
    },
  },
  sucsses: {
    color: "#00A0AB",
    fontSize: "16px",
    alignSelf: "end",
    fontWeight: 400,
  },
  confirm__link: {
    color: "#C7C7C7",
    textDecoration: "underline",
  },
}));

export const useCallbackForm = () => useStyles();
