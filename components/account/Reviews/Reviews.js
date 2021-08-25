import React, { useEffect, useState } from 'react';
import WaitReviews from './tabs/WaitReviews';
import LeftReviews from './tabs/LeftReviews';
import { brooklyn } from '../../../lib/services';
import { useRouter } from 'next/router';
import safeAccountTab from '../../safeAccountTab';

// Ждут отзыва
const waitReviewBox = [
   { id: 1, img: 'https://source.unsplash.com/random?interior', title: '2-комн. кваритра, 95 м', price: 3000000, date: '00.00.00', username: 'Ну прямо очень весьма и весьма длинное имя', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Центральный административный округ, Москва' },
   { id: 2, img: 'https://source.unsplash.com/random?cars', title: 'Mitsubishi Delica', price: 199999, date: '00.00.00', username: 'Стивен Фрай', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Лондон' },
   { id: 3, img: 'https://source.unsplash.com/random?phone', title: 'Samsung Galaxy S21 Ultra', price: 99999, date: '00.00.00', username: 'Алекс Ф.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Санкт-Петербург' },
   { id: 4, img: 'https://source.unsplash.com/random?fridge', title: 'Холодильник для пивка', price: 78500, date: '00.00.00', username: 'Мо', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Спрингфилд' },
   { id: 5, img: 'https://source.unsplash.com/random?beer', title: 'Пивко', price: 59.5, date: '00.00.00', username: 'Гомер С.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Спрингфилд' },
   { id: 6, img: 'https://source.unsplash.com/random?cat', title: 'Кот', price: 999.95, date: '00.00.00', username: 'Леопольд Д.Ж.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Саратов' },
   { id: 8, img: 'https://source.unsplash.com/random?ship', title: 'Корабль', price: 9992234453422, date: '00.00.00', username: 'Суэц К.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Гиза' },
   { id: 9, img: 'https://source.unsplash.com/random?wheels', title: 'Колеса', price: 34921.22, date: '00.00.00', username: 'Доминик Т.', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Куба' },
   { id: 10, img: 'https://source.unsplash.com/random?elephant', title: 'Слон', price: 100500, date: '00.00.00', username: 'Карбофос', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Бердичев' },
   { id: 11, img: 'https://source.unsplash.com/random?starship', title: 'Сокол Тысячелетия', price: 1000000000000, date: '00.00.00', username: 'Хан Соло', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Далёкая-далёкая галактика, Кореллия' },
   { id: 12, img: 'https://source.unsplash.com/random?book', title: 'Книга', price: 100, date: '00.00.00', username: 'Илай', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Сан-Франциско' },
   { id: 13, img: 'https://source.unsplash.com/random?island', title: 'Остров', price: 74347533, date: '00.00.00', username: 'Николас Кейдж', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Лос-Анжелес' },
   { id: 14, img: 'https://source.unsplash.com/random?scyscraper', title: 'Небоскрёб', price: 777777777777, date: '00.00.00', username: 'Уолтер Митти', userpic: 'https://source.unsplash.com/random?portrait', locality: 'Нью-Йорк' },
];

// Оставленные отзывы
const leftReviewBox = [
   { id: 1, userPic: 'https://source.unsplash.com/random?portrait', userName: 'Дядя Стёпа', date: '00.00.00', offerTitle: 'Светофор', rate: 1, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit sagittis elit' },
   { id: 2, userPic: 'https://source.unsplash.com/random?portrait', userName: 'Доминик Т.', date: '00.00.00', offerTitle: 'Автомобиль', rate: 2, review: 'Lorem ipsum dolor sit amet' },
   { id: 3, userPic: 'https://source.unsplash.com/random?portrait', userName: 'Тор О.', date: '00.00.00', offerTitle: 'Молот', rate: 3, review: 'Aenean hendrerit a magna vitae commodo. Aliquam tristique pellentesque sem. Ut vitae elit ligula. Sed quis libero quis magna convallis dignissim. Sed aliquet, libero sit amet luctus volutpat, massa odio pulvinar ligula, in ullamcorper risus leo tempor felis. In ac erat in augue mattis scelerisque finibus nec sem. Vivamus nec neque ultrices, ultrices sem nec, commodo felis. Proin elit metus, egestas at urna ac, congue gravida velit. Mauris ac lectus mauris.' },
   { id: 4, userPic: 'https://source.unsplash.com/random?portrait', userName: 'Пифагор С.', date: '00.00.00', offerTitle: 'Штаны', rate: 4, review: 'Lorem ipsum dolor' },
   { id: 5, userPic: 'https://source.unsplash.com/random?portrait', userName: 'Гена К.', date: '00.00.00', offerTitle: 'Чебурашка', rate: 5, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
];

//Пагинация
const navItems = [
   { id: 1, title: 'Ждут отзыва', content: <WaitReviews data={waitReviewBox} />, count: waitReviewBox.length },
   { id: 2, title: 'Оставленные отзывы', content: <LeftReviews data={leftReviewBox} />, count: leftReviewBox.length }
];

const Reviews = () => {

   const [itemNav, setItemNav] = useState({ i: 1, ttl: 'Ждут отзыва' });
   const router = useRouter()

   useEffect(() => {
    if (router) {
      if (router.query.content != undefined) {
        if (+router.query.content - 1 != 2) {
          setItemNav({i: +router.query.content, ttl: navItems[router.query.content - 1].title})
        }
      }
    }
  }, [router])


   return (
      <>
      <div className="clientPage__container_top">
         <div className="clientPage__container_nav__wrapper">
            <div className="clientPage__container_nav">
            {navItems.map(item => {
               return (
                  <a key={item.id} className={(itemNav.i === item.id) ? ('navActive') : ('')}  onClick={() => {
                     setItemNav({ i: item.id, ttl: item.title })
					 safeAccountTab(item.id)
					}}>{item.title} { brooklyn(item.count)}</a>
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
export default Reviews;