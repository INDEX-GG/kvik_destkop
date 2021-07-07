import React from 'react';
import { ToRubles, ToFullDate } from '../../../../lib/services';
import Link from 'next/link';

function Active(data) {
   let activeOffersBox;
   data.offers.filter == undefined ? '' : activeOffersBox = data.offers.filter(offer => offer.verify === 0) 
   return (
      <div className="clientPage__container_bottom">
         <div className="clientPage__container_nav__radio">
            <label className="checkbox">
               <input type="checkbox" />
               <div className="checkbox__text"></div>
            </label>
            <a>Снять с публикации</a>
         </div>
         <div className="clientPage__container_content">
            {activeOffersBox == undefined ? '' : activeOffersBox.map(offer => {

               return (
                  <Link href={`/product/${offer.id}`} >
                  <div key={offer.id} className="offerContainer boxWrapper">
                     <div className="offerImage">
                        <div className="offerPubCheck">
                           <label className="checkbox">
                              <input type="checkbox" />
                              <div className="checkbox__text"></div>
                           </label>
                        </div>
                        {JSON.parse(offer.photo).photos.slice(0, 1).map((imgs) => {
                           return (
                              <img src={imgs} />
                           )
                        })}
                     </div>
                     <div className="offerDescription">
                        <div className="offerDescriptionTop">
                           <div className="offerDTLeft thin">
                              <div>{ToRubles(offer.price)}</div>
                              <div className="offerTitle">{offer.title}</div>
                              <div className="offerDatPub small light DatPub__mobile"><span> Дата публикации </span>{ToFullDate(offer.created_at)}</div>
                              <div>Осталось 30 дней</div>
                           </div>
                           <div className="offerDTRight">
                              <a className="offerEdit thin superLight editIcon">
                                 Редактировать
                              </a>
                              <a className="offerUnpublish thin superLight">
                                 Снять с публикации
                              </a>
                              <div className="offerSocialCount">
                                 <div className="offerShowes showesIcon">0 +0</div>
                                 <div className="offerAddFavores likeIcon">0 +0</div>
                              </div>
                           </div>
                        </div>
                        <div className="offerDescriptionBottom">
                           <button className="offerButtonViews button contained">Увеличить просмотры</button>
                        </div>
                     </div>
                  </div>
                  </Link>
               )
          })}
        
         </div>
      </div>
   )
}
export default Active;