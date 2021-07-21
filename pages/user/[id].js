import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import StarRating from "../../components/StarRating";
import User from "../../components/User/User";
import { ToRusAccountDate } from "../../lib/services";
import { Avatar, Dialog } from "@material-ui/core";
import { useRouter } from "next/router";
import UserLock from "../../UI/icons/UserLock";
import UserReport from "../../UI/icons/UserReport";
import { ModalRating, ModalSubscribers, ModalSubscription} from "../../components/Modals";
import { useAd } from "../../hooks/useAd";
import axios from "axios"
import { useMedia } from "../../hooks/useMedia";
import { useOutherUser } from "../../hooks/useOutherUser";
import { useUser } from "../../hooks/useUser";

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

  const [reviewsModal, setReviewsModal] = useState(false);
  const [subscribersModal, setSubscribersModal] = useState(false);
  const [subscriptionsModal, setSubscriptionsModal] = useState(false);
  const [userData, setUserData] = useState({})
  const [userLoading, setUserLoading] = useState(true)

  const userInfo = useAd(router.query.id)

  const {username, photo, raiting, createdAt, isLoading, sellerId} = useOutherUser(router.query.id)

  const {id} = useUser()

  const {matchesMobile, matchesTablet} = useMedia()


  function modal(modal, changeModal) {
    changeModal(!modal)
  }

  function subscribeUser() {
    axios.post("/api/subscriptions", {user_id: String(id), seller_id: String(sellerId)}).then(res => console.log(res))
  }


  return (
    <MainLayout title={"Личный кабинет"}>
      <div className="clientPage text">
        <div className="clientPage__breadcrumbs thin">
          <a className="breadCrumb light" href="/">
            Главная
          </a>
          <a className="breadCrumb line light" onClick={() => router.back()}>
            Название объявления с которого перешел
          </a>
          <a className="line">{username}</a>
        </div>
        <div className="clientPage__menu">
          <div key={userInfo.userId} className="clientPage__userinfo">
            <div className="clientPage__userpic">
              {isLoading ? null : <Avatar src={photo} style={{ backgroundColor: username.toColor() }}>
                {username.initials()}
              </Avatar>}
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
            <button className="btnSubscribe" onClick={subscribeUser}>Подписаться</button>
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
          <User />
        </div>
      </div>
      <Dialog open={reviewsModal} onClose={() => setReviewsModal(!reviewsModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        <ModalRating rate={raiting} comments={2} mobile={matchesMobile || matchesTablet ? true : false} modal={() => modal(reviewsModal, setReviewsModal)} />
      </Dialog>
      <Dialog open={subscribersModal} onClose={() => setSubscribersModal(!subscribersModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        <ModalSubscribers mobile={ matchesMobile || matchesTablet ? true : false} data={3} subscribers={1} modal={() => modal(subscribersModal, setSubscribersModal)} />
      </Dialog>
      <Dialog open={subscriptionsModal} onClose={() => setSubscriptionsModal(!subscriptionsModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        <ModalSubscription mobile={ matchesMobile || matchesTablet ? true : false} data={3} subscribers={1} modal={() => modal(subscriptionsModal, setSubscriptionsModal)}/>
      </Dialog>
    </MainLayout>
  );
}
export default UserPage;
