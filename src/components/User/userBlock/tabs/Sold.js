import React, { useEffect, useState } from "react";
import { STATIC_URL } from "../../../../../lib/constants";
import AdCard_component from "../../../../../components/AdCard";
import { Box } from "@material-ui/core";
function Sold(data) {
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
    <Box className="userProduct">
      {dataArr &&
        dataArr.map((item, i) => {
          return <AdCard_component isGrid={true} key={i} offer={item} />;
        })}
    </Box>
  ) : (
    <Box className="clientPage__placeholder-container">
      <Box className="clientPage__placeholder-title">
        У этого пользователя нет завершенных объявлений
      </Box>
      <Box className="clientPage__placeholder-ads">
        <Box className="clientPage__placeholder-item">
          <Box className="clientPage__placeholder-item-1" />
          <Box className="clientPage__placeholder-item-2" />
          <Box className="clientPage__placeholder-item-3" />
        </Box>
        <Box className="clientPage__placeholder-item">
          <Box className="clientPage__placeholder-item-1" />
          <Box className="clientPage__placeholder-item-2" />
          <Box className="clientPage__placeholder-item-3" />
        </Box>
        <Box className="clientPage__placeholder-item">
          <Box className="clientPage__placeholder-item-1" />
          <Box className="clientPage__placeholder-item-2" />
          <Box className="clientPage__placeholder-item-3" />
        </Box>
      </Box>
    </Box>
  );
}
export default Sold;
