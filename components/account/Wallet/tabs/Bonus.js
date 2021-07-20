import React from "react";
import { ToRubles, ellipsis } from "../../../../lib/services";

function Bonus(data) {
  if (data.data.lenght == 0) {
    return (
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_content">
          <div className="notInfContainer">
            <div className="notInf__title">Здесь буду ваши бонусные рубли</div>
            <p className="notInf__subtitle">Текст</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="walletStoryContainer">
      <div className="walletStoryTitles megaDark">
        <div>Дата</div>
        <div className="walletStoryTime">Время</div>
        <div>Описание</div>
        <div className="walletBonusAlign">Сумма</div>
        <div>Бонусы</div>
      </div>
      {data.data.map((data) => {
        return (
          <div key={data.id} className="walletStoryItem thin">
            <div>{data.date}</div>
            <div className="walletStoryTimeItem">{data.time}</div>
            <div>{ellipsis(data.describe, 30)}</div>
            <div className="walletBonusAlign">{ToRubles(data.sum)}</div>
            <div>{ToRubles(data.bonus)}</div>
          </div>
        );
      })}
      <div className="walletBonusSum">
        <div></div>
        <div></div>
        <div></div>
        <div className="walletBonusAlign">Всего бонусов</div>
        <div>564645</div>
      </div>
    </div>
  );
}
export default Bonus;
