import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  footer: {
    width: "100%",
    height: 40,
    backgroundColor: "#5A5A5A",
    borderRadius: "8px 8px 0 0 ",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 26px",
  },
  menu: {
    display: "flex",
    gap: 26,
  },
  footer__link: {
    color: "#fff",
  },
  media__links: {
    display: "flex",
    gap: 24,
  },
  media__linkSvg: {
    fill: "red",
    color: "red",
    stroke: "red",
  },
  media__link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  media__link_green: {
    color: "#A1DCE0",
    textDecoration: "underline",
  },
}));
export const useFooter = () => useStyles();
