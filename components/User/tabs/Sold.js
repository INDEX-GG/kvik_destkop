import React from "react";
import AdCard_component from "../../AdCard";

function Sold(data) {
  return (
    <div className="userProduct">
      {data.offers.map((item, i) => {
        return (
          <div className="userProductItem sold">
            <AdCard_component key={i} offer={item} />
          </div>
        );
      })}
    </div>
  );
}
export default Sold;
