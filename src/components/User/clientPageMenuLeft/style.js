import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avararSize: {
    width: "80px",
    height: "80px",
  },

  clientPage__menu: {
    position: "sticky",
    height: "min-content",
    top: "100px",
    gridArea: "2 / 2 / 3 / 3",
    padding: "21px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    userSelect: "none",
    borderRadius: "10px",
    boxShadow: "0 0 20px #0000001a",
    transition: "all 350ms ease-in-out",
    background: "#ffffff",

    [theme.breakpoints.down(1080)]: {
      gridArea: 0,
      borderRadius: 0,
      boxShadow: "none",
      padding: "21px 10px 0 10px",
      position: "relative",
      top: 24, // без этого нет тени от модалки
      "&:hover": {
        boxShadow: "none",
      },
    },
    [theme.breakpoints.down(1024)]: {
      padding: "10px !important",
      gridArea: "1 / 1 / 1 / 1",
    },
    "&>*": {
      margin: "21px 0",
      [theme.breakpoints.down(1024)]: {
        margin: "0 0 15px 0 !important",
      },
    },
  },
  clientPage__userinfo: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  clientPage__userpic: {
    position: "relative",
    // width: "80px",      //для старого формата
    // height: "80px",     //для старого формата
    // minHeight: "80px", //для старого формата
    borderRadius: "50%",
    "&>img": {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },

  clientPage__username: {
    margin: "8px 0",
  },
  small: {
    fontSize: "12px",
  },
  light: {
    marginTop: "4px",
    color: "#8f8f8f",
    lineheight: "1,17",
  },
  clientPage__userrate: {
    width: "100%",
    margin: "8px 0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  clientPage__userrate__num: {
    margin: "5px",
  },
  clientPage__userstats: {
    marginTop: "8px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "&>*": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down(1080)]: {
      maxWidth: 204,
    },
  },

  tooltip: {
    border: "#8F8F8F solid 1px",
    background: "#FFFFFF",
    color: "#5A5A5A",
    fontSize: "12px",
    textAlign: "center",
    maxWidth: "190px",
  },
  arrow: {
    color: "#FFFFFF",
    "&:before": {
      content: '""',
      border: "#8F8F8F solid 1px",
    },
  },
  userStats: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "none",
    color: "#00a0ab",
    transition: "all 200ms ease-in-out",
    cursor: "pointer",

    "&:hover": {
      textDecoration: "none",
    },
    "& button": {
      color: "#00a0ab",
    },
    "& button p": {
      color: "#00a0ab",
    },
  },
  buttonDesc: {
    fontSize: "11px",
  },
  highlight: {
    color: "#00a0ab",
  },
}));

export const useClientPageMenuLeft = () => useStyles();
