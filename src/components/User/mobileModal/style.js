import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal__wrapper_md: {
    padding: "8px 12px",
    width: "600px",
    [theme.breakpoints.down(960)]: {
      width: "100%",
      height: "100%",
      padding: 0,
    },
  },
  modal__block__top: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid $light",
    paddingBottom: "7px",
    [theme.breakpoints.down(960)]: {
      border: 0,
      paddingBottom: 0,
    },
  },
  mobileModalTop: {
    display: "block",
    flexDirection: "column",
  },
  modalModalTitleBox: {
    [theme.breakpoints.down(960)]: {
      //padding: 16px 0px 11px;
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "64px",
      textAlign: "center",
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      marginBottom: "24px",
      position: "relative",
    },
  },
  mobileModalArrow: {
    [theme.breakpoints.down(960)]: {
      cursor: "pointer",
      width: "10px",
      height: "10px",
      position: "absolute",
      left: "18px",

      top: "50%",
      transform: "translateY(-50%)",
    },
    "&::after": {
      [theme.breakpoints.down(960)]: {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#C7C7C7",
        width: "12px",
        height: "3px",
        transform: "rotate(-45deg)",
        borderRadius: "5px",
      },
    },

    "&::before": {
      [theme.breakpoints.down(960)]: {
        content: "''",
        position: "absolute",
        top: "7px",
        left: 0,
        backgroundColor: "#C7C7C7",
        width: "12px",
        height: "3px",
        transform: "rotate(45deg)",
        borderRadius: "5px",
      },
    },
  },

  modal__block__top_title: {
    [theme.breakpoints.down(960)]: {
      margin: 0,
      color: "#2c2c2c",
      fontWeight: 500,
      fontSize: "18px",
    },
  },
  mobileModalTitle: {
    [theme.breakpoints.down(960)]: {
      // padding: '16px 0px 27px',
      // textAlign: 'center',
      // boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      // marginBottom: '24px',
    },
  },
  mobileModalSubtitle: {
    [theme.breakpoints.down(960)]: {
      color: "#8F8F8F",
      fontWeight: 500,
      textAlign: "center",
    },
  },
}));

export const useModalMobile = () => useStyles();
