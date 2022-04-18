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
    padding: "15px 0 6px 0",
    margin: "0 0 5px 0",
    borderBottom: "2px solid #e9e9e9",

    "& > *": {
      margin: "0 40px 0 0",
      // padding: "0px 0 16px 0",
      fontSize: "18px",
      color: "#8f8f8f",
      transition: "all 200ms ease-in-out",
      /* border-bottom: 2px solid $light; */

      "&:last-child": {
        margin: 0,
      },
      "&:hover": {
        transition: "all 200ms ease-in-out",
        color: "#5a5a5a",
      },
      [theme.breakpoints.down(1080)]: {
        marginEight: "0px",
        width: "100%",
        paddingBottom: "8px",
        textAlign: "center",
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
      margin: 0,
      borderBottom: "none",
    },
  },
  navActive: {
    color: "#2c2c2c",
    position: "relative",
    "&:after": {
      content: "''",
      width: "100%",
      height: "4px",
      position: "absolute",
      bottom: -8,
      left: 0,
      backgroundColor: "#fff6a5",
    },
  },
  tabBtn: {
    borderRadius: 0,
    transition: "all 2000ms ease-in-out",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
}));

export const useUserStyle = () => useStyles();
