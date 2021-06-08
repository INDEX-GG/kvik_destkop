import React from 'react';

function Pushes() {
    function settingsNotif(title, subtitle) {
        return (
           <div>
              <div>
                 <div className="large thin">{title}</div>
                 <div className="light thin">{subtitle}</div>
              </div>
              <div> <label className="checkbox">
                 <input type="checkbox" />
                 <div className="checkbox__text">Сайт</div>
              </label></div>
              <div> <label className="checkbox">
                 <input type="checkbox" />
                 <div className="checkbox__text">E-mail</div>
              </label></div>     
           </div>
        )
     }
    return (
    <div className="clientPage__container_bottom">
        <div className="clientPage__container_content">
           <div className="settingsNotifWrapper">
              {settingsNotif('Сообщения', 'Уведомления о новых сообщениях')}
              {settingsNotif('Новости', 'Уведомления о главных событиях и новинках сайта')}
              {settingsNotif('Акции', 'Уведомления о скидках и спецпредложениях')}
              {settingsNotif('Избранные продавцы', 'Уведомления о новых объявлениях избранных продавцов')}
              {settingsNotif('Безопасная сделка', 'Уведомления о статусах заказов по безопасным сделкам')}
           </div>
        </div>
     </div>
    )
}

export default Pushes;
