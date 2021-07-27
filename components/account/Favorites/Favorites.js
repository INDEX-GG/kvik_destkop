import React, { useEffect, useState } from 'react';
import Offers from './tabs/Offers';
import Searches from './tabs/Searches';
import Sellers from './tabs/Sellers';
import axios from 'axios';
import { useFavorits } from '../../../hooks/useFavorits';
import { brooklyn } from '../../../lib/services';
import { useSubList } from '../../../hooks/useSubscriptions';

import { useAuth } from '../../../lib/Context/AuthCTX';
import FavProvider from '../../../lib/Context/FavoritesCTX';
// Объявления
// const OffersBox = [
//    { id: 1, img: 'https://source.unsplash.com/random?interior', title: '2-комн. кваритра, 95 м', price: 3000000, date: '00.00.00', username: 'Ну прямо очень весьма и весьма длинное имя', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Центральный административный округ, Москва' },
//    { id: 2, img: 'https://source.unsplash.com/random?cars', title: 'Mitsubishi Delica', price: 199999, date: '00.00.00', username: 'Стивен Фрай', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Лондон' },
//    { id: 3, img: 'https://source.unsplash.com/random?phone', title: 'Samsung Galaxy S21 Ultra', price: 99999, date: '00.00.00', username: 'Алекс Ф.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Санкт-Петербург' },
//    { id: 4, img: 'https://source.unsplash.com/random?fridge', title: 'Холодильник для пивка', price: 78500, date: '00.00.00', username: 'Мо', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Спрингфилд' },
//    { id: 5, img: 'https://source.unsplash.com/random?beer', title: 'Пивко', price: 59.5, date: '00.00.00', username: 'Гомер С.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Спрингфилд' },
//    { id: 6, img: 'https://source.unsplash.com/random?cat', title: 'Кот', price: 999.95, date: '00.00.00', username: 'Леопольд Д.Ж.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Саратов' },
//    { id: 8, img: 'https://source.unsplash.com/random?ship', title: 'Корабль', price: 9992234453422, date: '00.00.00', username: 'Суэц К.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Гиза' },
//    { id: 9, img: 'https://source.unsplash.com/random?wheels', title: 'Колеса', price: 34921.22, date: '00.00.00', username: 'Доминик Т.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Куба' },
//    { id: 10, img: 'https://source.unsplash.com/random?elephant', title: 'Слон', price: 100500, date: '00.00.00', username: 'Карбофос', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Бердичев' },
//    { id: 11, img: 'https://source.unsplash.com/random?starship', title: 'Сокол Тысячелетия', price: 1000000000000, date: '00.00.00', username: 'Хан Соло', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Далёкая-далёкая галактика, Кореллия' },
//    { id: 12, img: 'https://source.unsplash.com/random?book', title: 'Книга', price: 100, date: '00.00.00', username: 'Илай', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Сан-Франциско' },
//    { id: 13, img: 'https://source.unsplash.com/random?island', title: 'Остров', price: 74347533, date: '00.00.00', username: 'Николас Кейдж', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Лос-Анжелес' },
//    { id: 14, img: 'https://source.unsplash.com/random?scyscraper', title: 'Небоскрёб', price: 777777777777, date: '00.00.00', username: 'Уолтер Митти', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Нью-Йорк' },
// ];

