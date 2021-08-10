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
import Link from "next/link"

import MetaLayout from "../../layout/MetaLayout";
import { useAuth } from "../../lib/Context/AuthCTX";

function UserPage() {
  const router = useRouter();
  const { id } = useAuth()
  const { sellerName, sellerPhoto, raiting, createdAt, isLoading, sellerId } = useOutherUser(router.query.id)
  const userInfo = useAd(router.query.id)
  const { userSub } = useSubBool(id, sellerId)
  const { matchesMobile, matchesTablet } = useMedia()
  
  const [reviewsModal, setReviewsModal] = useState(false);
  const [subscribersModal, setSubscribersModal] = useState(false);
  const [subscriptionsModal, setSubscriptionsModal] = useState(false);
  const [userBool, setUserBool] = useState(false)
  const [subList, setSubList] = useState([])


  useEffect(() => {
    setUserBool(userSub)
  }, [isLoading])


  useEffect(() => {
    if (sellerId != undefined && subList.length == 0) {
      axios.post("/api/getSubscriptions", {user_id: "" + sellerId}).then((res) => setSubList(res.data))
      console.log(subList)
    }
  })


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

  return (
    <MetaLayout>
      <div className="clientPage text">
        <div className="clientPage__breadcrumbs thin">
          <Link href="/">
            <a className="breadCrumb light">
              Главная
            </a>
          </Link>
          <span className="line">{sellerName}</span>
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
                  <div>{subList.length > 0 ? subList.length : 0}</div>
                  <p>подписок</p>
                </div>
              </a>
            </div>
            {+router.query.id == id  ? null : (
              <>
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
              </>
            )}
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
        <ModalSubscription subscription={subList.length} modal={() => modal(subscriptionsModal, setSubscriptionsModal)} mobile={matchesMobile || matchesTablet ? true : false} data={subList} />
      </Dialog>
    </MetaLayout>
  );
}
export default UserPage;
