import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  clientPage__container_bottom: {
    padding: "0 32px",
    [theme.breakpoints.down(1080)]: {
      padding: 0,
    },
    [theme.breakpoints.down(450)]: {
      padding: "0 10px",
    },
  },

  clientPage__container_content: {
    width: "100%",
  },
  phOffers: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*": {
      margin: "18px 0",
    },
  },
  dark: {
    color: "#5a5a5a",
  },
  phContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  phCard: {
    boxShadow: "0px 0px 20px #0000001a",
    borderRadius: "1px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "3px",
    margin: "0 8px",
  },
  phCardPhoto: {
    width: "88px",
    height: "88px",
    borderRadius: "1px",
    backgroundColor: "#e9e9e9",
  },
  phCardTitle: {
    width: "38px",
    height: "14px",
    backgroundColor: "#e9e9e9",
    margin: "2px 0",
  },
  phCardSubtitle: {
    width: "100%",
    height: "14px",
    backgroundColor: "#e9e9e9",
  },
}));

export const usePlayceholderStyle = () => useStyles();
