import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  clientPage__container: {
    width: "100%",
    gridArea: "2 / 3 / 4 / 4",
    paddingBottom: "32px",
    borderRadius: "10px",
    boxShadow: "0 0 20px #0000001a",
    transition: "all 350ms ease-in-out",
    background: "#fff",
  },
}));

export const useClientPageMenu = () => useStyles();
