import React, { useEffect, useState } from "react";
import { STATIC_URL } from "../../../../../lib/constants";
import AdCard_component from "../../../../../components/AdCard";
import { Box } from "@material-ui/core";

import { useSoldStyle } from "./soldStyle";
const Sold = (data) => {
  const classes = useSoldStyle();
  const [dataArr, setDataArr] = useState(false);

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

  return data?.offers.length ? (
    <Box
      // className="userProduct"
      className={classes.userProduct} // добавил, не проверен
    >
      {dataArr &&
        dataArr.map((item, i) => {
          return <AdCard_component isGrid={true} key={i} offer={item} />;
        })}
    </Box>
  ) : (
    <Box
      // className="clientPage__placeholder-container"
      className={classes.clientPage__placeholderContainer} // added
    >
      <Box
        //  className="clientPage__placeholder-title"
        className={classes.clientPage__placeholderTitle} // added
      >
        У этого пользователя нет завершенных объявлений
      </Box>
      <Box
        // className="clientPage__placeholder-ads"
        className={classes.clientPage__placeholderAds} // added
      >
        <Box
          // className="clientPage__placeholder-item"
          className={classes.clientPage__placeholderItem} // added
        >
          <Box
            // className="clientPage__placeholder-item-1"
            className={classes.clientPage__placeholderItem1} //added
          />
          <Box
            // className="clientPage__placeholder-item-2"
            className={classes.clientPage__placeholderItem2} //added
          />
          <Box
            // className="clientPage__placeholder-item-3"
            className={classes.clientPage__placeholderItem3} //added
          />
        </Box>
        <Box
          // className="clientPage__placeholder-item"
          className={classes.clientPage__placeholderItem} // added
        >
          <Box
            // className="clientPage__placeholder-item-1"
            className={classes.clientPage__placeholderItem1} //added
          />
          <Box
            // className="clientPage__placeholder-item-2"
            className={classes.clientPage__placeholderItem2} //added
          />
          <Box
            // className="clientPage__placeholder-item-3"
            className={classes.clientPage__placeholderItem3} //added
          />
        </Box>
        <Box
          // className="clientPage__placeholder-item"
          className={classes.clientPage__placeholderItem} // added
        >
          <Box
            // className="clientPage__placeholder-item-1"
            className={classes.clientPage__placeholderItem1} //added
          />
          <Box
            // className="clientPage__placeholder-item-2"
            className={classes.clientPage__placeholderItem2} //added
          />
          <Box
            // className="clientPage__placeholder-item-3"
            className={classes.clientPage__placeholderItem3} //added
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Sold;
