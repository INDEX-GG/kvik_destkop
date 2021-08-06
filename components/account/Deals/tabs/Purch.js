import React from "react";
import { ToRubles } from "../../../../lib/services";

function Purch(data) {
  if (data.deals.lenght == 0) {
    return (
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_content">
          <div className="notInfContainer">
            <div className="notInf__title">Здесь буду ваши Покупки</div>
            <p className="notInf__subtitle">Текст</p>
          </div>
        </div>
      </div>
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
          <div className="dealDescriptionBottom">
            <button className="dealButtonViews button contained">Подтвердить получение посылки</button>
          </div>
        </div>
      </div>
    );
  });
}

export default Purch;
