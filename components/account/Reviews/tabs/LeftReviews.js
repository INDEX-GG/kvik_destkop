import React from "react";
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import StarRating from "../../../StarRating";

function LeftReviews(data) {
  if (data.data.lenght == 0) {
    return (
	  <EmptyPlaceholder
	  title='Здесь будут отзывы, оставленные вами'
	  subtitle='Совершайте сделки, и оставляйте отзывы на других продавцов'
	  />
    );
  }

  return (
    <div className="clientPage__container_bottom">
      <div className="clientPage__container_nav__radio reviewsDelete">
        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text"></div>
        </label>
        <a className="small light">Удалить</a>
      </div>
      <div className="clientPage__container_content">
        <div className="reviewsWrapper">
          {data.data.map((item, i) => {
            return (
              <div key={i} className="reviewContainer reviewPadding">
                <div>
                  <div>
                    <img src={`${item.userPic}?${item.id}`} />
                    <div className="small">
                      <div>{item.userName}</div>
                      <div className="light DatPub__mobile reviewsDate reviewsDateLeft">
                        <spam>Дата публикации</spam> {item.date}
                      </div>
                    </div>
                  </div>

                  <div className="reviewsLeftRaiting">
                    <div className="reviewsNumber reviesNumberNone">{item.rate}</div>
                    <StarRating {...{ rating: item.rate }} />
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LeftReviews;
