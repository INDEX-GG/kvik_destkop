import React from "react";
import { ToRubles } from "../../../../lib/services";
import EmptyPlaceholder from "../../../EmptyPlaceholder";

function Purch(data) {
  if (data.deals.lenght !== 0) {
    return (
	  <EmptyPlaceholder title='Здесь буду ваши Покупки' subtitle='Текст' />
    );
  }

  const purchDealsBox = data.deals.filter((deal) => deal.status === 1);
  return purchDealsBox.map((deal) => {
    return (
      <div key={deal.id} className="dealContainer boxWrapper">
        <div className="dealImage">
          <img src={deal.img} />
          <div className="dealWaitCause megaLight">Доставлено в пункт выдачи</div>
        </div>
        <div className="dealDescription">
          <div className="dealDescriptionTop">
            <div className="dealDTLeft thin">
              <div>{ToRubles(deal.price)}</div>
              <div className="dealTitle">{deal.title}</div>
              <div className="thin light small DatPub__mobile">
                <span className="offerDate-sales">Дата осуществления сделки: </span>
                {deal.date}
              </div>
            </div>
            <div className="dealDTRight">
              <a className="thin highlight">Отменить сделку</a>
              <a className="thin highlight">Открыть спор</a>
              <a className="thin highlight">Детали спора</a>
            </div>
          </div>
          <div style={{visibility: 'hidden'}} className="dealDescriptionBottom">
            <button className="dealButtonViews button contained">Подтвердить получение посылки</button>
          </div>
        </div>
      </div>
    );
  });
}

export default Purch;
