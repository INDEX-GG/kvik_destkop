import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  clientPage: {
    paddingBottom: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 220px 1014px 1fr",
    gridTemplateRows: "50px auto",
    gridColumnGap: "24px",
    gridRowGap: "32px",

    [theme.breakpoints.down(1280)]: {
      gridTemplateColumns: "1fr 220px 775px 1fr",
    },
    [theme.breakpoints.down(1080)]: {
      display: "grid",
      gridColumnGap: "0px",
      gridRowGap: "0px",
      gridTemplateColumns: "-1",
      gridTemplateRows: "1fr",
    },
    [theme.breakpoints.down(1024)]: {
      gridTemplateColumns: "1fr",
    },
  },
  text: {
    fontWeight: 500,
    fontSize: "14px",
    color: "#2c2c2c",
  },
}));

export const useUserPageStyles = () => useStyles();
