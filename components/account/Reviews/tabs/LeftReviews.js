import React from "react";
import StarRating from "../../../StarRating";

function LeftReviews(data) {
  if (data.data.lenght == 0) {
    return (
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_content">
          <div className="notInfContainer">
            <div className="notInf__title">Здесь буду ваши оставленные отзывы</div>
            <p className="notInf__subtitle">Текст</p>
          </div>
        </div>
      </div>
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
              <div key={i} className="reviewContainer">
                <div>
                  <div>
                    <img src={`${item.userPic}?${item.id}`} />
                    <div className="small">
                      <div>{item.userName}</div>
                      <div className="light DatPub__mobile reviewsDate">
                        <spam>Дата публикации</spam> {item.date}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="reviewsNumber">{item.rate}</div>
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
