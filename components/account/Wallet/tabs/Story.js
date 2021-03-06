import React from "react";
import { ToRubles } from "../../../../lib/services";
import EmptyPlaceholder from "../../../EmptyPlaceholder";

function Story(data) {
  if (data.data.length !== 0) {
    return (
	  <EmptyPlaceholder
	  title='Здесь буду ваши платежные операции'
	  subtitle='Текст'/>
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
