import React from 'react';
import StarRating from '../../../StarRating';

function LeftReviews(data) {
    return (
        <div className="clientPage__container_bottom">
        <div className="clientPage__container_nav__radio">
              <label className="checkbox">
                 <input type="checkbox" />
                 <div className="checkbox__text"></div>
              </label>
              <a className="small light">Удалить</a>
        </div>
        <div className="clientPage__container_content">
           <div className="reviewsWrapper">
              {data.data.map(item => {
                 return (
                    <div className="reviewContainer">
                       <div>
                          <div>
                             <img src={`${item.userPic}?${item.id}`} />
                             <div className="small">
                                <div>{item.userName}</div>
                                <div className="light DatPub__mobile"><spam>Дата публикации</spam> {item.date}</div>
                             </div>
                          </div>
  
                          <div>
                             <div className="RateNumber">{item.rate}</div>
                             <StarRating {...{rating: item.rate}} />
                          </div>
  
                       </div>
                       <div>{item.offerTitle}</div>
                       <div className="thin">{item.review}</div>
                       
                       <div className="reviewCheck">
                          <label className="checkbox">
                             <input type="checkbox" />
                             <div className="checkbox__text"></div>
                          </label>
                       </div>
                    </div>
                 )
              })}
           </div>
        </div>
     </div>
    )
}

export default LeftReviews
