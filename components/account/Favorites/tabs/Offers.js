import React from "react";
import { ToRubles, ToRusDate } from "../../../../lib/services";
import Favorits from '../../../../UI/Favorits';
import { useFavorits } from "../../../../lib/Context/FavoritesCTX";
import { useAuth } from '../../../../lib/Context/AuthCTX';
import axios from "axios";







function Offers(data) {
  



  const { id } = useAuth();
  const { userFav, setQuery } = useFavorits()

  function deleteNote(e) {
    e.target.innerHTML = ''
    let like = true
    let coment = ''
    let arrFavorits = { 'user_id': `${id}`, 'post_id': `${e.target.id}`, 'comment': `${coment}`, 'condition': `${like}` }
    axios.post("/api/favorites", arrFavorits)
      .then(r => r.data)
      .finally(function () {
        setQuery(p => !p)
      })
  }

  if (data.itemsPost?.length === 0 || data.itemsPost?.length === undefined) {
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
          {data.itemsPost?.map((offer, i) =>
            <a href={`/product/${offer.id}`} key={i} className="favoritesContainer boxWrapper">
              <div className="favoritesImage">
                <div className="favoritesPubCheck">
                  <label className="checkbox">
                    <input type="checkbox" />
                    <div className="checkbox__text"></div>
                  </label>
                </div>
                <a className="favoritesCompare"></a>
                <a href='javascript:void(0)' ><Favorits favId={offer.id} isAccountCard /></a>

                {JSON.parse(offer.photo)
                  ?.photos?.slice(0, 1)
                  .map((imgs, i) => {
                    return <img key={i} src={imgs} />;
                  })}

                {offer.user_blocked &&
                  <div className="favoritesCause megaLight">Пользователь заблокирован</div>
                }
              </div>
              <div className="favoritesDescription">
                <a href={`/user/${offer.user_id}`} className="favoritesUserBlock small">
                  <div>
                    <div className='favoritesDescriptionUserName'>{offer.user_name}</div>
                    <div className="favoritesDatPub light DatPub__mobile">
                      {" "}
                      <span> Дата публикации</span> {ToRusDate(offer.created_at)}
                    </div>
                  </div>
                  <img className="favoritesUserpic" src={offer.user_photo} />
                </a>
                <div className="favoritesMiddle">
                  <div>{ToRubles(offer.price)}</div>
                  <div>{offer.title}</div>
                  <div className="thin small light">{offer.address}</div>
                </div>
                <span id={offer.id} onClick={(e) => deleteNote(e)} className="favoritesNote">{offer.comment}</span>
                <a className="favoritesButton buttonGrey small">Сообщить об изменении цены</a>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Offers;