// Продавцы
const SellersBox = [
   {
      id: 1, sellerPic: 'https://source.unsplash.com/random?portrait', sellerName: 'Гомер С.', offers: [
         { id: 1, offerName: 'Дом', offerImg: 'https://source.unsplash.com/random?house', price: 123000003433, },
         { id: 2, offerName: 'Автомобиль Чайка Волга Лимузин', offerImg: 'https://source.unsplash.com/random?car', price: 550000, },
         { id: 3, offerName: 'Журжунжужьжапрож', offerImg: 'https://source.unsplash.com/random?garage', price: 220000, },
         { id: 4, offerName: 'Гитара', offerImg: 'https://source.unsplash.com/random?guitar', price: 5000, },
         { id: 5, offerName: 'Пивко', offerImg: 'https://source.unsplash.com/random?beer', price: 60, },
         { id: 6, offerName: 'Собака', offerImg: 'https://source.unsplash.com/random?dog', price: 3400, },
         { id: 7, offerName: 'Бассейн', offerImg: 'https://source.unsplash.com/random?waterpool', price: 50000, },
         { id: 8, offerName: 'Телевизор', offerImg: 'https://source.unsplash.com/random?TV', price: 80000, },
         { id: 9, offerName: 'Пивко', offerImg: 'https://source.unsplash.com/random?beer', price: 60, },
         { id: 10, offerName: 'Собака', offerImg: 'https://source.unsplash.com/random?dog', price: 3400, },
         { id: 11, offerName: 'Бассейн', offerImg: 'https://source.unsplash.com/random?waterpool', price: 50000, },
         { id: 12, offerName: 'Телевизор', offerImg: 'https://source.unsplash.com/random?TV', price: 80000, }
      ]
   },
   {
      id: 2, sellerPic: 'https://source.unsplash.com/random?portrait', sellerName: 'Иван Петров', offers: [
         { id: 11, offerName: 'Дом', offerImg: 'https://source.unsplash.com/random?house', price: 12303433, },
         { id: 21, offerName: 'Автомобиль', offerImg: 'https://source.unsplash.com/random?car', price: 550000, },
         { id: 31, offerName: 'Гараж', offerImg: 'https://source.unsplash.com/random?garage', price: 220000, },
         { id: 41, offerName: 'Гитара', offerImg: 'https://source.unsplash.com/random?guitar', price: 5000, },
         { id: 51, offerName: 'Пивко', offerImg: 'https://source.unsplash.com/random?beer', price: 60, },
         { id: 61, offerName: 'Собака', offerImg: 'https://source.unsplash.com/random?dog', price: 3400, },
         { id: 71, offerName: 'Бассейн', offerImg: 'https://source.unsplash.com/random?waterpool', price: 50000, },
         { id: 81, offerName: 'Телевизор', offerImg: 'https://source.unsplash.com/random?TV', price: 80000, }
      ]
   },
   {
      id: 3, sellerPic: 'https://source.unsplash.com/random?portrait', sellerName: 'Василий П.', offers: [
         { id: 12, offerName: 'Дом', offerImg: 'https://source.unsplash.com/random?house', price: 12303433, },
         { id: 22, offerName: 'Автомобиль', offerImg: 'https://source.unsplash.com/random?car', price: 550000, },
         { id: 32, offerName: 'Гараж', offerImg: 'https://source.unsplash.com/random?garage', price: 220000, },
         { id: 42, offerName: 'Гитара', offerImg: 'https://source.unsplash.com/random?guitar', price: 5000, },
         { id: 52, offerName: 'Пивко', offerImg: 'https://source.unsplash.com/random?beer', price: 60, },
         { id: 62, offerName: 'Собака', offerImg: 'https://source.unsplash.com/random?dog', price: 3400, },
         { id: 72, offerName: 'Бассейн', offerImg: 'https://source.unsplash.com/random?waterpool', price: 50000, },
         { id: 82, offerName: 'Телевизор', offerImg: 'https://source.unsplash.com/random?TV', price: 80000, }
      ]
   },
   {
      id: 4, sellerPic: 'https://source.unsplash.com/random?portrait', sellerName: 'Роза М.', offers: [
         { id: 13, offerName: 'Дом', offerImg: 'https://source.unsplash.com/random?house', price: 12303433, },
         { id: 23, offerName: 'Автомобиль', offerImg: 'https://source.unsplash.com/random?car', price: 550000, },
         { id: 33, offerName: 'Гараж', offerImg: 'https://source.unsplash.com/random?garage', price: 220000, },
         { id: 43, offerName: 'Гитара', offerImg: 'https://source.unsplash.com/random?guitar', price: 5000, },
         { id: 53, offerName: 'Пивко', offerImg: 'https://source.unsplash.com/random?beer', price: 60, },
         { id: 63, offerName: 'Собака', offerImg: 'https://source.unsplash.com/random?dog', price: 3400, },
         { id: 73, offerName: 'Бассейн', offerImg: 'https://source.unsplash.com/random?waterpool', price: 50000, },
         { id: 83, offerName: 'Телевизор', offerImg: 'https://source.unsplash.com/random?TV', price: 80000, }
      ]
   },
];



