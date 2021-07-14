import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import StarRating from "../../components/StarRating";
import User from "../../components/User/User";
import { standartDate, ToRusAccountDate } from "../../lib/services";
import { useUser } from "../../hooks/useUser";
import { Avatar } from "@material-ui/core";
import { useRouter } from "next/router";

// !!!
import UserLock from "../../UI/icons/UserLock";
import UserReport from "../../UI/icons/UserReport";

const userInfo = {
  userId: 1,
  userPic: "",
  userName: "Имя пользователя",
  userDateReg: "21.56.7676",
  userRate: 3.2,
  userReviews: 0,
  userSubscribers: 0,
  userSubscriptions: 0,
};

function UserPage() {
  const router = useRouter();

  const { isAuth, isLoading, username, photo, createdAt, raiting } = useUser();

  //!! Modal
  const [reviewsModal, setReviewsModal] = useState(false);
  const [subscribersModal, setSubscribersModal] = useState(false);
  const [subscriptionsModal, setSubscriptionsModal] = useState(false);

  const star = 4;

  return (
    <MainLayout title={"Личный кабинет"}>
      <div className="clientPage text">
        <div className="clientPage__breadcrumbs thin">
          <a className="breadCrumb light" href="/">
            Главная
          </a>
          <a className="breadCrumb line light" href="/product/42">
            Название объявления с которого перешел
          </a>
          <a className="line">{username}</a>
        </div>
        <div className="clientPage__menu">
          <div key={userInfo.userId} className="clientPage__userinfo">
            <div className="clientPage__userpic">
              {isAuth && !isLoading && (
                <Avatar src={photo} style={{ backgroundColor: `${username.toColor()}` }}>
                  {username.initials()}
                </Avatar>
              )}
            </div>
            <div className="clientPage__username">{username}</div>
            <div className="clientPage__userRegDate light small">на Kvik c {ToRusAccountDate(createdAt)}</div>
            <div className="clientPage__userrate">
              <div className="clientPage__userrate__num">{raiting}</div>
              <StarRating rating={raiting} />
            </div>
            <div className="clientPage__userstats highlight small">
              <a onClick={() => setReviewsModal(!reviewsModal)} className="offerUnpublish thin superLight" className="userInfoReviews">
                {userInfo.userReviews}
                <p>отзывов</p>
              </a>
              <a onClick={() => setSubscribersModal(!subscriptionsModal)} className="offerUnpublish thin superLight" className="userInfoSubscribers">
                {userInfo.userSubscribers}
                <p>подписчиков</p>
              </a>
              <a onClick={() => setSubscriptionsModal(!subscriptionsModal)} className="offerUnpublish thin superLight" className="userInfoSubscribtions">
                {userInfo.userSubscriptions}
                <p>подписок</p>
              </a>
            </div>
            <button className="btnSubscribe">Подписаться</button>
            <div className="btnActive">
              <a className="userActive">Заблокировать пользователя</a>
              <div className="userIconBlock">
                <UserLock className="userActiveIcon" />
              </div>
            </div>
            <div className="btnActive">
              <a className="userActive">Пожаловаться</a>
              <div className="userIconBlock">
                <UserReport className="userActiveIcon" />
              </div>
            </div>
          </div>
        </div>
        <div className="clientPage__container">
          <User router={router} />
        </div>
      </div>
    </MainLayout>
  );
}
export default UserPage;
