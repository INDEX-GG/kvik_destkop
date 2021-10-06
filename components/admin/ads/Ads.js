import React, { useState, useEffect } from 'react';
import { brooklyn } from '../../../lib/services';
import Loading from '../../../UI/icons/Loader';
import RejectedAdmin from './tabs/RejectedAdmin';
import WaitingAdmin from './tabs/WaitingAdmin';
import axios from "axios";


export const Ads = () => {

   const [RejectedBox , setRejectedBox ] = useState([]);
   const [countRejectedOffers, setCountRejectedOffers] = useState(0);
   const [WaitingBox, setWaitingBox] = useState([]);
   const [countOffers, setCountOffers] = useState(0);
   const [fetch, setFetch] = useState(false);

   /* Данные при первой загрузке для Отклоненные */
   useEffect( () => {
      axios.post(`/api/getPostsModeratorRejected`, {
         "page_limit": 4, 
         "last_post_id": 0
      })
      .then((responce) => {
		   console.log(responce)
         setRejectedBox(responce.data.posts);
         setCountRejectedOffers(responce.data.count[0].count)
      });
   },[])
   
   /* Данные при первой загрузке для Ждут одобрения */
   useEffect( () => {
      axios.post(`/api/getPostsModerator`, {
         "page_limit": 5, 
         "last_post_id": 0
      })
      .then((responce) => {
		 console.log(responce)
         setWaitingBox(responce.data.posts);
         setCountOffers(responce.data.count[0].count)});
   },[])

   function lessCount (count) {
      setCountOffers( prev => prev - count);
      setCountRejectedOffers(prev => prev + count);
   }

   useEffect ( () => {
      if(fetch) {
         console.log("Запросы!??!?!?!");
         axios.post(`/api/getPostsModerator`, {
            "page_limit": 5, 
            "last_post_id": WaitingBox[WaitingBox.length - 1].id
         })
         .then((responce) => {
            setWaitingBox(prev => prev.concat(responce.data.posts));
            responce.data.posts.length > 0 && setFetch(false);
         })
      }
   }, [fetch])

   useEffect ( () => {
      document.addEventListener( "scroll", () => {
         if( ( document.documentElement.scrollHeight - window.innerHeight ) * 0.7 <= document.documentElement.scrollTop && fetch === false) {
            setFetch(true);
         }
      })
   })

   const navItems = [
      { id: 1, title: 'Ждут одобрения', content: <WaitingAdmin key={1} offers={WaitingBox} setWaitingBox={setWaitingBox} lessCount={lessCount} />, count: countOffers },
      { id: 2, title: 'Отклоненные', content: <RejectedAdmin key={2} offers={RejectedBox} setRejectedBox={setRejectedBox}/>, count: countRejectedOffers }
   ];

   const [itemNav, setItemNav] = useState({ i: 1, ttl: 'Объявления' });
  
   return (
      <>
         <div className="clientPage__container_top" >
            <div className="clientPage__container_nav__wrapper">
               <div className="clientPage__container_nav" >
                  {navItems.map(item => {
                     return (
                        <a 
                           key={item.id} 
                           className={(itemNav.i === item.id) ? ('navActive') : ('')} 
                           onClick={() => {setItemNav({ i: item.id, ttl: item.title })}} 
                        >
                           {item.title} {brooklyn(item.count)}
                        </a>
                     )
                  })}
               </div>
            </div>
         </div>
         {navItems.map(item => {
            return (
               (itemNav.i === item.id) && (item.content ? item.content : ( <div key={item.id} className="userPageContentCompare"> <Loading/> </div> ))
            )
         })}
      </>
   )
}


