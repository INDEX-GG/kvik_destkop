import React from "react";
import { ToRubles, ellipsis } from "../../../../lib/services";


import { useSubList } from "../../../../hooks/useSubscriptions"
import { useAd } from "../../../../hooks/useAd";
import router from "next/router";
import SellerData from "../data/SellersData";


function Sellers(data) {

  // const {subList} = useSubList(router.query.id)
  // console.log(subList)
  const data1 = SellerData()

  console.log(data1)

  if (data.sellers.lenght == 0) {
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
      <div className="clientPage__container_content">
        <div className="sellersWrapper small">
          {data.sellers.map((seller) => {
            return (
              <div key={seller.id} className="sellersContainer">
                <div className="sellersUser">
                  <div className="sellersUserBlock">
                    <img src={`${seller.sellerPic}?${seller.id}`} />
                    <div className="sellersUserInfo">
                      <div className="sellersUserName">{seller.sellerName}</div>
                      <div className="sellersOffersCount light">{seller.offers.length} объявлений</div>
                    </div>
                  </div>
                  <button className="buttonGrey">Отписаться</button>
                </div>
                <div className="sellersOffers">
                  {seller.offers.map((offer) => {
                    return (
                      <div className="sellersOffer">
                        <img src={`${offer.offerImg}?${offer.id}`} />
                        <div>{ellipsis(ToRubles(offer.price), 15)}</div>
                        <div>{ellipsis(offer.offerName, 10)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sellers;
