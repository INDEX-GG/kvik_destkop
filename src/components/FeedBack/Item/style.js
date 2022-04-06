import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  item: {
    position: "relative",
  },

  itemLink: {
    marginBottom: 10,

    "&>a": {
      color: "#000",
      fontSize: 18,
      fontWeight: 500,
    },
  },
  link: {
    // borderBottom: "1px solid #00A0AB",
  },
  linkActive: {
    color: "#00A0AB",
    "&>a": {
      color: "#00A0AB",
      fontSize: 18,
      fontWeight: 500,
    },
  },
  name: {
    "&>span": {
      fontSize: 18,
      fontWeight: 800,
    },
  },
  nameDR: {
    "&>span": {
      fontSize: 18,
      fontWeight: 500,
    },
  },
  collapse: {
    transform: "translateX(50px)",
  },

  bottomLine: {
    borderBottom: "1px solid #00A0AB",
  },
  drop: {
    width: "100%",
    height: 56,
    color: "#00A0AB",
    borderRadius: "0px",
    marginBottom: 15,
    "&:last-child": {
      borderRadius: "0px",
    },
  },
  dropDR: {
    width: "100%",
    height: 30,
    color: "#00A0AB",
    borderRadius: "0px",
    marginBottom: 15,
    "&:last-child": {
      borderRadius: "0px",
    },
  },

  dropLine: {
    borderBottom: "1px solid #00A0AB",
  },
}));

export const useItem = () => useStyles();
