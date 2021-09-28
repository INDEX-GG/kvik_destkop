import { ToRubles } from '../../../../lib/services';

function RejectedAdmin(data) {
   const listRef = (e) => {
      const adInformation = document.querySelectorAll(".ad__information__description")[e.target.value]
      const loerMore = document.querySelectorAll(".btn__loer_more")[e.target.value]
      loerMore.classList.toggle("btn__loer_more-open");
      adInformation.classList.toggle("ad_close");
      if (adInformation.classList.contains('ad_close')) {
         loerMore.innerHTML = 'Развернуть';
      }
      else {
         loerMore.innerHTML = "Скрыть";
      }
   }
   return (
      <div className="clientPage__container_bottom">
         <div className="clientPage__container_content">
            <div className="ads__container">
               {data.offers.map((offer, index) => {
                  return (
                     <div key={index} className="ad__wrapper">
                        
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
                                    {
                                       offer.categorys.map((category, i) => {
                                          return (
                                             <span key={i}>{category.category}</span>
                                          );
                                       })
                                    }
                                 </div>
                              </div>
                              <div className="ad__information__right_block">
                              </div>
                           </div>
                           <div className="ad__information__user">
                              <div className="ad__information__user_icon"><img src={`${offer.userpic}?${offer.id}`} /></div>
                              <div className="ad__information__user_name">
                                 {offer.username}
                              </div>
                           </div>
                           <p value={index} className={"ad__information__description ad_close"}>
                              {offer.description}
                           </p>
                           <button className="btn__loer_more" value={index} onClick={(e) => listRef(e)}  >Развернуть</button>
                           <p className="description__rejected">Отклонено по причине: <span>Указана контактная информация в названии, тексте или на изображени, еще причина и еще причина</span> </p>
                        </div>
                     </div>
                  )
               })}</div>
         </div>
      </div>
   )
}

export default RejectedAdmin
