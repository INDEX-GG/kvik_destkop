import React, { useEffect, useState } from "react";
// import EmptyPlaceholder from "../../../EmptyPlaceholder";
import OfferWait from "../card/offerWait";
import OfferWaitPlaceHolder from "../../../placeHolders/OfferPlaceHolder/OfferWaitPlaceHolder/OfferWaitPlaceHolder";
import Placeholder from "../../../User/tabs/Placeholder";
import { useOfferAccount } from "../../../../lib/Context/OfferAccountCTX";
import OfferCard from "../card/OfferCard";

function Wait({offers}) {
  const { page, setPage, totalPosts, page_limit } = useOfferAccount()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [check, setCheck] = useState(false);
  const [offerId, setOfferId] = useState([])

  // запрещаем вешать слушатель скрола, при первом рендере т.к. стейты еще не пришли.
  useEffect(()=> {
		if(isFirstRender) {
			setIsFirstRender(false)
			return
		}
        document.addEventListener('scroll', scrollHandler )
        return ()=>{
            document.removeEventListener('scroll', scrollHandler )
        }
    }, [totalPosts, isFirstRender] )

  // pageNumber - переменная для сохранения значения. (сделана из-за того, что для функции scrollHandler page всегда равна первому значению)
	let pageNumber = page
	function scrollHandler (e) {
    // высчитываем высоту отступа между скролом и низом страницы
		const pixelsFromBottom = (e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop)-window.innerHeight;
		const maxPossiblePage = Math.ceil(totalPosts.wait / page_limit);
		if(maxPossiblePage <= pageNumber && !isFirstRender) {
			return
		}
		// если находится нужная нам высота, обновляем страницу для повторого запроса.
		if(pixelsFromBottom <= 200){
			setPage(pageNumber + 1)
			pageNumber += 1
		}
	}

  function getChildCheck({id, isCheck}) {
    setOfferId( isCheck ? prev => [...prev, id] : prev => prev.filter( item => item !== id ) );
  }
  
  useEffect(() => {
		offerId.length === offers.length ? check ? null : setCheck(true) : check===false ? null : setCheck(false);
	}, [offerId])

  if (offers.length === 0) {
    return (
     <>
       {!offers ? <OfferWaitPlaceHolder/> :<Placeholder />}
     </>
    );
  }

  return (
      <>
        {!offers ? <OfferWaitPlaceHolder/>
            :<div className="clientPage__container_bottom">
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
                    <OfferCard
                        key={offer.id}
                        offer={offer}
                        parentCheck={check}
                        getChildCheck={getChildCheck}
                        offerId={offerId}
                    />
                ))}
              </div>
            </div>}
      </>
  );
}
export default Wait;
