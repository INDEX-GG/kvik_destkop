import React from "react";

function Notifs(data) {
  if (data.data.lenght == 0) {
    return (
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_content">
          <div className="notInfContainer">
            <div className="notInf__title">Здесь буду ваши уведомления</div>
            <p className="notInf__subtitle">Текст</p>
          </div>
        </div>
      </div>
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
