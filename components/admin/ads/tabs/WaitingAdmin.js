import React, { useEffect, useState } from 'react';
import WaitingCard from '../card/WaitingCard';
import axios from 'axios';

function WaitingAdmin({offers, setWaitingBox, lessCount}) {

   const [check, setCheck] = useState(false);
   const [offerId, setOfferId] = useState([]);
   const [firstRender, setFirstRender] = useState(0);
   
   function getDataChild ({id, isCheck}) {
      setOfferId( isCheck ?  previous => [...previous, id] : previous => previous.filter( item => item !== id) );
   }

   const fetchApprove = (oneOfferId) => {
      axios.post("/api/verifyModerActive", {
         "id": oneOfferId ? oneOfferId : offerId,
         "verify": "0",
      })
      .then( (responce) => {
         console.log(responce);
         setWaitingBox( prev => prev.filter( item => oneOfferId ? item.id !== oneOfferId[0] : !offerId.includes(item.id) ) );
         lessCount(oneOfferId ? oneOfferId.length : offerId.length)
         setOfferId([]);
         setCheck(false);
      })
   }
  
   useEffect(() => {
      firstRender > 0 && offerId.length === offers.length ? setCheck(true) : setCheck(false);
      setFirstRender(1);
   },[ offerId ])

   if(offers.length < 1) {
      return <></>
   }
   

   return (
      <div className="clientPage__container_bottom" >
         <div className="clientPage__container_nav__radio">
            <label className="checkbox">
               <input 
                  type="checkbox"
                  onChange={ (event) => {event.target.checked === false ? ( setOfferId([]), setCheck(event.target.checked) ):  setCheck(event.target.checked) }}
                  checked={check}
               />
               <div className="checkbox__text"></div>
            </label>
            <a 
               onClick={() => offerId.length > 0 ? fetchApprove() : null}
               style={{color: offerId.length > 0 ? "black" : null}}
            >
               Одобрить
            </a>
         </div>
         <div className="clientPage__container_content">
            <div className="ads__container">
               {offers.map((offer, index) => {
                  return (
                     <WaitingCard 
                        key={offer.id}
                        index={index}
                        offer={offer}
                        parentCheck={check}
                        getDataChild={getDataChild}
                        offerId={offerId}
                        setWaitingBox={setWaitingBox}
                        lessCount={lessCount}
                        fetchApprove={fetchApprove}
                     />
                  )
               })}
            </div>
         </div>
      </div>
   )
}

export default WaitingAdmin
