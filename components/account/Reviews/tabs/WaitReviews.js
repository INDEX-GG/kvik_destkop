import React from 'react';
import { ToRubles } from '../../../../lib/services';

function WaitReviews(data) {
   return (
      <div className="clientPage__container_bottom">
         <div className="clientPage__container_nav__radio">
            <label className="checkbox">
               <input type="checkbox" />
               <div className="checkbox__text"></div>
            </label>
            <a>Удалить</a>
         </div>
         <div className="clientPage__container_content">
            <div className="reviewsContainerWrapper">
               {data.data.map(offer => {
                  return (
                     <div className="reviewsContainer boxWrapper">
                        <div className="reviewsImage">
                           <div className="reviewsPubCheck">
                              <label className="checkbox">
                                 <input type="checkbox" />
                                 <div className="checkbox__text"></div>
                              </label>
                           </div>
                           <img src={`${offer.img}?${offer.id}`} />
                        </div>
                        <div className="reviewsDescription">
                           <div className="reviewsUserBlock small">
                              <div>
                                 <div>{offer.username}</div>
                                 <div className="light DatPub__mobile"> <span> Дата публикации </span>{offer.date}</div>
                              </div>
                              <img className="reviewsUserpic" src={`${offer.userpic}?${offer.id}`} />
                           </div>
                           <div className="reviewsMiddle">
                              <div>{ToRubles(offer.price)}</div>
                              <div>{offer.title}</div>
                              <div className="thin small light">{offer.locality}</div>
                           </div>
                           <a className="buttonGrey small reviewsButton">
                              Оставить отзыв
                           </a>
                        </div>
                     </div>
                  )
               })}</div>
         </div>
      </div>
   )
}

export default WaitReviews