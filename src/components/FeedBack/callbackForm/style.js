import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  form: {
    maxWidth: "552px",
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
    minHeight: "67px",
    border: "1px solid #C7C7C7",
    borderRadius: "5px",
    padding: "15px",
    fontSize: "15px",
  },
}));

export const useCallbackForm = () => useStyles();
