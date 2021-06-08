import React from 'react'
import {ToRubles, ellipsis} from '../../../services';

function Sellers(data) {
    return (
 <div className="clientPage__container_bottom">
      <div className="clientPage__container_content">
         <div className="sellersWrapper small">
            {data.sellers.map(seller => {
               return (
                  <div key={seller.id} className="sellersContainer">
                     <div className="sellersUser">
                        <div className="sellersUserBlock">
                           <img src={`${seller.sellerPic}?${seller.id}`} />
                           <div className="sellersUserInfo">
                              <div className="sellersUserName">
                                 {seller.sellerName}
                              </div>
                              <div className="sellersOffersCount light">
                                 {seller.offers.length} объявлений
                              </div>
                           </div>
                        </div>
                        <button className="buttonGrey">Отписаться</button>
                     </div>
                     <div className="sellersOffers">

                        {seller.offers.map(offer => {
                           return (
                              <div className="sellersOffer">
                                 <img src={`${offer.offerImg}?${offer.id}`} />
                                 <div>{ellipsis(ToRubles(offer.price), 15)}</div>
                                 <div>{ellipsis(offer.offerName, 10)}</div>
                              </div>
                           )
                        })}
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   </div>
    )
}

export default Sellers
