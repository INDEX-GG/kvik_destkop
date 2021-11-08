import React from "react";
import EmptyPlaceholder from "../../../EmptyPlaceholder";

function Notifs(data) {
  if (data.data.length === 0) {
    return (
	  <EmptyPlaceholder
	  title='Здесь буду ваши уведомления'
	  // subtitle='Текст'
	  />
    );
  }
  return (
    <div className="clientPage__container_content">
      <div className="notifWrapper">
        {data.data.map((item) => {
          return (
            <div key={item.id} className="notifContainer">
              <div>{item.date}</div>
              <div>{item.mess}</div>
              <div className="notifDate">{item.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notifs;
