import { makeStyles } from "@material-ui/core";

const colorBlue = "#00A0AB";

const useStyles = makeStyles(() => ({
  nav: {
    display: "flex",
    marginBottom: "80px",
    width: "100%",
    alignItems: "end",
  },
  svgtest: {
    fontSize: 40,
  },
  logo: {
    marginRight: 50,
  },
  svgSearch: {
    stroke: "#7c7c7c",
    margin: "5px 10px",
  },
  nav__findwraper: {
    display: "flex",
    width: "100%",
  },
  navSearchField: {
    width: "100%",
  },
  nav__search: {
    border: `1px solid ${colorBlue}`,
    borderRadius: "8px 0 0 8px",
    "& input": {
      padding: "7px",
    },
  },
  nav__btnSearch: {
    backgroundColor: colorBlue,
    borderRadius: "0 8px 8px 0",
    color: "#fff",
    border: "none",
    padding: "4px 34px",
    overflow: "hidden",
  },
}));

export const useNav = () => useStyles();
