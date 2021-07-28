import React, { useEffect } from "react";
import { ToRubles, ellipsis } from "../../../../lib/services";


function Sellers({sellers, sellerSub}) {

  if (sellers?.message) {
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
          {sellers?.map((seller) => {
            return (
              <div key={seller.id} className="sellersContainer">
                <div className="sellersUser">
                  <div className="sellersUserBlock">
                    <img src={`${seller.userPhoto}?${seller.id}`} />
                    <div className="sellersUserInfo">
                      <div className="sellersUserName">{seller.name}</div>
                       <div className="sellersOffersCount light">{seller.poducts.length} объявлений</div>
                    </div>
                  </div>
                  <button onClick={() => sellerSub(58, seller.id)} className="buttonGrey">Отписаться</button>
                </div>
                  <div className="sellersOffers">
                  {seller.poducts.map((offer, i) => {
                    return (
                      <div key={i} className="sellersOffer">
                        <img src={`${JSON.parse(offer.photo).photos[0]}?${offer.id}`} />
                        <div>{ellipsis(ToRubles(offer.price), 15)}</div>
                        <div>{ellipsis(offer.title, 10)}</div>
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
