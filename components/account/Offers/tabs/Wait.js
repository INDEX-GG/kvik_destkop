import React, { useEffect, useState } from "react";
// import EmptyPlaceholder from "../../../EmptyPlaceholder";
import OfferWait from "../card/offerWait";

function Wait({offers}) {

  const [check, setCheck] = useState(false);
  const [offerId, setOfferId] = useState([])

  function getChildCheck({id, isCheck}) {
    setOfferId( isCheck ? prev => [...prev, id] : prev => prev.filter( item => item !== id ) );
  }
  
  useEffect(() => {
		offerId.length === offers.length ? check ? null : setCheck(true) : check===false ? null : setCheck(false);
	}, [offerId])

  // if (offers.length === 0) {
  //   return (
  //     <EmptyPlaceholder
  //       title='Здесь буду ваши объявления'
  //       subtitle='Текст'
  //     />
  //   );
  // }

  return (
    <div className="clientPage__container_bottom">
      {/*<div className="clientPage__container_nav__radio">*/}
      {/*  <label className="checkbox">*/}
      {/*    <input */}
      {/*      type="checkbox"*/}
      {/*      onChange={(event) => {*/}
      {/*        setCheck(event.target.checked); */}
      {/*        event.target.checked ? null : setOfferId([])*/}
      {/*      }}*/}
      {/*      checked={check} */}
      {/*    />*/}
      {/*    <div className="checkbox__text"></div>*/}
      {/*  </label>*/}
      {/*  <a>Активировать</a>*/}
      {/*  <a>Удалить</a>*/}
      {/*</div>*/}
      <div className="clientPage__container_content">
        {offers.map((offer) => (
          <OfferWait 
            key={offer.id} 
            offer={offer}
            parentCheck={check}
            getChildCheck={getChildCheck}
            offerId={offerId}
          />
        ))}
      </div>
    </div>
  );
}
export default Wait;
