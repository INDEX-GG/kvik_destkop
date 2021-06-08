import React from 'react';
import { ToRubles } from '../../../services';

function Active(data) {
    const activeOffersBox = data.offers.filter(offer => offer.status === 0)
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
         {activeOffersBox.map(offer => {
            return (
               <div key={offer.id} className="offerContainer boxWrapper">
                  <div className="offerImage">
                     <div className="offerPubCheck">
                        <label className="checkbox">
                           <input type="checkbox" />
                           <div className="checkbox__text"></div>
                        </label>
                     </div>
                     <img src={offer.img} />
                  </div>
                  <div className="offerDescription">
                     <div className="offerDescriptionTop">
                        <div className="offerDTLeft thin">
                           <div>{ToRubles(offer.price)}</div>
                           <div className="offerTitle">{offer.title}</div>
                           <div className="offerDatPub small light DatPub__mobile"><span> Дата публикации </span>{offer.date}</div>
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