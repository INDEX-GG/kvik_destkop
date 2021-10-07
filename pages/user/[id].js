import { useEffect, useState } from "react";
import StarRating from "../../components/StarRating";
import User from "../../components/User/User";
import { ToRusAccountDate, stringToColor, initials, standartDate } from "../../lib/services";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import { useRouter } from "next/router";
import UserLock from "../../UI/icons/UserLock";
import UserReport from "../../UI/icons/UserReport";
import { ModalRating, ModalSubscribers, ModalSubscription } from "../../components/Modals";
import { useAd } from "../../hooks/useAd";
import axios from "axios"
import { useMedia } from "../../hooks/useMedia";
import { useOutherUser } from "../../hooks/useOutherUser";
import { useSubBool } from "../../hooks/useSubscriptions";
import MetaLayout from "../../layout/MetaLayout";
import { useAuth } from "../../lib/Context/AuthCTX";
import { STATIC_URL } from "../../lib/constants";
import { useBlockedBool } from "../../hooks/useBlocked";
import { useUser } from "../../hooks/useUser";

function UserPage() {
  const router = useRouter();
  const { id } = useAuth()
  const { sellerName, sellerPhoto, raiting, createdAt, isLoading, sellerId } = useOutherUser(router.query.id)
  const {userInfo} = useAd(router.query.id)
	const  userProfileInfo  = useUser();
  const { userSub } = useSubBool(id, sellerId)
  const { userBlocked } = useBlockedBool(id, sellerId)
  const { matchesMobile, matchesTablet } = useMedia()

  const [reviewsModal, setReviewsModal] = useState(false);
  const [subscribersModal, setSubscribersModal] = useState(false);
  const [subscriptionsModal, setSubscriptionsModal] = useState(false);
  const [userBool, setUserBool] = useState(false)
  const [userBlockBool, setUserBlockBool] = useState(false)
  const [subList, setSubList] = useState([])
  const [subscribersList, setSubscribersList] = useState([])
  const [loading, setLoading] = useState(false)
  const [blockLoading, setBlockLoading] = useState(false)
  const [blockOpen, setBlockOpen] = useState(false)


  useEffect(() => {
    setUserBool(userSub)
  }, [userSub])
  
  useEffect(() => {
    setUserBlockBool(userBlocked)
  }, [userBlocked])

  useEffect(() => {
	  if (id && router.query.id && id == +router.query.id) {
	  router.push({pathname: `/account/${id}`, query: {account: 1, content: 1}})
  	}
  }, [id, router.query.id])


  useEffect(() => {
    if (sellerId && subList.length == 0) {
      axios.post("/api/getSubscriptions", {user_id: sellerId}).then((res) => setSubList(res.data))
    }

    if (sellerId && subscribersList.length == 0) {
          changeSubscribers();
        }
    
  }, [sellerId])

  function changeSubscribers() {
	  axios.post("/api/getSubscribers", {user_id: "" + sellerId}).then((res) => {
      if (res.data.message === 'nothing'){
        setSubscribersList([])
      }
      else{
        setSubscribersList(res.data)
      }
    })
  }

  function modal(modal, changeModal) {
    changeModal(!modal)
  }

  async function subscribeUser() {
    if (id && sellerId){
      setLoading(true)

      const subscribe = {
        user_id: id + "",
        seller_id: sellerId + ""
      }

      setUserBool(prev => !prev)
      if (subscribersList?.find(el => el.id === id)){
        setSubscribersList(arr => arr.filter(el => el.id !== id))
      }else{
        setSubscribersList(arr => [...arr, {id: id, name: userProfileInfo.name, raiting: userProfileInfo.raiting, userPhoto: userProfileInfo.userPhoto}])
      }
  
      await axios.post("/api/subscriptions", subscribe)
  
      await axios.post('/api/subscribers', {user_id: '' + sellerId, subscriber_id: '' + id});
  
  
      setLoading(false)
    }

    
    

  }

  const blockUser = async (option) => {
    if (option) {
      setBlockLoading(true)
      const userBlockInfo = {
      user_id: id,
      block_user_id: sellerId,
      time: standartDate(Date.now()),
      block: true,
      }
      if (id && sellerId){
        await axios.post('/api/blockUser', userBlockInfo).then(r => console.log(r))
        setUserBlockBool(!userBlockBool)
        setBlockLoading(false)
      }
    }
    if (!option) {
      setBlockLoading(true)
      const userBlockInfo = {
      user_id: id,
      block_user_id: sellerId,
      block: false,
      }
      if (id && sellerId){
        await axios.post('/api/blockUser', userBlockInfo)
        setUserBlockBool(!userBlockBool)
      }
      setBlockLoading(false)
    }
    

  }

  
  return (
    <MetaLayout>
      <div className="clientPage text">
        <div className="clientPage__menu">
          <div key={userInfo.userId} className="clientPage__userinfo">
            <div className="clientPage__userpic">
              {isLoading ? null : <Avatar src={`${STATIC_URL}/${sellerPhoto}`} style={{ backgroundColor: `${stringToColor(sellerName)}` }}>{initials(sellerName)}</Avatar>}
            </div>
            <div className="clientPage__username">{sellerName}</div>
            <div className="clientPage__userRegDate light small">на Kvik c {createdAt ? ToRusAccountDate(createdAt) : ""}</div>
            <div className="clientPage__userrate">
              <div className="clientPage__userrate__num">{raiting}</div>
              <StarRating rating={raiting} />
            </div>
            <div className="clientPage__userstats highlight small">
              <a onClick={() => setReviewsModal(!reviewsModal)} className="offerUnpublish thin superLight userInfoReviews">
                {userInfo.userReviews}
                <div style={{ textAlign: "center" }}>
                  <div>0</div>
                  <p>отзывов</p>
                </div>
              </a>
              <a onClick={() => setSubscribersModal(!subscriptionsModal)} className="offerUnpublish thin superLight userInfoSubscribers">
                {userInfo.userSubscribers}
                <div style={{ textAlign: "center" }}>
                  <div>{subscribersList?.message ? 0 : subscribersList?.length}</div>
                  <p>подписчиков</p>
                </div>
              </a>
              <a onClick={() => setSubscriptionsModal(!subscriptionsModal)} className="offerUnpublish thin superLight userInfoSubscribtions">
                {userInfo.userSubscriptions}
                <div style={{ textAlign: "center" }}>
                  <div>{subList?.length > 0 ? subList?.length : 0}</div>
                  <p>подписок</p>
                </div>
              </a>
            </div>
            {+router.query.id == id  ? null : (
              <>
                <button disabled={loading} className="btnSubscribe" onClick={() => subscribeUser()}>{userBool ? "Отписаться" : "Подписаться"}</button>
                <button className="btnActive" disabled={blockLoading} onClick={() => setBlockOpen(true)}>
                  <span className="userActive" >{userBlockBool ? 'Разбокировать' :'Заблокировать'} пользователя</span>
                  <div className="userIconBlock">
                    <UserLock className="userActiveIcon" />
                  </div>
                </button>
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
      <Dialog open={reviewsModal || false} onClose={() => setReviewsModal(!reviewsModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        <ModalRating rate={raiting} comments={2} mobile={matchesMobile || matchesTablet ? true : false} modal={() => modal(reviewsModal, setReviewsModal)} />
      </Dialog>
      <Dialog open={subscribersModal || false} onClose={() => setSubscribersModal(!subscribersModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        <ModalSubscribers data={subscribersList} mobile={matchesMobile || matchesTablet ? true : false} modal={() => modal(subscribersModal, setSubscribersModal)} />
      </Dialog>
      <Dialog open={subscriptionsModal || false} onClose={() => setSubscriptionsModal(!subscriptionsModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        <ModalSubscription data={subList} subscription={subList.length} modal={() => modal(subscriptionsModal, setSubscriptionsModal)} mobile={matchesMobile || matchesTablet ? true : false} />
      </Dialog>
      <Dialog open={blockOpen} onClose={() => setBlockOpen(false)}>
          <DialogContent>
            <DialogContentText>
                Вы уверены, что хотите {userBlockBool ? 'разбокировать' :'заблокировать'} пользователя?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {blockUser(!userBlockBool); setBlockOpen(false)}}>{userBlockBool ? 'Разбокировать' :'Заблокировать'}</Button>
            <Button onClick={() => setBlockOpen(false)}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </MetaLayout>
  );
}
export default UserPage;
