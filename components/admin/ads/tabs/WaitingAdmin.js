import React, { useEffect, useState } from 'react';
import { BtnReject } from '../../../Modals';
import { Dialog } from '@material-ui/core';
import WaitingCard from '../card/WaitingCard';
import axios from 'axios';

function WaitingAdmin({offers, setWaitingBox/* , setCountOffers */}) {

   const [check, setCheck] = useState(false);
   const [offerId, setOfferId] = useState([]);
   const [firstRender, setFirstRender] = useState(0);
   const [openWaitForm, setOpenWaitForm] = useState(false);
   const handleWaitFormDialog = () => setOpenWaitForm(!openWaitForm);

   function getDataChild ({id, isCheck}) {
      setOfferId( isCheck ?  previous => [...previous, id] : previous => previous.filter( item => item !== id) );
   }

   
   const fetchApprove = () => {
      axios.post("/api/verifyModerActive", {
         "id": offerId,
         "verify": "0",
      })
      .then( (responce) => {
         console.log(responce);
         setWaitingBox( prev => prev.filter( item => !offerId.includes(item.id) ) );
         setOfferId([]);
         setCheck(false);
      })
   }
   /* доделать отслеживание количества ждущих одобрения объявлений*/
   useEffect( () => {
      console.log("offers===IIIIIIIIIIIIII====>", offers)
   }, [ offers ])
   useEffect(() => {
      firstRender > 0 && offerId.length === offers.length ? setCheck(true) : setCheck(false);
      setFirstRender(1);
   },[ offerId ])

   if(offers.length < 1) {
      return <></>
   }
   
   console.log("offerId=======>", offerId)
   //console.log("setWaitingBox=======>", setWaitingBox)

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
               onClick={offerId.length > 0 ? fetchApprove : null}
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
                        openWaitForm={openWaitForm}
                        setOpenWaitForm={setOpenWaitForm}
                        parentCheck={check}
                        getDataChild={getDataChild}
                        offerId={offerId}
                     />
                  )
               })}
            </div>
         </div>
         <Dialog open={openWaitForm || false} onClose={() => setOpenWaitForm(!openWaitForm)} fullWidth maxWidth='md'>
            <BtnReject Close={handleWaitFormDialog} />
         </Dialog>
      </div>
   )
}

export default WaitingAdmin
