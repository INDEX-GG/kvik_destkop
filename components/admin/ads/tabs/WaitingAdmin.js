import { useEffect, useState } from 'react';
import { BtnReject } from '../../../Modals';
import { Dialog } from '@material-ui/core';
import WaitingCard from '../card/WaitingCard';

function WaitingAdmin({offers}) {
   
   const [check, setCheck] = useState(false);
   const [offerId, setOfferId] = useState([]);

   const [openWaitForm, setOpenWaitForm] = useState(false);
   const handleWaitFormDialog = () => setOpenWaitForm(!openWaitForm);

   function getDataChild ({id, isCheck}) {
      setOfferId(isCheck ?  ( previous => [...previous, id] )  :  ( previous => previous.filter( item => item !== id) ) );
   }
   useEffect(() => {
      offers.length === offerId.length ? check ? null : setCheck(true) : check === false ? null : setCheck(false);
   },[offerId])

   
   return (
      <div className="clientPage__container_bottom">
         <div className="clientPage__container_nav__radio">
            <label className="checkbox">
               <input 
                  type="checkbox"
                  onChange={(event) => {
                     setCheck(event.target.checked); 
                     event.target.checked ? null : setOfferId([])
                  }}
                  checked={check}
               />
               <div className="checkbox__text"></div>
            </label>
            <a>Одобрить</a>
         </div>
         <div className="clientPage__container_content">
            <div className="ads__container">
               {offers.map((offer, index) => {
                  return (
                     <WaitingCard 
                        key={index}
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
