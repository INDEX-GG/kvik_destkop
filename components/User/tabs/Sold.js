import React from "react";
import AdCard_component from "../../AdCard";

function Sold(data) {
  return (
    <div className="userProduct">
      {data.offers.map((item, i) => {
        return (
          <div key={i} className="userProductItem">
            <AdCard_component offer={item} />
          </div>
        );
      })}
    </div>
  );
}
export default Sold;
