import React, { useEffect } from "react";
import { ToRubles, ellipsis } from "../../../../lib/services";
import SellerData from "../data/SellersData";
import axios from "axios";


function Sellers({sellers}) {

  function test() {
    console.log(sellers.posts)
  }

  if (sellers.posts.length == 0) {
    return (
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_content">
          <div className="notInfContainer">
            <div className="notInf__title">Здесь будут ваши избранные продавцы</div>
            <p className="notInf__subtitle">Подпишитесь на продавца, чтобы видеть больше его объявлений</p>
            <img className="notInf__img" src="/accountImage/SellerNone.png"></img>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="clientPage__container_bottom">
      <button onClick={test}>Test</button>
       <div className="clientPage__container_content">
        <div className="sellersWrapper small">
          {sellers.posts.map((seller) => {
            return (
              <div key={seller.user_id} className="sellersContainer">
                <div className="sellersUser">
                  <div className="sellersUserBlock">
                    <img src={`${seller.user_photo}?${seller.user_id}`} />
                    <div className="sellersUserInfo">
                      <div className="sellersUserName">{seller.user_name}</div>
                      <div className="sellersOffersCount light">{seller.offers.length} объявлений</div>
                    </div>
                  </div>
                  <button className="buttonGrey">Отписаться</button>
                </div>
                {/* <div className="sellersOffers">
                  {seller.offers.map((offer) => {
                    return (
                      <div className="sellersOffer">
                        <img src={`${offer.offerImg}?${offer.id}`} />
                        <div>{ellipsis(ToRubles(offer.price), 15)}</div>
                        <div>{ellipsis(offer.offerName, 10)}</div>
                      </div>
                    );
                  })}
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sellers;
