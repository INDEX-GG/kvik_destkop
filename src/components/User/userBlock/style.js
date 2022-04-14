import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  clientPage__container_top: {
    top: "65px",
    backgroundColor: "#fff",
    //   zIndex: 1,
    padding: "0 32px",
    borderRadius: "8px 8px 0 0",
    zIndex: 2,
  },
  clientPage__container_nav__wrapper: {
    overflowX: "auto",
    overflowY: "hidden",
    margin: "0 0 21px 0",
    whiteSpace: "nowrap",
  },
  clientPage__container_nav: {
    width: "100%",
    padding: "24px 0 15px 0",
    margin: "0 0 5px 0",
    borderBottom: "2px solid #e9e9e9",
    "&>:last-child": {
      margin: 0,
    },
    "&>:hover": {
      transition: "all 200ms ease-in-out",
      color: "#5a5a5a",
      textDecoration: "none", // небыло в оригенале
    },
    "& > *": {
      margin: "0 40px 0 0",
      padding: "0px 0 16px 0",
      fontSize: "18px",
      color: "#8f8f8f",
      transition: "all 200ms ease-in-out",
      /* border-bottom: 2px solid $light; */
    },
  },
  navActive: {
    borderBottom: "4px solid #fff6a5",
    paddingBottom: "15px",
    color: "#2c2c2c",
  },
}));

export const useUserStyle = () => useStyles();
