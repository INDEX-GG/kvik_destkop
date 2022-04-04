import { makeStyles } from "@material-ui/core";

const colorBlue = "#00A0AB";

const useStyles = makeStyles(() => ({
  ad: {
    width: 304,
    display: "flex",
    flexDirection: "column",
    marginBottom: 50,
  },
  ad__header: {
    color: colorBlue,
    marginBottom: 25,

    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      bottom: -10,
      left: 0,
      width: "100%",
      height: "1px",
      backgroundColor: colorBlue,
    },
  },
  ad__item: {
    marginBottom: 10,
  },
  ad__link: {
    color: "#000",
    fontSize: 18,
  },
}));

export const useItem = () => useStyles();
