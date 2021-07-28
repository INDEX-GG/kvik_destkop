import React from "react";
import AdCard_component from "../../AdCard";
import FavProvider from "../../../lib/Context/FavoritesCTX";
function Active(data) {
  if (data.offers.length == 0) {
    return (
      <div className="clientPage__placeholder-container">
        <div className="clientPage__placeholder-title">У этого пользователя нету объявлений</div>
        <div className="clientPage__placeholder-ads">
          <div className="clientPage__placeholder-item">
            <div className="clientPage__placeholder-item-1"></div>
            <div className="clientPage__placeholder-item-2"></div>
            <div className="clientPage__placeholder-item-3"></div>
          </div>
          <div className="clientPage__placeholder-item">
            <div className="clientPage__placeholder-item-1"></div>
            <div className="clientPage__placeholder-item-2"></div>
            <div className="clientPage__placeholder-item-3"></div>
          </div>
          <div className="clientPage__placeholder-item">
            <div className="clientPage__placeholder-item-1"></div>
            <div className="clientPage__placeholder-item-2"></div>
            <div className="clientPage__placeholder-item-3"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="userProduct">
      {data.offers.map((item, i) => {
        return (
            <FavProvider key={i}>
              <AdCard_component offer={item} />
            </FavProvider>
        );
      })}
    </div>
  );
}

export default Active;
