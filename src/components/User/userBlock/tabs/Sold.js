import React, { useEffect, useState } from "react";
import { STATIC_URL } from "../../../../../lib/constants";
import AdCard_component from "../../../../../components/AdCard";

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
    <div className="userProduct">
      {dataArr &&
        dataArr.map((item, i) => {
          return <AdCard_component isGrid={true} key={i} offer={item} />;
        })}
    </div>
  ) : (
    <div className="clientPage__placeholder-container">
      <div className="clientPage__placeholder-title">
        У этого пользователя нет завершенных объявлений
      </div>
      <div className="clientPage__placeholder-ads">
        <div className="clientPage__placeholder-item">
          <div className="clientPage__placeholder-item-1" />
          <div className="clientPage__placeholder-item-2" />
          <div className="clientPage__placeholder-item-3" />
        </div>
        <div className="clientPage__placeholder-item">
          <div className="clientPage__placeholder-item-1" />
          <div className="clientPage__placeholder-item-2" />
          <div className="clientPage__placeholder-item-3" />
        </div>
        <div className="clientPage__placeholder-item">
          <div className="clientPage__placeholder-item-1" />
          <div className="clientPage__placeholder-item-2" />
          <div className="clientPage__placeholder-item-3" />
        </div>
      </div>
    </div>
  );
}
export default Sold;
