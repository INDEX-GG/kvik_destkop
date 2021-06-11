import React, { useState } from 'react';
import Loading  from '../../../UI/icons/Loader';
import objNav from './navigateObject.json';
// import Develop from '../../../../components/inDev/Develop';
import {ToRubles} from '../../services';

const products = [
   { id: 1, img: 'https://source.unsplash.com/random?car', oldPrice: 850000, price: 760000, offerTitle: 'Название товарной позиции', locality: 'Челябинск', date: '00.00.00 00:00', mark: 'Toyota', model: 'Auris', type: 'Хэтчбэк', mileage: 120000, drive: 'Задний', transmition: 'Механическая', engine: 'Бензин, 1.6л', side: 'Правый', power: '124 л.с.', color: 'Серебристый', state: 'Не битый', gen: '1st', equip: 'Полная', inter: 'Ткань' },
   { id: 2, img: 'https://source.unsplash.com/random?car', oldPrice: 1850000, price: 1605000, offerTitle: 'Название товарной позиции', locality: 'Екатеринбург', date: '00.00.00 00:00', mark: 'Mitsubishi', model: 'Outlander', type: 'Кроссовер', mileage: 50000, drive: 'Полный', transmition: 'Автомат', engine: 'Бензин, 2л', side: 'Правый', power: '180 л.с.', color: 'Красный', state: 'Имеются повреждения', gen: '2st', equip: 'Люкс', inter: 'Комбинированный' },
   { id: 3, img: 'https://source.unsplash.com/random?car', oldPrice: 2850000, price: 2360000, offerTitle: 'Название товарной позиции', locality: 'Златоуст', date: '00.00.00 00:00', mark: 'Mazda', model: 'CX-7', type: 'Кроссовер', mileage: 80000, drive: 'Полный', transmition: 'Вариатор', engine: 'Бензин, 2.5л', side: 'Левый', power: '250 л.с.', color: 'Мокрый асфальт', state: 'История ДТП', gen: '3st', equip: 'Оффроад', inter: 'Кожа' },
   { id: 4, img: 'https://source.unsplash.com/random?car', oldPrice: 850000, price: 760000, offerTitle: 'Название товарной позиции', locality: 'Челябинск', date: '00.00.00 00:00', mark: 'Toyota', model: 'Auris', type: 'Хэтчбэк', mileage: 120000, drive: 'Задний', transmition: 'Механическая', engine: 'Бензин, 1.6л', side: 'Правый', power: '124 л.с.', color: 'Серебристый', state: 'Не битый', gen: '1st', equip: 'Полная', inter: 'Ткань' },
   { id: 5, img: 'https://source.unsplash.com/random?car', oldPrice: 1850000, price: 1605000, offerTitle: 'Название товарной позиции', locality: 'Екатеринбург', date: '00.00.00 00:00', mark: 'Mitsubishi', model: 'Outlander', type: 'Кроссовер', mileage: 50000, drive: 'Полный', transmition: 'Автомат', engine: 'Бензин, 2л', side: 'Правый', power: '180 л.с.', color: 'Красный', state: 'Имеются повреждения', gen: '2st', equip: 'Люкс', inter: 'Комбинированный' },
   { id: 6, img: 'https://source.unsplash.com/random?car', oldPrice: 2850000, price: 2360000, offerTitle: 'Название товарной позиции', locality: 'Златоуст', date: '00.00.00 00:00', mark: 'Mazda', model: 'CX-7', type: 'Кроссовер', mileage: 80000, drive: 'Полный', transmition: 'Вариатор', engine: 'Бензин, 2.5л', side: 'Левый', power: '250 л.с.', color: 'Мокрый асфальт', state: 'История ДТП', gen: '3st', equip: 'Оффроад', inter: 'Кожа' }
];

const autoSubs = objNav.category.transport.subCategories.auto.fields.Автомобили;
const autoSubsKeys = Object.keys(autoSubs);

const compareList = (
   <div className="clientPage__container_bottom">
      <div className="clientPage__container_nav__radio">
            <label className="checkbox">
               <input type="checkbox" />
               <div className="checkbox__text"><a>Только различия</a></div>
            </label>
            
      </div>
      <div className="userPageContentCompare">
         <div className="compareTable">
            <div className="compareCategories thin light">
               {
                  autoSubsKeys.map(item => {
                     return (
                        <div>{item}</div>
                     )
                  })
               }
            </div>

            {products.map(item => {
               return (
                  <div>
                     <div className="compareCard boxWrapper">
                        <div className="compareCardPic">
                           <img src={`${item.img}?${item.id}`} />
                           <div className="compareCardNotif">Просмотрено</div>
                           <div className="compareCardShut"></div>
                        </div>
                        <div className="compareCardDes">
                           <div className="thin light crossed">{ToRubles(item.oldPrice)}</div>
                           <div className="bold xl">{ToRubles(item.price)}</div>
                           <div>{item.offerTitle}</div>
                           <div className="compareCardDesBottom small thin light">
                              <div>{item.locality}</div>
                              <div>{item.date}</div>
                           </div>
                           <div className="compareCardDelivery"></div>
                           <div className="compareCardDefense"></div>
                        </div>
                     </div>
                     <div>{item.mark}</div>
                     <div>{item.model}</div>
                     <div>{item.type}</div>
                     <div>{item.mileage}</div>
                     <div>{item.drive}</div>
                     <div>{item.transmition}</div>
                     <div>{item.engine}</div>
                     <div>{item.power}</div>
                     <div>{item.color}</div>
                     <div>{item.state}</div>
                     <div>{item.side}</div>
                  </div>
               )
            })}

         </div>
      </div>
   </div >
);

const navItems = [
   { id: 1, title: 'Транспорт', count: 120, content: compareList },
   { id: 2, title: 'Недвижимость', count: 140 },
   { id: 3, title: 'Бытовая электроника', count: 2 },
   { id: 4, title: 'Работа', count: 3 },
   { id: 5, title: 'Для бизнеса', count: 4 },
   { id: 6, title: 'Для дома и дачи', count: 22 },
   { id: 7, title: 'Животные', count: 222 },
   { id: 8, title: 'Личные вещи', count: 3 },
   { id: 9, title: 'Услуги', count: 144 },
   { id: 10, title: 'Хобби спорт и отдых', count: 17 }
];

const Compare = () => {
   
   const [itemNav, setItemNav] = useState({ i: 1, ttl: 'Транспорт' });

   return (
    'Hello World' ||
      <>
      <div className="clientPage__container_top">
         <div className="clientPage__container_nav__wrapper">
            <div className="clientPage__container_nav">
               {navItems.map(item => {
                  return (
                     <a key={item.id} className={(itemNav.i === item.id) ? ('navActive') : ('')} key={item.id} onClick={() => setItemNav({ i: item.id, ttl: item.title })}>{item.title} { item.count.brooklyn()}</a>
                  )
               })}
            </div>
         </div>
      </div>

         {navItems.map(item => {
            return (
               (itemNav.i === item.id) && (item.content ? item.content : (<div className="userPageContentCompare"><Loading /></div>))
            )
         })}

      </>
   )
}
export default Compare;