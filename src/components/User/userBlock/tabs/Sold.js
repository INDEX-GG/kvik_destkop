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
    <Box className={classes.userProduct}>
      {dataArr &&
        dataArr.map((item, i) => {
          return <AdCard_component isGrid={true} key={i} offer={item} />;
        })}
    </Box>
  ) : (
    <Box className={classes.clientPage__placeholderContainer}>
      <Box className={classes.clientPage__placeholderTitle}>
        У этого пользователя нет завершенных объявлений
      </Box>
      <Box className={classes.clientPage__placeholderAds}>
        <Box className={classes.clientPage__placeholderItem}>
          <Box className={classes.clientPage__placeholderItem1} />
          <Box className={classes.clientPage__placeholderItem2} />
          <Box className={classes.clientPage__placeholderItem3} />
        </Box>
        <Box className={classes.clientPage__placeholderItem}>
          <Box className={classes.clientPage__placeholderItem1} />
          <Box className={classes.clientPage__placeholderItem2} />
          <Box className={classes.clientPage__placeholderItem3} />
        </Box>
        <Box className={classes.clientPage__placeholderItem}>
          <Box className={classes.clientPage__placeholderItem1} />
          <Box className={classes.clientPage__placeholderItem2} />
          <Box className={classes.clientPage__placeholderItem3} />
        </Box>
      </Box>
    </Box>
  );
};
export default React.memo(Sold);
