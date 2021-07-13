import React from "react";
import { ToRubles } from "../../../../lib/services";
import VerifyModerator from "../../../json/verifyModerator.json";
import Verify from "../../../json/verify.json";

function Archive(data) {
  if (data.offers.lenght == 0) {
    return (
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_content">
          <div className="notInfContainer">
            <div className="notInf__title">Здесь буду ваши законченные объявления</div>
            <p className="notInf__subtitle">Текст</p>
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
        <a>Активировать</a>
        <a>Удалить</a>
      </div>
      <div className="clientPage__container_content">
        {data.offers.map((offer) => {
          return (
            <div key={offer.id} className="offerContainer boxWrapper">
              <div className="offerImage">
                <div className="offerPubCheck">
                  <label className="checkbox">
                    <input type="checkbox" />
                    <div className="checkbox__text"></div>
                  </label>
                </div>
                {/* {JSON.parse(offer.photo).photos.slice(0, 1).map((imgs) => {
                           return (
                              <img src={imgs} />
                           )
                        })} */}
                {<img src={offer.img} />}
                {offer.verify === 7 ? "" : <div className="offerWaitCause megaLight">{Verify[offer.verify]}</div>}
              </div>
              <div className="offerDescription">
                <div className="offerDescriptionTop">
                  <div className="offerDTLeft thin">
                    <>{ToRubles(offer.price)}</>
                    <div className="offerTitle">{offer.title}</div>
                  </div>
                  <div className="offerDTRight">
                    <a className="offerActivate thin superLight checkMarkIcon">Активировать</a>
                    <a className="offerEdit thin superLight editIcon">Редактировать</a>
                    <a className="offerDelete thin superLight binIcon">Удалить</a>
                  </div>
                </div>
                <div className="offerDescriptionBottom">
                  <div className="thin light small DatPub__mobile">
                    <span> Дата последнего редактирования: {offer.date}</span>
                    <div className="offerSocialCount offerSocialCountPos">
                      <div className="offerShowes showesIcon">0 +0</div>
                      <div className="offerAddFavores likeIcon">0 +0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Archive;