// Поиски
const SearchesBox = [
   {
      id: 1, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
      data: 'Снять, На длительный срок, > 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, 20 000 - 25 000 ₽.',
      locality: 'Челябинск'
   },
   {
      id: 2, title: 'Категория 1 уровня / Категория 2 уровня',
      data: 'Снять, На длительный срок, > 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, 20 000 - 25 000 ₽.',
      locality: 'Владивосток'
   },
   {
      id: 3, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
      data: 'Снять, На длительный срок, > 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, 20 000 - 25 000 ₽.',
      locality: 'Миасс'
   },
   {
      id: 4, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня',
      data: 'Снять, На длительный срок, > 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, 20 000 - 25 000 ₽.',
      locality: 'Старокамышинск'
   },
   {
      id: 5, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория / Подкатегория 2 уровня / Подкатегория 3 уровня',
      data: 'Снять, На длительный срок, > 9 комнат, 9 комнат, 8 комнат, 7 комнат, 6 комнат, 5 комнат, 4 комнаты, 3 комнаты, 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, Блочный, Панельный, Кирпичный, Частные, Арендная плата 56 655 — 67 778 ₽.',
      locality: 'Челябинск'
   },
   {
      id: 6, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
      data: 'Снять, На длительный срок, > 9 комнат, 9 комнат, 8 комнат, 7 комнат, 6 комнат, 5 комнат, 4 комнаты, 3 комнаты, 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, Блочный.',
      locality: 'Москва'
   },
   {
      id: 7, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
      data: 'Снять, На длительный срок, > 9 комнат, 9 комнат, 8 комнат, 7 комнат, 6 комнат, 5 комнат, 4 комнаты, 3 комнаты, 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, Блочный.',
      locality: 'Москва'
   },
   {
      id: 8, title: 'Категория 1 уровня / Категория 2 уровня / Категория 3 уровня / Подкатегория',
      data: 'Снять, На длительный срок, > 9 комнат, 9 комнат, 8 комнат, 7 комнат, 6 комнат, 5 комнат, 4 комнаты, 3 комнаты, 2 комнаты, 1 комната, Студия, Деревянный, Монолитный, Блочный.',
      locality: 'Москва'
   },
];

// Пагинация


const Favorites = () => {

   const { id } = useAuth();
   const [itemNav, setItemNav] = useState({ i: 1, ttl: 'Объявления' });


   const [offetFav, setOfferFav] = useState()
   useEffect(() => {
      axios.post('/api/getFavorites', { user_id: id })
         .then(data => setOfferFav(data.data))
         .catch(error => cosnole.log(error))
   }, [id])


   const [seller, setSeller] = useState(0)
   const [sellerSubBool, setSellerSubBool] = useState(null)

   const { subList, isLoading } = useSubList("58")

   useEffect(() => {
      setSeller(subList)
   }, [id])

   async function subscribeUser(id = 58, sellerID) {
      const subscribe = {
         user_id: id + "",
         seller_id: sellerID + ""
      }

      axios.post("/api/getSubscriptions", { user_id: String(id) }).then(data => console.log(data.data))

      await axios.post("/api/subscriptions", subscribe)
         .then(res => console.log(res.data))
         .catch(error => cosnole.log(error))

      axios.post("/api/getSubscriptions", { user_id: String(id) }).then(data => setSeller(data.data))

   }



   const navItems = [
      { id: 1, title: 'Объявления', content: <FavProvider> <Offers itemsPost={offetFav} /></FavProvider>, count: offetFav != undefined ? offetFav.posts?.length : 0 },
      { id: 2, title: 'Продавцы', content: <Sellers sellers={seller} sellerSub={subscribeUser} />, count: seller != undefined ? seller.length : 0 },
      { id: 3, title: 'Поиски', content: <Searches searches={SearchesBox} />, count: SearchesBox.length }
   ];

   return (
      <>
         <div className="clientPage__container_top">
            <div className="clientPage__container_nav__wrapper">
               <div className="clientPage__container_nav">
                  {navItems.map(item => {
                     return (
                        <a className={(itemNav.i === item.id) ? ('navActive') : ('')} key={item.id} onClick={() => setItemNav({ i: item.id, ttl: item.title })}>{item.title} {brooklyn(item.count)}</a>
                     )
                  })}
               </div>
            </div>
         </div>
         {navItems.map(item => {
            return (
               (itemNav.i === item.id) && (item.content)
            )
         })}
      </>
   )
}
export default Favorites;
