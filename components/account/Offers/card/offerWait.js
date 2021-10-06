import React, { useEffect, useState } from 'react'
import { ToRubles } from "../../../../lib/services";
import VerifyModerator from "../../../json/verifyModerator.json";
import Verify from "../../../json/verify.json";


function offerWait({ offer, parentCheck, getChildCheck, offerId}) {

    const [check, setCheck] = useState(false);

    useEffect( () => {
        parentCheck ? check ? null : handleCheck(parentCheck) : check === false ? null : offerId.length < 1 ? handleCheck(parentCheck) : null;
    }, [parentCheck])

    function handleCheck(event) {
        setCheck(event);
        getChildCheck({id: offer.id, isCheck: event});
    }

    return (
        <div key={offer.id} className="offerContainer boxWrapper">
              <div className="offerImage">
                <div className="offerPubCheck">
                  <label className="checkbox">
                    <input 
                      type="checkbox"
                      onChange={(event) => handleCheck(event.target.checked)}
                      checked={check}
                    />
                    <div className="checkbox__text"></div>
                  </label>
                </div>
                {
                  offer.photo.slice(0, 1)
                  .map((imgs) => (
                    <img src={imgs} key={12321}/>
                  ))}
                {/* <img src={offer.photo} /> */}

                {/* {console.log(offer)} */}
                {offer.verify == 4  ? 
                <div className="offerWaitCause megaLight offerWaitBigName">{Verify[offer.verify === 1 ? 5 : 4]}</div> :
                <div className="offerWaitCause megaLight">{Verify[offer.verify === 1 ? 5 : 4]}</div>}
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
                  {offer.verify !== 2 ? (
                    ""
                  ) : (
                    <div className="offerCauses small thin error">
                      <span className="light">Причина отклонения: </span>
                      {offer.verify_moderator.verify.map( (item, index) => (
                        VerifyModerator[+item] + `${index < offer.verify_moderator.verify.length - 1 ? " / " : ""}`
                      ))}
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
    )
}

export default offerWait
