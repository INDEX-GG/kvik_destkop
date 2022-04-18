import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  clientPage__container_top: {
    top: "65px",
    backgroundColor: "#fff",
    //   zIndex: 1,
    padding: "0 32px",
    borderRadius: "8px 8px 0 0",
    zIndex: 2,
    [theme.breakpoints.down(1080)]: {
      position: "relative",
      boxShadow: "none",
      top: 0,
      padding: "0",
    },
    [theme.breakpoints.down(450)]: {
      padding: "0 10px",
    },
  },

  clientPage__container_nav__wrapper: {
    overflowX: "auto",
    overflowY: "hidden",
    margin: "0 0 21px 0",
    whiteSpace: "nowrap",
    [theme.breakpoints.down(960)]: {
      margin: 0,
      borderBottom: "none",
    },
  },
  clientPage__container_nav: {
    width: "100%",
    padding: "15px 0 0px 0",
    margin: "0 0 5px 0",
    borderBottom: "2px solid #e9e9e9",

    "& > *": {
      fontSize: "18px",
      color: "#8f8f8f",

      "&:hover": {
        transition: "all 200ms ease-in-out",
        color: "#5a5a5a",
      },
      [theme.breakpoints.down(1080)]: {
        width: "100%",
        paddingBottom: "8px",
        textAlign: "center",
        // padding: "0px 0 16px 0",
      },
      [theme.breakpoints.down(520)]: {
        fontSize: "14px",
        padding: 0,
      },
    },
    [theme.breakpoints.down(1080)]: {
      padding: "0 0 0 0",
      display: "flex",
      justifyContent: "space-between",
    },
    [theme.breakpoints.down(960)]: {
      margin: "0 0 10px 0",
      borderBottom: "none",
    },
  },

  tabBtn: {
    color: "#8f8f8f",
    borderRadius: 0,
    minWidth: "100px",
    marginBottom: "0px",
    marginRight: "40px",
    paddingBottom: "4px",
    "&:hover": {
      backgroundColor: "#fff",
    },
    [theme.breakpoints.down(1080)]: {
      marginRight: 0,
    },
  },
  navActive: {
    marginBottom: "-4px",
    color: "#2c2c2c",
    position: "relative",
    borderBottom: "4px solid #fff6a5",
    paddingBottom: "4px",
  },
}));

export const useUserStyle = () => useStyles();
