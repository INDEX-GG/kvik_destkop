import { Avatar } from "@material-ui/core";
import StarRating from "./StarRating";
import { stringToColor, initials } from "../lib/services";
import {useRouter} from "next/router"


function Subscribes({ data }) {
  console.log(data)
  const router = useRouter()
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
          <div className="subscribers_subscriptions__user_number-raiting">{data.rating != null ? data.rating : 0}</div>
          <StarRating rating={data.rating != null ? data.rating : 0} />
        </div>
      </div>
    </div>
  );
}

export default Subscribes;
