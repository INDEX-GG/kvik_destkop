import { useState } from 'react';
import { BtnReject } from '../../../Modals';
import { Dialog } from '@material-ui/core';
import WaitingCard from '../card/WaitingCard';

function WaitingAdmin(data) {
   

   const [openWaitForm, setOpenWaitForm] = useState(false);
   const handleWaitFormDialog = () => setOpenWaitForm(!openWaitForm);

   return (
      <div className="clientPage__container_bottom">
         <div className="clientPage__container_nav__radio">
            <label className="checkbox">
               <input type="checkbox" />
               <div className="checkbox__text"></div>
            </label>
            <a>Одобрить</a>
         </div>
         <div className="clientPage__container_content">
            <div className="ads__container">
               {data.offers.map((offer, index) => {
                  return (
                     <WaitingCard 
                        key={index}
                        index={index}
                        offer={offer}
                        openWaitForm={openWaitForm}
                        setOpenWaitForm={setOpenWaitForm}
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
