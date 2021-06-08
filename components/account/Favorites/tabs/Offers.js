import React from 'react'
import {ToRubles} from '../../../services';

function Offers(data) {
    return (
<div className="clientPage__container_bottom">
      <div className="clientPage__container_nav__radio">
            <label className="checkbox">
               <input type="checkbox" />
               <div className="checkbox__text"></div>
            </label>
            <a>Удалить</a>
      </div>
      <div className="clientPage__container_content">
         <div className="favoritesContainerWrapper">
            {data.offers.map(offer => {
               return (
                  <div key={offer.id} className="favoritesContainer boxWrapper">
                     <div className="favoritesImage">
                        <div className="favoritesPubCheck">
                           <label className="checkbox">
                              <input type="checkbox" />
                              <div className="checkbox__text"></div>
                           </label>
                        </div>
                        <a className="favoritesCompare"></a>
                        <a className="favoritesFavorite"></a>
                        <img src={`${offer.img}?${offer.id}`} />
                        <div className="favoritesCause megaLight">Пользователь заблокирован</div>
                     </div>
                     <div className="favoritesDescription">
                        <div className="favoritesUserBlock small">
                           <div>
                              <div>{offer.username}</div>
                              <div className="favoritesDatPub light DatPub__mobile"> <span> Дата публикации</span> {offer.date}</div>
                           </div>
                           <img className="favoritesUserpic" src={`${offer.userpic}?${offer.id}`} />
                        </div>
                        <div className="favoritesMiddle">
                           <div>{ToRubles(offer.price)}</div>
                           <div>{offer.title}</div>
                           <div className="thin small light">{offer.locality}</div>
                        </div>
                        <div className="favoritesNote">
                           Заметка по объявлению, которую я написал
                        </div>
                        <a className="favoritesButton buttonGrey small">
                           Сообщить об изменении цены
                        </a>
                     </div>
                  </div>
               )
            })}</div>
      </div>
   </div>
    )
}

export default Offers
