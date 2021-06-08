import React from 'react';
import { ToRubles, ellipsis } from '../../../services';


function Bonus(data) {
    return (
    <div className="walletStoryContainer">
        <div className="walletStoryTitles megaDark">
           <div>Дата</div>
           <div>Время</div>
           <div>Описание</div>
           <div className="walletBonusAlign">Сумма</div>
           <div>Бонусы</div>
        </div>
        {data.data.map(data => {
           return (
              <div key={data.id} className="walletStoryItem thin">
                 <div>{data.date}</div>
                 <div>{data.time}</div>
                 <div>{ellipsis(data.describe, 30)}</div>
                 <div className="walletBonusAlign">{ToRubles(data.sum)}</div>
                 <div>{ToRubles(data.bonus)}</div>
              </div>
           )
        })}
        <div className="walletBonusSum">
           <div></div>
           <div></div>
           <div></div>
           <div className="walletBonusAlign">Всего бонусов</div>
           <div>564645</div>
        </div>
     </div>
    )
}
export default Bonus;