import React from 'react';
import {ToRubles} from '../../../services';

function Sales(data) {
    const salesDealsBox = data.deals.filter(deal => deal.status === 0)
    return (
        salesDealsBox.map(deal => {
            return (
               <div key={deal.id} className="dealContainer boxWrapper">
                  <div className="dealImage">
         
                     <img src={deal.img} />
                     <div className="dealWaitCause megaLight">Завершено</div>
                  </div>
                  <div className="dealDescription">
                     <div className="dealDescriptionTop">
                        <div className="dealDTLeft thin">
                           <div>{ToRubles(deal.price)}</div>
                           <div className="dealTitle">{deal.title}</div>
                           <div className="thin light small DatPub__mobile">
                              <span>Дата осуществления сделки: </span>{deal.date}
                           </div>
         
                        </div>
                        <div className="dealDTRight">
                           <a className="thin highlight">
                              Отменить сделку
                           </a>
                           <a className="thin highlight">
                              Открыть спор
                           </a>
                           <a className="thin highlight">
                              Детали спора
                           </a>
                        </div>
                     </div>
                     <div className="dealDescriptionBottom">
                        <button className="button contained dealButtonViews">Получить деньги</button>
                     </div>
                  </div>
               </div>
            )
         })
    )
}

export default Sales
