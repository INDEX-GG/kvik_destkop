import React from "react";
import { ToRubles } from "../../../../lib/services";
import VerifyModerator from "../../../json/verifyModerator.json";
import Verify from "../../../json/verify.json";
import EmptyPlaceholder from "../../../EmptyPlaceholder";

function Wait(data) {
  if (data.offers.lenght == 0) {
    return (
	  <EmptyPlaceholder
	  title='Здесь буду ваши объявления'
	  subtitle='Текст'
	  />
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
                {/* {JSON.parse(offer.img)
                  .img.slice(0, 1)
                  .map((imgs) => {
                    return <img src={imgs} />;
                  })} */}
                {<img src={offer.img} />}

                {/* {console.log(offer)} */}
                {offer.verify == 4  ? 
                <div className="offerWaitCause megaLight offerWaitBigName">{Verify[offer.verify]}</div> :
                <div className="offerWaitCause megaLight">{Verify[offer.verify]}</div>}
              </div>
              <div className="offerDescription">
                <div className="offerDescriptionTop">
                  <div className="offerDTLeft thin">
                    <div>{ToRubles(offer.price)}</div>
                    <div className="offerTitle">{offer.title}</div>
                  </div>
                  <div className="offerDTRight">
                    {offer.verify == 4 ? <a className="offerActivate thin superLight checkMarkIcon">Активировать</a> : null}
                    <a className="offerEdit thin superLight editIcon">Редактировать</a>
                    <a className="offerDelete thin superLight binIcon">Удалить</a>
                  </div>
                </div>
                <div className="offerDescriptionBottom">
                  {offer.verify !== 5 ? (
                    ""
                  ) : (
                    <div className="offerCauses small thin error">
                      <span className="light">Причина отклонения: </span>
                      {VerifyModerator[offer.verify_moderator]}
                    </div>
                  )}


                  {/* {console.log(offer.verify)} */}

                  {offer.delete ? <div className="thin">Будет удалено навсегда через 30 дней</div> : null}

                  {offer.verify == 1 || offer.verify == 4 || offer.verify == 6 ? (
                  <div className="thin light small DatPub__mobile offerStats">
                    <span>Дата последнего редактирования:</span> {offer.date}
                    <div className="offerSocialCount offerSocialCountPos offerSocialCountLeft">
                      <div className="offerShowes showesIcon">0 +0</div>
                      <div className="offerAddFavores likeIcon">0 +0</div>
                    </div>
                  </div>) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Wait;
