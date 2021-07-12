import StarRating from "./StarRating";

function Subscribes({ data }) {
  console.log(data);
  return (
    <div className="subscribers_subscriptions_main">
      <div className="subscribers_subscriptions">
        <div className="subscribers_subscriptions__user_info">
          <div className="subscribers_subscriptions__avatar">
            <img src="https://source.unsplash.com/random?interior" alt="avatar" />
          </div>
          <div className="subscribers_subscriptions__user_name">Имя Пользователя</div>
        </div>
        <div className="subscribers_subscriptions__user_rating">
          <div className="subscribers_subscriptions__user_number-raiting">2.0</div>
          <StarRating rating={data} />
        </div>
      </div>
    </div>
  );
}

export default Subscribes;
