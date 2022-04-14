import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  clientPage__placeholderContainer: {
    width: "100%",
    marginTop: "148px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down(1080)]: {
      marginTop: 50,
    },
  },
  userProduct: {
    display: "grid",
    padding: "0 30px",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridColumnGap: "24px",
    gridRowGap: "24px",
  },
  clientPage__placeholderTitle: {
    fontSize: "14px",
    color: "#5a5a5a",
    fontWeight: 500,
    marginBottom: "35px",
  },
  clientPage__placeholderAds: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "32px",
  },
  clientPage__placeholderItem: {
    width: "94px",
    height: "126px",
    background: "#ffffff",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "1px",
    padding: "3px 3px",
    "&:nth-child(2n)": {
      margin: "0 16px",
    },
  },
  clientPage__placeholderItem1: {
    width: "88px",
    height: "88px",
    backgroundColor: "#e9e9e9",
    borderRadius: "1px",
    margin: "0 auto 2px",
  },
  clientPage__placeholderItem2: {
    width: "38px",
    height: "14px",
    backgroundColor: "#e9e9e9",
    // margin-bottom: 2px,
    margin: "0 auto 2px",
  },
  clientPage__placeholderItem3: {
    width: "86px",
    height: "14px",
    backgroundColor: "#e9e9e9",
    margin: "0 auto",
  },
}));

export const useSoldStyle = () => useStyles();
