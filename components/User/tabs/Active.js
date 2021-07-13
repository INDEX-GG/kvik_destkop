import React from "React";
import AdCard_component from "../../AdCard";

function Active(data) {
  console.log(data.offers);
  return (
    <div className="userProduct">
      {data.offers.map((item, i) => {
        return (
          <div className="userProductItem">
            <AdCard_component key={i} offer={item} />
          </div>
        );
      })}
    </div>
  );
}

export default Active;
