import React from "React";
import AdCard_component from "../../AdCard";

function Active(data) {
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

export default Active;
