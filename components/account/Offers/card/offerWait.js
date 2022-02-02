import React, { useEffect, useState } from 'react'
import { ToRubles } from "../../../../lib/services";
import VerifyModerator from "../../../json/verifyModerator.json";
import Verify from "../../../json/verify.json";

import {useMedia} from "../../../../hooks/useMedia";
import {Checkbox, makeStyles, Dialog} from "@material-ui/core";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import OfferModal from "../../../OfferModal";


function offerWait({ offer, parentCheck, getChildCheck}) {

    const [openOfferModal, setOpenOfferModal] = useState(false);
    const [offerId, setOfferId] = useState();
    const [buttonId, setButtonId] = useState('');
    const [check, setCheck] = useState(false);
    const offerData = offer;
    const offerID = offer.id;

    const cleanAll = () => {
      getChildCheck({id: offer.id, isChecked: false});
      setCheck(false)
  }
    console.log(offer);
    useEffect( () => {
        parentCheck ? check ? null : handleCheck(parentCheck) : check === false ? null : offerId.length < 1 ? handleCheck(parentCheck) : null;
    }, [parentCheck])

    function handleCheck(event) {
        setCheck(event);
        getChildCheck({id: offer.id, isCheck: event});
    }

    function pushCheck(e) {
      if (e.target.value !== '') {
          setOfferId([+e.target.value])
      }
      setOpenOfferModal(!openOfferModal);
      setButtonId(e.target.id)
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
                    <img src={offer.photo[0]} key={12321}/>
                    
                {/* <img src={offer.photo} /> */}

                {/* {console.log(offer)} */}
                {offer.verify == 4  ? 
                <div className="offerWaitCause megaLight offerWaitBigName">{Verify[offer.verify === 1 ? 5 : 4]}</div> :
                <div className="offerWaitCause megaLight" style={{
                  fontSize: '14px',
                  lineHeight: '16px'
                }}><p style={{padding:'4px, 30px'}}>Отклонено/Заблокировано</p></div>}
                {/* старый вариант отображения статуса, после изменения API тут не хватает данных, нужно адекватно заполнить пропсы */}
                {/* <div className="offerWaitCause megaLight">{Verify[offer.verify === 1 ? 5 : 4]}</div>} */}
              </div>
              <div className="offerDescription">
                <div className="offerDescriptionTop">
                  <div className="offerDTLeft thin">
                    <div>{ToRubles(offer.price)}</div>
                    <div className="offerTitle">{offer.title}</div>
                  </div>
                  <div className="offerDTRight">
                    {/*{offer.verify == 4 ? <a className="offerActivate thin superLight checkMarkIcon">Активировать</a> : null}*/}
                  </div>
                  <div class="offerDTRight">
                    <a href="#" class="offerDTRight__item">
                      <span class="offerIcon checkMarkIcon"></span>
                      <button
                          id='001'
                          onClick={(e) => pushCheck(e)}
                          className="offerActivate thin superLight offerSocialAction">
                          Активировать
                      </button>
                      </a><button class="offerDTRight__item offerEdit thin offerSocialAction">
                      <span class="offerIcon editIcon"></span>Редактировать</button>
                      <a href="#" class="offerDTRight__item">
                        <span class="offerIcon binIcon"></span>
                        <button 
                          onClick={(e) => pushCheck(e)}
                          id="002"
                          value="2521"
                          class="offerEdit thin superLight offerSocialAction">
                          Удалить
                        </button>
                      </a>
                  </div>
                </div>
                <div class="offerDescriptionBottom">
                  <div class="thin light small DatPub__mobile">
                    <span> Дата последнего редактирования: </span>
                    <div class="offerSocialCount offerSocialCountPos">
                      <div class="offerShowes showesIcon">{offer.last_day_viewing_count} +{offer.all_time_contact_count}</div>
                      <div class="offerAddFavores likeIcon">{offer.likes_count} +0</div>
                    </div>
                  </div>
                </div>
                <div className="offerDescriptionBottom">

                <Dialog open={openOfferModal || false} onClose={() => setOpenOfferModal(!openOfferModal)} fullWidth
                      maxWidth='md'>
                  <OfferModal
                    offerId={offerId}
                    offerData={offerData}
                    openOfferModal={openOfferModal}
                    setOpenOfferModal={setOpenOfferModal}
                    buttonId={buttonId}
                    cleanAll={cleanAll}
                  />
                </Dialog>

                  {/* {offer.verify !== 2 ? (
                    ""
                  ) : (
                    <div className="offerCauses small thin error">
                      <span className="light">Причина отклонения: </span>
                      {offer.verify_moderator.verify.map( (item, index) => (
                        VerifyModerator[+item] + `${index < offer.verify_moderator.verify.length - 1 ? " / " : ""}`
                      ))}
                    </div>
                  )}




                  {offer.delete ? <div className="thin">Будет удалено навсегда через 30 дней</div> : null}

                  {offer.verify == 1 || offer.verify == 4 || offer.verify == 6 ? (
                  <div className="thin light small DatPub__mobile offerStats">
                    <span>Дата последнего редактирования:</span> {offer.date}
                    <div className="offerSocialCount offerSocialCountPos offerSocialCountLeft">
                      <div className="offerShowes showesIcon">0 +0</div>
                      <div className="offerAddFavores likeIcon">0 +0</div>
                    </div>
                  </div>) : null} */}
                </div>
              </div>
            </div>
    )
}

export default offerWait
