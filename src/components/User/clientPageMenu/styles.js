import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  clientPage__container: {
    width: "100%",
    gridArea: "2 / 3 / 4 / 4",
    paddingBottom: "32px",
    borderRadius: "10px",
    boxShadow: "0 0 20px #0000001a",
    transition: "all 350ms ease-in-out",
    background: "#fff",
    [theme.breakpoints.down(1080)]: {
      gridArea: 0,
      borderRadius: 0,
      boxShadow: "none",
      padding: "0px 12px 12px",
    },
    [theme.breakpoints.down(1024)]: {
      gridArea: "2 / 1 / 2 / 3",
    },
  },
}));

export const useClientPageMenu = () => useStyles();
