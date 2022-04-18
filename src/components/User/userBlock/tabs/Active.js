import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { STATIC_URL } from "../../../../../lib/constants";
import AdCard_component from "../../../../../components/AdCard";
import { Box } from "@material-ui/core";

import { useSoldStyle } from "./soldStyle";

const Active = (data) => {
  const [dataArr, setDataArr] = useState(false);
  const classes = useSoldStyle();
  useEffect(() => {
    createData(data);
  }, [data]);

  const createData = (data) => {
    if (data?.offers.length) {
      const newArr = [];
      data.offers.map((item) => {
        newArr.push({
          ...item,
          photo: JSON.parse(item.photo)?.photos.map(
            (item) => `${STATIC_URL}/${item}`
          ),
        });
      });
      setDataArr(newArr);
    }
  };

  return data?.offers ? (
    data.offers.length ? (
      <Box
        // className="userProduct"
        className={classes.userProduct}
      >
        {dataArr &&
          dataArr.map((item, i) => {
            // console.log(item)
            return <AdCard_component isGrid={true} key={i} offer={item} />;
          })}
      </Box>
    ) : (
      <Box
        // className="clientPage__placeholder-container"
        className={classes.clientPage__placeholderContainer}
      >
        <Box
          // className="clientPage__placeholder-title"
          className={classes.clientPage__placeholderTitle}
        >
          У пользователя еще нет объявлений
        </Box>
        <Box
          // className="clientPage__placeholder-ads"
          className={classes.clientPage__placeholderAds}
        >
          <Box
            // className="clientPage__placeholder-item"
            className={classes.clientPage__placeholderItem}
          >
            <Box
              //  className="clientPage__placeholder-item-1"
              className={classes.clientPage__placeholderItem1}
            />
            <Box
              //  className="clientPage__placeholder-item-1"
              className={classes.clientPage__placeholderItem2}
            />
            <Box
              //  className="clientPage__placeholder-item-1"
              className={classes.clientPage__placeholderItem3}
            />
          </Box>
          <Box
            // className="clientPage__placeholder-item"
            className={classes.clientPage__placeholderItem}
          >
            <Box
              //  className="clientPage__placeholder-item-1"
              className={classes.clientPage__placeholderItem1}
            />
            <Box
              //  className="clientPage__placeholder-item-1"
              className={classes.clientPage__placeholderItem2}
            />
            <Box
              //  className="clientPage__placeholder-item-1"
              className={classes.clientPage__placeholderItem3}
            />
          </Box>
          <Box
            // className="clientPage__placeholder-item"
            className={classes.clientPage__placeholderItem}
          >
            <Box
              //  className="clientPage__placeholder-item-1"
              className={classes.clientPage__placeholderItem1}
            />
            <Box
              //  className="clientPage__placeholder-item-1"
              className={classes.clientPage__placeholderItem2}
            />
            <Box
              //  className="clientPage__placeholder-item-1"
              className={classes.clientPage__placeholderItem3}
            />
          </Box>
        </Box>
      </Box>
    )
  ) : null;
};

export default React.memo(Active);
