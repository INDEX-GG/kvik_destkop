import React from 'react';
import { ToRubles } from '../../../services';

function Wait(data) {
    const waitOffersBox = data.offers.filter(offer => offer.status === 1)
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
         {waitOffersBox.map(offer => {
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
                     <div className="offerWaitCause megaLight">Отклонено</div>
                  </div>
                  <div className="offerDescription">
                     <div className="offerDescriptionTop">
                        <div className="offerDTLeft thin">
                           <div>{ToRubles(offer.price)}</div>
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
                        </div>
                     </div>
                     <div className="offerDescriptionBottom">

                        <div className="offerCauses small thin error">
                           <span className="light">Причина отклонения: </span>{offer.cause}
                        </div>

                        <div className="thin">
                           Будет удалено навсегда через 30 дней
               </div>

                        <div className="thin light small DatPub__mobile">
                          <span>Дата последнего редактирования:</span>  {offer.date}
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
export default Wait;