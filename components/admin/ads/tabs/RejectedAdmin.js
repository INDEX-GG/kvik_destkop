import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RejectedCard from '../card/RejectedCard';

function RejectedAdmin({offers, setRejectedBox}) {

   const [fetchRejected, setFetchRejected] = useState(false);

   useEffect( () => {
      if(fetchRejected){
         axios.post(`/api/getPostsModeratorRejected`, {
            "page_limit": 3, 
            "last_post_id": offers[offers.length-1].id
         })
         .then((responce) => {
            console.log(responce)
            setRejectedBox(prev => prev.concat(responce.data.posts))
            responce.data.posts.length > 0 && setFetchRejected(false);
         });
      }
      document.addEventListener( "scroll", () => {
         if( ( document.documentElement.scrollHeight - window.innerHeight ) * 0.7 <= document.documentElement.scrollTop &&  fetchRejected === false ) {
            setFetchRejected(true);
            console.log("SCROLL");
         }
      })
      console.log("USEEFFECTCONSOLES");
   },[fetchRejected])
   
   return (
      <div className="clientPage__container_bottom">
         <div className="clientPage__container_content">
            <div className="ads__container">
               {offers.map((offer, index) => {
                  return (
                     <RejectedCard 
                        key={offer.id}
                        offer={offer}
                        index={index}
                     />
                  )
               })}
            </div>
         </div>
      </div>
   )
}

export default RejectedAdmin
