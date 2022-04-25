import { makeStyles } from "@material-ui/core";
import danger from "../../../../icons/danger.svg";

const useStyles = makeStyles((theme) => ({
  btnSubscribe: {
    width: "203px",
    height: "24px",
    color: "#000",
    backgroundColor: "#e9e9e9",
    margin: "42px 0px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 400,
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#e9e9e9",
    },
    [theme.breakpoints.down(1080)]: {
      margin: "16px 0px",
    },
  },
  ad__block_bottom__adaptive_right: {
    display: "flex",
    justifyContent: "flex-end",
  },
  SellerInfoComplain: {
    padding: "15px 22px 6px 0px",
    background: `no-repeat center right url(${danger.src})`,
    backgroundSize: "contain",
  },
  small: {
    fontSize: "12px",
  },
  light: {
    // marginTop: "4px",
    color: "#8f8f8f",

    lineheight: "1,17",
  },
  underline: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
}));

export const useClientSubMenu = () => useStyles();
