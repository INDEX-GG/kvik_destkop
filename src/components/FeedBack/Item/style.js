import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  item: {
    width: 304,
    display: "flex",
    flexDirection: "column",
    marginBottom: 50,
  },

  itemLink: {
    marginBottom: 10,

    "&>a": {
      color: "#000",
      fontSize: 18,
      fontWeight: 500,
    },
  },
  link: {},

  name: {
    "&>span": {
      fontSize: 18,
      fontWeight: 800,
    },
  },
  list: {
    borderBottom: "1px solid #00A0AB",
  },
  drop: {
    width: "100%",
    height: 56,
    color: "#00A0AB",

    borderRadius: "0px",

    margin: 0,
    "&:last-child": {
      borderRadius: "0px",
    },
  },
  dropLine: {
    borderBottom: "1px solid #00A0AB",
  },
}));

export const useItem = () => useStyles();
