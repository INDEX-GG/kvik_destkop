import { makeStyles } from "@material-ui/core";
import danger from "../../../../icons/danger.svg";

const useStyles = makeStyles(() => ({
  btnSubscribe: {
    width: "203px",
    height: "24px",
    color: "#000",
    backgroundColor: "#e9e9e9",
    margin: "42px 0px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  ad__block_bottom__adaptive_right: {
    display: "flex",
    justifyContent: "flex-end",
  },
  SellerInfoComplain: {
    padding: "4px 24px 4px 0",
    background: `no-repeat center right url(${danger.src})`,
    backgroundSize: "contain",
  },
  small: {
    fontSize: "12px",
  },
  light: {
    marginTop: "4px",
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
