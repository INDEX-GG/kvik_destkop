import React, { useState } from 'react';
import { brooklyn } from '../../../lib/services';
import Loading from '../../../UI/icons/Loader';
import RejectedAdmin from './tabs/RejectedAdmin';
import WaitingAdmin from './tabs/WaitingAdmin';
import axios from "axios";

const RejecteBox = [
   { id: 1, imgs: ['https://source.unsplash.com/random?interior', 'https://source.unsplash.com/random?car', 'https://source.unsplash.com/random'], title: '2-комн. кваритра, 95 м', price: 3000000, date: '00.00.00', username: 'Ну прямо очень весьма и весьма длинное имя', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Центральный административный округ, Москва', description: 'Продам на длительный срок 2-комнатную квартиру в центре города с мебелью. Хорошая квартира, уютная и светлая, расположение дома на второй линии от дороги-нет шума машин.Бытовая техника есть, балкон застеклен, комнаты смежные. Установлены евроокна, современные радиаторы, межкомнатные двери, балкончик застеклен.Продам на длительный срок 2-комнатную квартиру в центре города с мебелью. Хорошая квартира, уютная и светлая, расположение дома на второй линии от дороги-нет шума машин. Бытовая техника есть, балкон застеклен, комнаты смежные.  Установлены евроокна, современные радиаторы, межкомнатные двери, балкончик застеклен. Квартира оснащена кухонным гарнитуром. Окна выходят во двор. Хорошая квартира, уютная и светлая, расположение дома на второй линии, тихий двор.', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }, { category: "Категория5" }] },
   { id: 2, imgs: ['https://source.unsplash.com/random?dog', 'https://source.unsplash.com/random?moto'], title: 'Mitsubishi Delica', price: 199999, date: '00.00.00', username: 'Стивен Фрай', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Лондон', description: 'Продам на длительный срок 2-комнатную квартиру в центре города с мебелью. Хорошая квартира, уютная и светлая, расположение дома на второй линии от дороги-нет шума машин.', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }] },
   { id: 3, imgs: ['https://source.unsplash.com/random?phone', 'https://source.unsplash.com/random?house'], title: 'Samsung Galaxy S21 Ultra', price: 99999, date: '00.00.00', username: 'Алекс Ф.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Санкт-Петербург', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }, { category: "Категория5" }] },
   { id: 4, imgs: ['https://source.unsplash.com/random?table', 'https://source.unsplash.com/random?interior'], title: 'Холодильник для пивка', price: 78500, date: '00.00.00', username: 'Мо', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Спрингфилд', categorys: [{ category: "Категория1" }, { category: "Категория2" }] },
   { id: 5, imgs: ['https://source.unsplash.com/random?interior', 'https://source.unsplash.com/random?interior'], title: 'Пивко', price: 59.5, date: '00.00.00', username: 'Гомер С.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Спрингфилд', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }, { category: "Категория5" }] },
   { id: 6, imgs: ['https://source.unsplash.com/random?interior', 'https://source.unsplash.com/random?interior'], title: 'Кот', price: 999.95, date: '00.00.00', username: 'Леопольд Д.Ж.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Саратов', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }, { category: "Категория5" }] },
   { id: 8, imgs: ['https://source.unsplash.com/random?interior', 'https://source.unsplash.com/random?interior'], title: 'Корабль', price: 9992234453422, date: '00.00.00', username: 'Суэц К.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Гиза', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }, { category: "Категория5" }] },
   { id: 9, imgs: ['https://source.unsplash.com/random?interior', 'https://source.unsplash.com/random?interior'], title: 'Колеса', price: 34921.22, date: '00.00.00', username: 'Доминик Т.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Куба', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }, { category: "Категория5" }] },
];

