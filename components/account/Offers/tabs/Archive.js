import React from 'react'
import { ToRubles } from '../../../../lib/services';

function Archive(data) {
   const archiveOffersBox = data.offers.filter(offer => offer.status === 2)
   return (
      <div className="clientPage__container_bottom">
         <div className="clientPage__container_nav__radio">
            <label className="checkbox">
               <input type="checkbox" />
               <div className="checkbox__text"></div>
            </label>
            <a>Активировать</a>
            <a>Удалить</a>
         </div>
         <div className="clientPage__container_content">
            {archiveOffersBox.map(offer => {
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
                        <div className="offerWaitCause megaLight">Продано</div>
                     </div>
                     <div className="offerDescription">
                        <div className="offerDescriptionTop">
                           <div className="offerDTLeft thin">

                              <>{ToRubles(offer.price)}</>
                              <div className="offerTitle">{offer.title}</div>
                           </div>
                           <div className="offerDTRight">
                              <a className="offerActivate thin superLight checkMarkIcon">
                                 Активировать
                              </a>
                              <a className="offerEdit thin superLight editIcon">
                                 Редактировать
                              </a>
                              <a className="offerDelete thin superLight binIcon">
                                 Удалить
                              </a>
                              <div className="offerSocialCount">
                                 <div className="offerShowes showesIcon">0 +0</div>
                                 <div className="offerAddFavores likeIcon">0 +0</div>
                              </div>
                           </div>
                        </div>
                        <div className="offerDescriptionBottom">

                           <div className="thin light small DatPub__mobile">
                              <span> Дата последнего редактирования:</span> {offer.date}
                           </div>
                        </div>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}
export default Archive;