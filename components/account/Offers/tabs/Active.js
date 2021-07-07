import React from 'react';
import { ToRubles, ToFullDate } from '../../../../lib/services';

function Active(data) {
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
            {data.offers?.map(offer => {
               return (
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
               )
          })}
        
         </div>
      </div>
   )
}
export default Active;