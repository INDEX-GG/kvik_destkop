import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { STATIC_URL } from "../../../../../lib/constants";
import AdCard_component from "../../../../../components/AdCard";

function Active(data) {
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

  return data?.offers ? (
    data.offers.length ? (
      <div className="userProduct">
        {dataArr &&
          dataArr.map((item, i) => {
            // console.log(item)
            return <AdCard_component isGrid={true} key={i} offer={item} />;
          })}
      </div>
    ) : (
      <div className="clientPage__placeholder-container">
        <div className="clientPage__placeholder-title">
          У пользователя еще нет объявлений
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
    )
  ) : null;
}

export default Active;
