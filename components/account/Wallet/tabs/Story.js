import React from 'react';
import { ToRubles } from '../../../../lib/services';

function Story(data) {
   return (
      <div className="walletStoryContainer">
         <div className="walletStoryTitles megaDark">
            <div>Дата</div>
            <div>Время</div>
            <div>Описание</div>
            <div>Сумма</div>
         </div>
         {data.data.map(data => {
            return (
               <div key={data.id} className="walletStoryItem thin">
                  <div>{data.date}</div>
                  <div>{data.time}</div>
                  <div>{data.describe}</div>
                  <div>{ToRubles(data.sum)}</div>
               </div>
            )
         })}
      </div>
   )
}
export default Story;