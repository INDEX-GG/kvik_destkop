import React, { useState } from 'react';
import Sales from './tabs/Sales';
import Purch from './tabs/Purch';
import { brooklyn } from '../../../lib/services';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const DealsBox = [
   { id: 1, img: 'https://source.unsplash.com/random?interior', title: '2-комн. кваритра, 95 м', price: 3000000, date: '00.00.00 00.00', status: 1 },
   { id: 2, img: 'https://source.unsplash.com/random?cars', title: 'Mitsubishi Delica', price: 199999, date: '00.00.00 00.00', status: 0 },
   { id: 3, img: 'https://source.unsplash.com/random?phone', title: 'Samsung Galaxy S21 Ultra', price: 99999, date: '00.00.00 00.00', status: 1 },
   { id: 4, img: 'https://source.unsplash.com/random?fridge', title: 'Холодильник для пивка', price: 78500, date: '00.00.00 00.00', status: 1 },
   { id: 5, img: 'https://source.unsplash.com/random?beer', title: 'Пивко', price: 59.5, date: '00.00.00 00.00', status: 0 },
   { id: 6, img: 'https://source.unsplash.com/random?cat', title: 'Кот', price: 999.95, date: '00.00.00 00.00', status: 1 },
   { id: 7, img: 'https://source.unsplash.com/random?ship', title: 'Корабль', price: 9992234453422, date: '00.00.00 00.00', status: 1 },
   { id: 8, img: 'https://source.unsplash.com/random?wheels', title: 'Колеса', price: 34921.22, date: '00.00.00 00.00', status: 0 },
   { id: 9, img: 'https://source.unsplash.com/random?elephant', title: 'Слон', price: 100500, date: '00.00.00 00.00', status: 0 },
   { id: 10, img: 'https://source.unsplash.com/random?starship', title: 'Сокол Тысячелетия', price: 1000000000000, date: '00.00.00 00.00', status: 0 },
   { id: 11, img: 'https://source.unsplash.com/random?book', title: 'Книга', price: 100, date: '00.00.00 00.00', status: 1 },
   { id: 12, img: 'https://source.unsplash.com/random?island', title: 'Остров', price: 74347533, date: '00.00.00 00.00', status: 0 },
   { id: 13, img: 'https://source.unsplash.com/random?scyscraper', title: 'Небоскрёб', price: 777777777777, date: '00.00.00 00.00', status: 1 },
   { id: 14, img: 'https://source.unsplash.com/random?salt', title: 'Соль', price: 0.22, date: '00.00.00 00.00', status: 0 },
];

// Продажи
const salesDealsBox = DealsBox.filter(deal => deal.status === 0)

// Покупки
const purchDealsBox = DealsBox.filter(deal => deal.status === 1)

// Пагинация
const navItems = [
   { id: 1, title: 'Продажи', content: <Sales deals={DealsBox}/>, count: salesDealsBox.length },
   { id: 2, title: 'Покупки', content: <Purch deals={DealsBox}/>, count: purchDealsBox.length },
];

const Deals = () => {

   const [itemNav, setItemNav] = useState({ i: 1, ttl: 'Продажи' });
   const router = useRouter()

   useEffect(() => {
    if (router) {
      if (router.query.content != undefined) {
        if (+router.query.content - 1 != 2) {
         setItemNav({i: +router.query.content, ttl: navItems[+router.query.content - 1].title})
        }
      }
    }
  }, [router])



   return (
      <>
      <div className="clientPage__container_bottom">
         <div className="clientPage__container_nav__wrapper">
            <div className="clientPage__container_nav">
            {navItems.map(item => {
               return (
                  <a key={item.id} className={(itemNav.i === item.id) ? ('navActive') : ('')} key={item.id} onClick={() => {
                     setItemNav({ i: item.id, ttl: item.title }
                  )}}>{item.title} {brooklyn(item.count)}</a>
               )
            })}
            </div>
         </div>
     
         {navItems.map(item => {
            return (
               (itemNav.i === item.id) && (<div key={item.id} className="clientPage__container_content">{item.content}</div>)
            )
         })}
          </div>
      </>
   )
}
export default Deals;