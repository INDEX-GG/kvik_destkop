import React, { useState } from 'react';
import Balance from './tabs/Balance';
import Story from './tabs/Story';
import Bonus from './tabs/Bonus';

//Баланс кошелька
const balance = 3454322;

// История операций, Бонусные рубли 
const data = [
   { id: 1, date: '00.00.00', time: '00:00', describe: 'Пополнение кошелька', sum: 23.2, bonus: 3324 },
   { id: 2, date: '00.00.00', time: '00:00', describe: 'Оплата услуг продвижения', sum: 223.2, bonus: 332 },
   { id: 3, date: '00.00.00', time: '00:00', describe: 'Подключение тарифного плана (название)', sum: 234.52, bonus: 324 },
   { id: 4, date: '00.00.00', time: '00:00', describe: 'Автоматическое продление тарифного плана (название)', sum: 2443.2, bonus: 334 },
   { id: 5, date: '00.00.00', time: '00:00', describe: 'Пополнение кошелька', sum: 24543.2, bonus: 3 },
   { id: 6, date: '00.00.00', time: '00:00', describe: 'Пополнение кошелька', sum: 2123.2, bonus: 31324 },
   { id: 7, date: '00.00.00', time: '00:00', describe: 'Пополнение кошелька', sum: 1223.2, bonus: 334 },
   { id: 8, date: '00.00.00', time: '00:00', describe: 'Автоматическое продление тарифного плана (название)', sum: 9923.2, bonus: 34 },
   { id: 9, date: '00.00.00', time: '00:00', describe: 'Пополнение кошелька', sum: 32423.2, bonus: 332674 },
   { id: 10, date: '00.00.00', time: '00:00', describe: 'Пополнение кошелька', sum: 423.2, bonus: 4 },
   { id: 11, date: '00.00.00', time: '00:00', describe: 'Автоматическое продление тарифного плана (название)', sum: 2.2, bonus: 34 },
   { id: 12, date: '00.00.00', time: '00:00', describe: 'Пополнение кошелька', sum: 223.2, bonus: 334 },
   { id: 13, date: '00.00.00', time: '00:00', describe: 'Автоматическое продление тарифного плана (название)', sum: 5523.2, bonus: 334 },
   { id: 14, date: '00.00.00', time: '00:00', describe: 'Подключение тарифного плана (название)', sum: 8923.2, bonus: 24 },
   { id: 15, date: '00.00.00', time: '00:00', describe: 'Пополнение кошелька', sum: 523.2, bonus: 9 },
   { id: 16, date: '00.00.00', time: '00:00', describe: 'Подключение тарифного плана (название)', sum: 423.2, bonus: 3 },
   { id: 17, date: '00.00.00', time: '00:00', describe: 'Пополнение кошелька', sum: 3.2, bonus: 33 },
];

const navItems = [
   { id: 1, title: 'Баланс кошелька', content: <Balance balance={balance} /> },
   { id: 2, title: 'История операций', content: <Story data={data} /> },
   { id: 3, title: 'Бонусные рубли', content: <Bonus data={data} /> }
]

const Wallet = () => {

   const [itemNav, setItemNav] = useState({ i: 1, ttl: 'Баланс кошелька' });

   return (
      <>
      <div className="clientPage__container_top">
         <div className="clientPage__container_nav__wrapper">
            <div className="clientPage__container_nav">
            {navItems.map(item => {
               return (
                  <a key={item.id} className={(itemNav.i === item.id) ? ('navActive') : ('')} key={item.id} onClick={() => setItemNav({ i: item.id, ttl: item.title })}>{item.title}</a>
               )
            })}
            </div>
         </div>
      </div>
         {navItems.map(item => {
            return (
               (itemNav.i === item.id) && (<div key={item.id} className="clientPage__container_content">{item.content}</div>)
            )
         })}
      </>
   )
}
export default Wallet;