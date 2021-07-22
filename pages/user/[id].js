import { useEffect, useState } from "react";
import MetaLayout from "../../layout/MainLayout";
import StarRating from "../../components/StarRating";
import User from "../../components/User/User";
import { initials, stringToColor, ToRusAccountDate } from "../../lib/services";
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
import { useSubList, useSubBool } from "../../hooks/useSubscriptions";

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
  const [subTest, setSubTest] = useState(null)

  const userInfo = useAd(router.query.id)
  const {sellerName, sellerPhoto, raiting, createdAt, isLoading, sellerId} = useOutherUser(router.query.id)
  const {id} = useUser()
  const {matchesMobile, matchesTablet} = useMedia()
  const [userBool, setUserBool] = useState(false)

  const {userLoading, userSub} =  useSubBool("58", sellerId)

  useEffect(() => {
    setUserBool(userSub)
  }, [userLoading])


  function modal(modal, changeModal) {
    changeModal(!modal)
  }


  function subscribeUser() {

    const subscribe = {
      user_id: 58 + "", 
      seller_id: sellerId + ""
    }

    axios.post("/api/getSubscriptions", {user_id: String(58)}).then(data => console.log(data.data))

    axios.post("/api/subscriptions", subscribe)
    .then(res => console.log(res.data))
    .catch(error => cosnole.log(error))

    axios.post("/api/getSubscriptions", {user_id: String(58)}).then(data => console.log(data.data))

    setUserBool(!userBool)
  }


  return (
    <MetaLayout title={"Личный кабинет"}>
      <div className="clientPage text">
        <div className="clientPage__breadcrumbs thin">
          <a className="breadCrumb light" href="/">
            Главная
          </a>
          <a className="breadCrumb line light" onClick={() => router.back()}>
            Название объявления с которого перешел
          </a>
          <a className="line">{sellerName}</a>
        </div>
        <div className="clientPage__menu">
          <div key={userInfo.userId} className="clientPage__userinfo">
            <div className="clientPage__userpic">
              {isLoading ? null : <Avatar src={photo} style={{ backgroundColor: stringToColor(username) }}>
                {initials(username)}
              </Avatar>}
            </div>
            <div className="clientPage__username">{sellerName}</div>
            <div className="clientPage__userRegDate light small">на Kvik c {ToRusAccountDate(createdAt)}</div>
            <div className="clientPage__userrate">
              <div className="clientPage__userrate__num">{raiting}</div>
              <StarRating rating={raiting} />
            </div>
            <div className="clientPage__userstats highlight small">
              <a onClick={() => setReviewsModal(!reviewsModal)} className="offerUnpublish thin superLight" className="userInfoReviews">
                {userInfo.userReviews}
                <div style={{textAlign: "center"}}>
                  <div>0</div>
                  <p>отзывов</p>
                </div>
              </a>
              <a onClick={() => setSubscribersModal(!subscriptionsModal)} className="offerUnpublish thin superLight" className="userInfoSubscribers">
                {userInfo.userSubscribers}
                <div style={{textAlign: "center"}}>
                  <div>0</div>
                  <p>подписчиков</p>
                </div>
              </a>
              <a onClick={() => setSubscriptionsModal(!subscriptionsModal)} className="offerUnpublish thin superLight" className="userInfoSubscribtions">
                {userInfo.userSubscriptions}
                <div style={{textAlign: "center"}}>
                  <div>0</div>
                  <p>подписок</p>
                </div>
              </a>
            </div>
            {userBool == null ? <button className="btnSubscribe" onClick={() => subscribeUser()}>TEST</button> : <button className="btnSubscribe" onClick={() => subscribeUser()}>{userBool ? "Отписаться" : "Подписаться"}</button>}
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
    </MetaLayout>
  );
}
export default UserPage;
