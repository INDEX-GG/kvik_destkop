import { useEffect, useState } from "react";
import StarRating from "../../components/StarRating";
import User from "../../components/User/User";
import { ToRusAccountDate, stringToColor, initials } from "../../lib/services";
import { Avatar, Dialog, NoSsr } from "@material-ui/core";
import { useRouter } from "next/router";
import UserLock from "../../UI/icons/UserLock";
import UserReport from "../../UI/icons/UserReport";
import { ModalRating, ModalSubscribers, ModalSubscription } from "../../components/Modals";
import { useAd } from "../../hooks/useAd";
import axios from "axios"
import { useMedia } from "../../hooks/useMedia";
import { useOutherUser } from "../../hooks/useOutherUser";
import { useSubList, useSubBool } from "../../hooks/useSubscriptions";

import MetaLayout from "../../layout/MetaLayout";
import { useAuth } from "../../lib/Context/AuthCTX";

function UserPage() {
  const router = useRouter();
  const { id } = useAuth()
  const { sellerName, sellerPhoto, raiting, createdAt, isLoading, sellerId } = useOutherUser(router.query.id)
  const userInfo = useAd(router.query.id)
   const { userSub } = useSubBool(id, sellerId)
  
  const [reviewsModal, setReviewsModal] = useState(false);
  const [subscribersModal, setSubscribersModal] = useState(false);
  const [subscriptionsModal, setSubscriptionsModal] = useState(false);
  const [productTitle, setProductTitle] = useState(null)
  const [productQuery, setProductQuery] = useState(null)
  const { matchesMobile, matchesTablet } = useMedia()
  const [userBool, setUserBool] = useState(false)


  useEffect(() => {
    setProductTitle(localStorage.getItem("Title"))
    setProductQuery(localStorage.getItem("Query"))
  }, [])

  useEffect(() => {
    setUserBool(userSub)
  }, [isLoading])


  function modal(modal, changeModal) {
    changeModal(!modal)
  }

  function subscribeUser() {

    const subscribe = {
      user_id: id + "",
      seller_id: sellerId + ""
    }

    axios.post("/api/getSubscriptions", { user_id: String(id) }).then(data => console.log(data.data))

    axios.post("/api/subscriptions", subscribe)
      .then(res => console.log(res.data))
      .catch(error => cosnole.log(error))

    axios.post("/api/getSubscriptions", { user_id: String(id) }).then(data => console.log(data.data))

    setUserBool(!userBool)
  }


  console.log(id, sellerId, userSub)

  return (
    <MetaLayout>
      <div className="clientPage text">
        <div className="clientPage__breadcrumbs thin">
          <a className="breadCrumb light" href="/">
            Главная
          </a>
				  <a className="breadCrumb line light" onClick={() => router.push(`/product/${productQuery}`)}>
            	{productTitle}
          </a>  
          <a className="line">{sellerName}</a>
        </div>
        <div className="clientPage__menu">
          <div key={userInfo.userId} className="clientPage__userinfo">
            <div className="clientPage__userpic">
              {isLoading ? null : <Avatar src={sellerPhoto} style={{ backgroundColor: `${stringToColor(sellerName)}` }}>{initials(sellerName)}</Avatar>}
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
                <div style={{ textAlign: "center" }}>
                  <div>0</div>
                  <p>отзывов</p>
                </div>
              </a>
              <a onClick={() => setSubscribersModal(!subscriptionsModal)} className="offerUnpublish thin superLight" className="userInfoSubscribers">
                {userInfo.userSubscribers}
                <div style={{ textAlign: "center" }}>
                  <div>0</div>
                  <p>подписчиков</p>
                </div>
              </a>
              <a onClick={() => setSubscriptionsModal(!subscriptionsModal)} className="offerUnpublish thin superLight" className="userInfoSubscribtions">
                {userInfo.userSubscriptions}
                <div style={{ textAlign: "center" }}>
                  <div>0</div>
                  <p>подписок</p>
                </div>
              </a>
            </div>
            <button className="btnSubscribe" onClick={() => subscribeUser()}>{userBool ? "Отписаться" : "Подписаться"}</button>
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
        <ModalSubscribers mobile={matchesMobile || matchesTablet ? true : false} data={3} subscribers={1} modal={() => modal(subscribersModal, setSubscribersModal)} />
      </Dialog>
      <Dialog open={subscriptionsModal} onClose={() => setSubscriptionsModal(!subscriptionsModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        <ModalSubscription mobile={matchesMobile || matchesTablet ? true : false} data={3} subscribers={1} modal={() => modal(subscriptionsModal, setSubscriptionsModal)} />
      </Dialog>
    </MetaLayout>
  );
}
export default UserPage;
