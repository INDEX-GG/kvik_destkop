import React, { useState } from 'react';
import { BtnReject } from '../../../Modals';
import { ToRubles } from '../../../services';
import { Dialog } from '@material-ui/core';

function WaitingAdmin(data) {
   const listRef = (e) => {
      const adInformation = document.querySelectorAll(".ad__information__description")[e.target.value]
      const loerMore = document.querySelectorAll(".btn__loer_more")[e.target.value]
      adInformation.classList.toggle("ad_close");
      loerMore.classList.toggle("btn__loer_more-open");
      if (adInformation.classList.contains('ad_close')) {
         loerMore.innerHTML = 'Развернуть';
      }
      else {
         loerMore.innerHTML = "Скрыть";
      }
   }

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
                     <div key={offer.id} className="ad__wrapper">
                        <div className="ad__check">
                           <label className="checkbox">
                              <input type="checkbox" />
                              <div className="checkbox__text"></div>
                           </label>
                        </div>
                        <a className="ad_slider">
                           <img src={(offer.imgs)[0]} alt="" />
                           <div className="ad__photo_count">1/{(offer.imgs).length}</div>
                        </a>
                        <div className="ad__information">
                           <div className="ad__information__blocks">
                              <div className="ad__information__left_block">
                                 <div className="ad__information_price">{ToRubles(offer.price)}</div>
                                 <div className="ad__information_title">{offer.title}</div>
                                 <div className="ad__information_category">
                                    {offer.categorys.map(category => {
                                       return (
                                          <span key={category.id}>{category.category}</span>
                                       );
                                    })
                                    }
                                 </div>
                              </div>
                              <div className="ad__information__right_block">
                                 <button onClick={() => setOpenWaitForm(!openWaitForm)} className="btn__reject">Отклонить</button>
                              </div>
                           </div>
                           <div className="ad__information__user">
                              <div className="ad__information__user_icon"><img src={`${offer.userpic}?${offer.id}`} /></div>
                              <div className="ad__information__user_name">
                                 {offer.username}
                              </div>
                           </div>
                           <p value={index} className="ad__information__description ad_close">
                              {offer.description}
                           </p>
                           <button className="btn__loer_more" value={index} onClick={(e, index) => listRef(e, index)} >Развернуть</button>
                           <button className="btn__ad_add">Одобрить</button>
                        </div>
                     </div>
                  )
               })}</div>
         </div>
         <Dialog open={openWaitForm} onClose={() => setOpenWaitForm(!openWaitForm)} fullWidth maxWidth='md'>
            <BtnReject Close={handleWaitFormDialog} />
         </Dialog>
      </div>
   )
}

export default WaitingAdmin