const WaitingBox = [
   { id: 1, imgs: ['https://source.unsplash.com/random?phone', 'https://source.unsplash.com/random?dog'], title: '2-комн. кваритра, 95 м', price: 3000000, date: '00.00.00', username: 'Ну прямо очень весьма и весьма длинное имя', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Центральный административный округ, Москва', description: 'Продам на длительный срок 2-комнатную квартиру в центре города с мебелью. Хорошая квартира, уютная и светлая, расположение дома на второй линии от дороги-нет шума машин.Бытовая техника есть, балкон застеклен, комнаты смежные. Установлены евроокна, современные радиаторы, межкомнатные двери, балкончик застеклен.Продам на длительный срок 2-комнатную квартиру в центре города с мебелью. Хорошая квартира, уютная и светлая, расположение дома на второй линии от дороги-нет шума машин. Бытовая техника есть, балкон застеклен, комнаты смежные.  Установлены евроокна, современные радиаторы, межкомнатные двери, балкончик застеклен. Квартира оснащена кухонным гарнитуром. Окна выходят во двор. Хорошая квартира, уютная и светлая, расположение дома на второй линии, тихий двор.', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }, { category: "Категория5" }] },
   { id: 2, imgs: ['https://source.unsplash.com/random?table', 'https://source.unsplash.com/random?bus', 'https://source.unsplash.com/random'], title: 'Mitsubishi Delica', price: 199999, date: '00.00.00', username: 'Стивен Фрай', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Лондон', description: 'Продам на длительный срок 2-комнатную квартиру в центре города с мебелью. Хорошая квартира, уютная и светлая, расположение дома на второй линии от дороги-нет шума машин.', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }] },
   { id: 3, imgs: ['https://source.unsplash.com/random?dog', 'https://source.unsplash.com/random?foot'], title: 'Samsung Galaxy S21 Ultra', price: 99999, date: '00.00.00', username: 'Алекс Ф.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Санкт-Петербург', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }, { category: "Категория5" }] },
   { id: 4, imgs: ['https://source.unsplash.com/random?moto', 'https://source.unsplash.com/random?car'], title: 'Холодильник для пивка', price: 78500, date: '00.00.00', username: 'Мо', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Спрингфилд', categorys: [{ category: "Категория1" }, { category: "Категория2" }] },
   { id: 5, imgs: ['https://source.unsplash.com/random?car', 'https://source.unsplash.com/random?car'], title: 'Пивко', price: 59.5, date: '00.00.00', username: 'Гомер С.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Спрингфилд', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }, { category: "Категория5" }] },
   { id: 6, imgs: ['https://source.unsplash.com/random?cat', 'https://source.unsplash.com/random?car'], title: 'Кот', price: 999.95, date: '00.00.00', username: 'Леопольд Д.Ж.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Саратов', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }, { category: "Категория5" }] },
   { id: 8, imgs: ['https://source.unsplash.com/random?interior', 'https://source.unsplash.com/random?car'], title: 'Корабль', price: 9992234453422, date: '00.00.00', username: 'Суэц К.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Гиза', categorys: [{ category: "Категория1" }, { category: "Категория2" }, { category: "Категория3" }, { category: "Категория4" }, { category: "Категория5" }] },
];


const navItems = [
   { id: 1, title: 'Ждут одобрения', content: < WaitingAdmin offers={WaitingBox} />, count: WaitingBox.length },
   { id: 2, title: 'Отклоненные', content: <RejectedAdmin offers={RejecteBox} />, count: RejecteBox.length }
];

export const Ads = () => {

   const [itemNav, setItemNav] = useState({ i: 1, ttl: 'Объявления' });

   React.useEffect( () => {
      axios.post(`/api/getPostsModerator`, {
         "page_limit": 20, 
         "last_post_id": 0
      })
      .then((responce) => console.log(responce))
   },[])

   return (
      <>
         <div className="clientPage__container_top">
            <div className="clientPage__container_nav__wrapper">
               <div className="clientPage__container_nav" >
                  {navItems.map(item => {
                     return (
                        <a key={item.Itemid} className={(itemNav.i === item.id) ? ('navActive') : ('')} onClick={() => setItemNav({ i: item.id, ttl: item.title })} >{item.title} {brooklyn(item.count)}</a>
                     )
                  })}
               </div>
            </div>
         </div>
         {navItems.map(item => {
            return (
               (itemNav.i === item.id) && (item.content ? item.content : (<div key={item.id} className="userPageContentCompare"><Loading /> </div>))
            )
         })}
      </>
   )
}


