import { Avatar } from "@material-ui/core";
import StarRating from "./StarRating";
import { stringToColor, initials } from "../lib/services";

function Subscribes({ data }) {

  return (
    <div className="subscribers_subscriptions_main">
      <div className="subscribers_subscriptions">
        <div className="subscribers_subscriptions__user_info">
          <a href={`/user/${data.id}`} className="subscribers_subscriptions__avatar" >
             <Avatar src={data.userPhoto} style={{ backgroundColor: `${stringToColor(data.name)}` }}>
               {initials(data.name)}
             </Avatar>
          </a>
          <a href={`/user/${data.id}`} className="subscribers_subscriptions__user_name">{data.name}</a>
        </div>
        <div className="subscribers_subscriptions__user_rating">
          <div className="subscribers_subscriptions__user_number-raiting">{data.raiting != null ? data.raiting : 0}</div>
          <StarRating rating={data.raiting != null ? data.raiting : 0} />
        </div>
      </div>
    </div>
  );
}

export default Subscribes;
