import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  item: {
    position: "relative",
    width: 304,
    padding: 0,
    color: "#00A0AB",
  },

  itemWrap: {
    "&>div": {
      padding: 0,
    },
  },
  itemDt: {
    marginBottom: 50,
  },
  itemLink: {
    marginBottom: 15,

    "&>a": {
      color: "#000",
      fontSize: 18,
      fontWeight: 500,
    },
  },

  h2: {
    fontSize: 24,
    color: "#00A0AB",
    fontWeight: 700,
    width: "100%",
    marginBottom: 25,
    position: "relative",

    "&:before": {
      content: "''",
      position: "absolute",
      top: 38,
      left: 0,
      width: "100%",
      height: "1px",
      backgroundColor: "#52B9C5",
    },
  },

  name: {
    fontSize: 18,
    fontWeight: 800,
    "&>span": {
      fontSize: 18,
      fontWeight: 800,
    },
  },

  bottomLine: {
    borderBottom: "1px solid #00A0AB",
  },
  drop: {
    width: "100%",
    height: 56,
    color: "#00A0AB",
    borderRadius: "0px",

    "&:last-child": {
      borderRadius: "0px",
    },
    [theme.breakpoints.down(400)]: {
      marginBottom: 0,
      height: 61,
    },
  },

  dropLine: {
    borderBottom: "1px solid #00A0AB",
  },
}));

export const useItem = () => useStyles();
