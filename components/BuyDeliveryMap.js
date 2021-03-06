import React from "react";
import { makeStyles } from "@material-ui/core";
import { useMedia } from "../hooks/useMedia";
import { useState } from "react";
import BuyDeliveryAddress from "./BuyDeliveryAddress";
import DialogUI from "./UI/DialogUI";

const useStyles = makeStyles((theme) => ({
  paragraph: {
    height: "585px",
    padding: "8px 12px",
    [theme.breakpoints.down("xs")]: {
      height: "100vh",
      // width: "100%",
      // maxWidth: "500px"
    },
  },
  paragraphTitle: {
    color: "#2C2C2C",
    fontSize: "18px",
    fontWeight: "500",
    borderBottom: "1px solid #E9E9E9",
    paddingBottom: "10px",
    marginBottom: "12px",
  },
  paragraphMenu: {
    display: "flex",
    marginBottom: "32px",
  },
  paragraphMenuItem: {
    width: "100%",
    textAlign: "center",
    paddingBottom: "8px",
    borderBottom: "2px solid #E9E9E9",
    borderRadius: "2px",
    fontWeight: "500",
  },
  paragraphMenuItemActive: {
    borderBottom: "4px solid #FFF6A5",
  },
  paragraphBox: {
    display: "flex",
  },
  paragraphList: {
    width: "100%",
    maxHeight: "522px",
    overflow: "scroll",
    [theme.breakpoints.down(960)]: {
      maxHeight: "none",
      overflow: "visible",
    },
  },
  paragraphAdress: {
    color: "#2C2C2C",
    fontWeight: "500",
  },
  paragraphMap: {
    width: "362px",
    height: "522px",
    backgroundColor: "#2C2C2C",
    borderRadius: "8px",
    marginLeft: "8px",
    [theme.breakpoints.down(960)]: {
      width: "100%",
      marginLeft: "0px",
      height: "400px",
      marginBottom: "24px",
    },
  },
  dialogTitle: {
    textAlign: "center",
    padding: "16px 0px 27px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    marginBottom: "24px",
    [theme.breakpoints.down(400)]: {
      "& > h6": {
        fontSize: "14px",
      },
    },
  },
  containerMap: {
    [theme.breakpoints.down(960)]: {
      padding: "0 24px",
    },
  },
  paragraphContainer: {
    padding: "8px 12px 12px",
  },
}));

const BuyDeliveryMap = ({ addressArr, dialog, setDialog }) => {
  const classes = useStyles();
  const [paragraphContent, setParagraphContent] = useState(false);
  const { matchesMobile, matchesTablet } = useMedia();
  const matchesSmall = matchesMobile || matchesTablet;

  function paragraphBox(map = false) {
    return (
      <div
        className={`${classes.paragraphBox} ${
          matchesSmall ? classes.paragraphContainer : ""
        }`}
      >
        <div className={classes.paragraphList}>
          {addressArr
            ? addressArr.map((item) => {
                return <BuyDeliveryAddress key={item.id} post={item} />;
              })
            : null}
        </div>
        {map ? (
          <div className={classes.containerMap}>
            <div className={classes.paragraphMap} />
          </div>
        ) : null}
      </div>
    );
  }

  function paragraphMap() {
    return (
      <>
        <div className={classes.paragraphContainer}>
          <div className={classes.paragraphMap} />
        </div>
        {paragraphBox(false)}
      </>
    );
  }

  // console.log(paragraphContent);

  return (
    <DialogUI
      open={dialog || false}
      onClose={() => setDialog(false)}
      maxWidth={608}
      title="?????????? ???????????? ???????????????????? ????????????"
    >
      {matchesSmall ? (
        <>
          <div className={classes.paragraphMenu}>
            <div
              className={`${classes.paragraphMenuItem} ${
                paragraphContent ? classes.paragraphMenuItemActive : null
              }`}
              onClick={() => setParagraphContent(!paragraphContent)}
            >
              ????????????
            </div>
            <div
              className={`${classes.paragraphMenuItem} ${
                paragraphContent ? null : classes.paragraphMenuItemActive
              }`}
              onClick={() => {
                setParagraphContent(!paragraphContent);
              }}
            >
              ??????????
            </div>
          </div>
          {matchesSmall
            ? paragraphContent
              ? paragraphBox(false)
              : paragraphMap()
            : paragraphBox(true)}
        </>
      ) : matchesSmall ? (
        paragraphContent ? (
          paragraphBox(false)
        ) : (
          paragraphMap()
        )
      ) : (
        paragraphBox(true)
      )}
    </DialogUI>
  );
};

export default BuyDeliveryMap;
