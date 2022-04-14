import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userProduct: {
    display: "grid",
    padding: "0 30px",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridColumnGap: "24px",
    gridRowGap: "24px",

    [theme.breakpoints.down(1280)]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.breakpoints.down(1080)]: {
      gridTemplateColumns: "repeat(4, 1fr)",
      //   padding: "0 0px",
      padding: "0px 12px 12px",
    },
    [theme.breakpoints.down(850)]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.breakpoints.down(600)]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
}));

export const useActiveStyle = () => useStyles();
