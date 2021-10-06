import React from 'react';
import RejectedCard from '../card/RejectedCard';

function RejectedAdmin({offers}) {
   
   return (
      <div className="clientPage__container_bottom">
         <div className="clientPage__container_content">
            <div className="ads__container">
               {offers.map((offer) => {
                  return (
                     <RejectedCard 
                        key={offer.id}
                        offer={offer}
                     />
                  )
               })}</div>
         </div>
      </div>
   )
}

export default RejectedAdmin
