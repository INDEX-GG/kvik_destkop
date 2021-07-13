import React from "react";
import { ToRubles } from "../../../../lib/services";

function Story(data) {
  if (data.data.lenght == 0) {
    return (
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_content">
          <div className="notInfContainer">
            <div className="notInf__title">Здесь буду ваши платежные операции</div>
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
        <div>Время</div>
        <div>Описание</div>
        <div>Сумма</div>
      </div>
      {data.data.map((data) => {
        return (
          <div key={data.id} className="walletStoryItem thin">
            <div>{data.date}</div>
            <div>{data.time}</div>
            <div>{data.describe}</div>
            <div>{ToRubles(data.sum)}</div>
          </div>
        );
      })}
    </div>
  );
}
export default Story;
