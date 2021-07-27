import React from "react";
import { ToRubles, ToRusDate } from "../../../../lib/services";
import Favorits from '../../../../UI/Favorits';
import  { useFavorits } from "../../../../lib/Context/FavoritesCTX";


function Offers(data) {

  console.log(data.itemsPost?.posts)
  const { userFav, setQuery } = useFavorits()


  if (data.itemsPost?.posts.length === undefined) {
    return (
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_content">
          <div className="notInfContainer">
            <div className="notInf__title">Добавьте объявление в избранное, чтобы не потерять</div>
            <p className="notInf__subtitle">Нажмите на соответствующую кнопку( на кнопку добавления, на сердечко, на 💙️), чтобы добавить объявление в избранное</p>
          </div>
        </div>
      </div>
    );
  }


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

          {data.itemsPost?.posts.map((offer, i) => 



           
              <div key={i} className="favoritesContainer boxWrapper">
                <div className="favoritesImage">
                  <div className="favoritesPubCheck">
                    <label className="checkbox">
                      <input type="checkbox" />
                      <div className="checkbox__text"></div>
                    </label>
                  </div>
                  <a className="favoritesCompare"></a>

                  <Favorits isAccountCard />

                  <img /* src={`${offer.img}?${offer.id}`} */ />
                  <div className="favoritesCause megaLight">Пользователь заблокирован</div>
                </div>
                <div className="favoritesDescription">
                  <div className="favoritesUserBlock small">
                    <div>
                      <div>{offer.user_name}</div>
                      <div className="favoritesDatPub light DatPub__mobile">
                        {" "}
                        <span> Дата публикации</span> { ToRusDate(offer.created_at) }
                      </div>
                    </div>
                    <img className="favoritesUserpic"  src={offer.user_photo} />
                  </div>
                  <div className="favoritesMiddle">
                    <div>{ToRubles(offer.price)}</div>
                    <div>{offer.title}</div>
                    <div className="thin small light">{offer.address}</div>
                  </div>
                  <div className="favoritesNote">Заметка по объявлению, которую я написал</div>
                  <a className="favoritesButton buttonGrey small">Сообщить об изменении цены</a>
                </div>
              </div>
          )}

        </div>
      </div>
    </div>
  );
}


export default Offers;
