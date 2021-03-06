``
import React, { useEffect, useState } from "react";
import StarRating from "../../components/StarRating";
import User from "../../components/User/User";
import { ToRusAccountDate, stringToColor, initials} from "../../lib/services";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  makeStyles
} from "@material-ui/core";
import { useRouter } from "next/router";
import { ModalRating,/* ModalSubscribers, ModalSubscription */} from "../../components/Modals";
// import { useAd } from "../../hooks/useAd";
// import axios from "axios"
import { useMedia } from "../../hooks/useMedia";
import { useOutherUser } from "../../hooks/useOutherUser";
// import { useSubBool } from "../../hooks/useSubscriptions";
import MetaLayout from "../../layout/MetaLayout";
import { useAuth } from "../../lib/Context/AuthCTX";
import { STATIC_URL } from "../../lib/constants";
// import { useBlockedBool } from "../../hooks/useBlocked";
// import { useUser } from "../../hooks/useUser";
import {Tooltip} from "@mui/material";
// import {getTokenDataByPost} from "../../lib/fetch";
import ScrollTop from '../../UI/ScrollTop'
import { useStore } from "#lib/Context/Store";
import { useStatistics } from "#lib/Context/StatisticsCTX";
import MobileModal from '../../components/MobileModal'
import UserPlaceHolder from '../../components/placeHolders/UserPlaceHolder/UserPlaceHolder'

const useStyles = makeStyles(() => ({
  tooltip: {
    border: "#8F8F8F solid 1px",
    background: "#FFFFFF",
    color: "#5A5A5A",
    fontSize: "12px",
    textAlign: 'center',
    maxWidth: '190px',
  },
  arrow: {
    color: '#FFFFFF',
    "&:before": {
      content: '""',
      border: "#8F8F8F solid 1px",
    }
  },
  userStats: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "none",
    color: "#00a0ab",
    transition: "all 200ms ease-in-out",
    cursor: "pointer",

    '&:hover': {
      textDecoration: "none",
    },
    '& button': {
      color: "#00a0ab",
    },
    '& button p': {
      color: "#00a0ab",
    }
  },
  buttonDesc: {
    fontSize: "11px",
  }
}));

function UserPage() {
  const {userInfo} = useStore()
  const {addSubscribers, addUnsubscribe} = useStatistics()
  const classes = useStyles();
  const router = useRouter();
  const sellerId = parseInt(router.query.id)
  const { id, /*token*/ } = useAuth()
  const sellerInfo = useOutherUser(sellerId)

  const {
    name: sellerName,
    userPhoto: sellerPhoto,
    raiting, createdAt,
    isLoading = true,
    /*sellerId,*/
    subscribers_count,
    subscriptions_count
  } = sellerInfo
  // const {userInfo} = useAd(router.query.id)
  // const  userProfileInfo  = useUser();
  // const { userSub } = useSubBool(id, sellerId)
  // const { userBlocked } = useBlockedBool(id, sellerId, token)
  const { matchesMobile, matchesTablet } = useMedia()

  const [reviewsModal, setReviewsModal] = useState(false);
  // const [subscribersModal, setSubscribersModal] = useState(false);
  const [subscriptionsModal, setSubscriptionsModal] = useState(false);
  const [userBool, setUserBool] = useState(false)
  const [userBlockBool, /*setUserBlockBool*/] = useState(false)
  // const [subList, /*setSubList*/] = useState([])
  // const [subscribersList, /*setSubscribersList */] = useState([])
  const [loading,/* setLoading*/] = useState(false)
  // const [blockLoading, setBlockLoading] = useState(false)
  const [blockOpen, setBlockOpen] = useState(false)
  const [isShowProfileDialog, setIsShowProfileDialog] = useState(true)

  const [itemNav, setItemNav] = useState({ i: 1, ttl: "????????????????" });

  useEffect(() => {
    if(!userInfo) return
    setUserBool(userInfo.subscriptions.includes(sellerId))
  }, [sellerId, userInfo])

  // useEffect(() => {
  //   setUserBool(userSub)
  // }, [userSub])

  // useEffect(() => {
  //   setUserBlockBool(userBlocked)
  // }, [userBlocked])

  useEffect(() => {
    //? ???????? ?????????? ???? ???????? ??????????????.
	  if (id && router.query.id && id == +router.query.id) {
	  router.push({pathname: `/account/${id}`, query: {account: 1, content: 1}})
  	}
  }, [id, router.query.id])


  const subscribeClickHandler = () => {
    if(!id) return

    if(userInfo && userBool) {
			addUnsubscribe(sellerId)()
			setUserBool(false)
			return
		}
		if(userInfo && !userBool) {
			addSubscribers(sellerId)()
			setUserBool(true)
			return
		}
  }

  // useEffect(() => {
  //   if (sellerId && subList.length == 0) {
  //     axios.post("/api/getSubscriptions", {user_id: sellerId}).then((res) => setSubList(res.data))
  //   }

  //   if (sellerId && subscribersList.length == 0) {
  //         changeSubscribers();
  //       }

  // }, [sellerId])

  // function changeSubscribers() {
	//   axios.post("/api/getSubscribers", {user_id: "" + sellerId}).then((res) => {
  //     if (res.data.message === 'nothing'){
  //       setSubscribersList([])
  //     }
  //     else{
  //       setSubscribersList(res.data)
  //     }
  //   })
  // }

  function modal(modal, changeModal) {
    changeModal(!modal)
  }

  // async function subscribeUser() {
  //   if (id && sellerId){
  //     setLoading(true)

  //     const subscribe = {
  //       user_id: id + "",
  //       seller_id: sellerId + ""
  //     }

  //     setUserBool(prev => !prev)
  //     if (subscribersList?.find(el => el.id === id)){
  //       setSubscribersList(arr => arr.filter(el => el.id !== id))
  //     }else{
  //       setSubscribersList(arr => [...arr, {id: id, name: userProfileInfo.name, raiting: userProfileInfo.raiting, userPhoto: userProfileInfo.userPhoto}])
  //     }

  //     await getTokenDataByPost("/api/subscriptions", subscribe, token)

  //     await getTokenDataByPost('/api/subscribers', {user_id: '' + sellerId, subscriber_id: '' + id}, token);


  //     setLoading(false)
  //   }




  // }

  // const blockUser = async (option) => {
  //   if (option) {
  //     setBlockLoading(true)
  //     const userBlockInfo = {
  //     user_id: id,
  //     block_user_id: sellerId,
  //     time: standartDate(Date.now()),
  //     block: true,
  //     }
  //     if (id && sellerId){
  //       await axios.post('/api/blockUser', userBlockInfo).then(r => console.log(r))
  //       setUserBlockBool(!userBlockBool)
  //       setBlockLoading(false)
  //     }
  //   }
  //   if (!option) {
  //     setBlockLoading(true)
  //     const userBlockInfo = {
  //     user_id: id,
  //     block_user_id: sellerId,
  //     block: false,
  //     }
  //     if (id && sellerId){
  //       await axios.post('/api/blockUser', userBlockInfo)
  //       setUserBlockBool(!userBlockBool)
  //     }
  //     setBlockLoading(false)
  //   }
  // }

  const userContent = () => {
    return (
      <>
        {isLoading ? <UserPlaceHolder /> :
          <>
            <div className="clientPage__menu">
              <div className="clientPage__userinfo">
                <div className="clientPage__userpic">
                  {isLoading
                  ?
                  null
                  :
                  <Avatar
                    src={`${STATIC_URL}/${sellerPhoto}`}
                    style={{ backgroundColor: `${stringToColor(sellerName)}` }}
                  >
                      {initials(sellerName)}
                  </Avatar>}
                </div>

                <div className="clientPage__username">{sellerName}</div>
                <div className="clientPage__userRegDate light small">???? Kvik c {createdAt ? ToRusAccountDate(createdAt) : ""}</div>

                <Tooltip title="?? ????????????????????" arrow  classes={{tooltip: classes.tooltip, arrow: classes.arrow}}>
                  <div className="clientPage__userrate">
                    <div className="clientPage__userrate__num">{raiting}</div>
                    <StarRating rating={raiting} />
                  </div>
                </Tooltip>



                <div className="clientPage__userstats highlight small">


                  <Tooltip title="?? ????????????????????" arrow  classes={{tooltip: classes.tooltip, arrow: classes.arrow}}>
                    <Box className={classes.userStats}>
                      <span>{'0'}</span>
                      <Button className={classes.buttonDesc} size="small" variant="text" disabled onClick={() => setReviewsModal(!reviewsModal)} >
                        <p>????????????</p>
                      </Button>
                    </Box>
                  </Tooltip>

                  {/*<a  className="offerUnpublish thin superLight userInfoReviews">*/}
                  {/*  */}
                  {/*  <div style={{ textAlign: "center" }}>*/}
                  {/*    <div>0</div>*/}
                  {/*    <p>??????????????</p>*/}
                  {/*  </div>*/}
                  {/*</a>*/}



                  <Box className={classes.userStats}>
                    <span>{subscribers_count}</span>
                    <Button className={classes.buttonDesc} size="small" variant="text" /*onClick={() => setSubscribersModal(!subscriptionsModal)}*/>
                      <p>??????????????????????</p>
                    </Button>
                  </Box>

                  {/*<a  className="offerUnpublish thin superLight userInfoSubscribers">*/}
                  {/*  */}
                  {/*  <div style={{ textAlign: "center" }}>*/}
                  {/*    <div>{subscribersList?.message ? 0 : subscribersList?.length}</div>*/}
                  {/*    <p>??????????????????????</p>*/}
                  {/*  </div>*/}
                  {/*</a>*/}


                  <Box className={classes.userStats}>
                    <span>{subscriptions_count}</span>
                    <Button className={classes.buttonDesc} size="small" variant="text"  onClick={() => setSubscriptionsModal(!subscriptionsModal)} >
                      <p>????????????????</p>
                    </Button>
                  </Box>

                  {/*<a  className="offerUnpublish thin superLight userInfoSubscribtions">*/}
                  {/*  {userInfo.userSubscriptions}*/}
                  {/*  <div style={{ textAlign: "center" }}>*/}
                  {/*    <div>{subList?.length > 0 ? subList?.length : 0}</div>*/}
                  {/*    <p>????????????????</p>*/}
                  {/*  </div>*/}
                  {/*</a>*/}


                </div>



                {+router.query.id === id  ? null : (
                  <>
                    <button
                      disabled={loading}
                      className="btnSubscribe"
                      // onClick={() => subscribeUser()}
                      onClick={() => {
                        setUserBool(!userBool)
                        subscribeClickHandler()
                      }}
                    >
                        {userBool ? "????????????????????" : "??????????????????????"}
                      </button>
                    <div className="ad__block_bottom__adaptive_right">
                      {/*<a className="SellerInfoShutUp small light underline" onClick={() => {*/}
                      {/*  if (!blockLoading) setBlockOpen(true)*/}
                      {/*}}>{userBlockBool ? '??????????????????????????' :'??????????????????????????'} ????????????????????????</a>*/}
                      <a className="SellerInfoComplain small light underline">????????????????????????</a>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="clientPage__container">
              <User itemNav={itemNav} setItemNav={setItemNav} />
            </div>
            <ScrollTop />
          </>
        }
      </>
    )
  }

  const userContentMobile = () => {
    return (
      <MobileModal
        title="??????????????"
        dialog={isShowProfileDialog || false}
        close={() => {
          // TODO: ???????????????? ?????????????? ???? ???????????????????? ????????????????
          // router.push('/')
          // .then(() => {
          //     setIsShowProfileDialog((prevState => !prevState))
          // })
          router.back()
          setIsShowProfileDialog(prevState => !prevState)
        }}
      >
        {userContent()}
      </MobileModal>
    )
  }

  return (
    <MetaLayout>
      <div className="clientPage text">
        {matchesMobile ? userContentMobile() : userContent()}
      </div>
      <Dialog open={reviewsModal || false} onClose={() => setReviewsModal(!reviewsModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        <ModalRating rate={raiting} comments={2} mobile={matchesMobile || matchesTablet ? true : false} modal={() => modal(reviewsModal, setReviewsModal)} />
      </Dialog>
      {/* <Dialog open={subscribersModal || false} onClose={() => setSubscribersModal(!subscribersModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        <ModalSubscribers data={subscribersList} mobile={matchesMobile || matchesTablet ? true : false} modal={() => modal(subscribersModal, setSubscribersModal)} />
      </Dialog> */}
      {/* <Dialog open={subscriptionsModal || false} onClose={() => setSubscriptionsModal(!subscriptionsModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        <ModalSubscription data={subList} subscription={subList.length} modal={() => modal(subscriptionsModal, setSubscriptionsModal)} mobile={matchesMobile || matchesTablet ? true : false} />
      </Dialog> */}
      <Dialog open={blockOpen} onClose={() => setBlockOpen(false)}>
          <DialogContent>
            <DialogContentText>
                ???? ??????????????, ?????? ???????????? {userBlockBool ? '??????????????????????????' :'??????????????????????????'} ?????????????????????????
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/*<Button onClick={() => {blockUser(!userBlockBool); setBlockOpen(false)}}>{userBlockBool ? '??????????????????????????' :'??????????????????????????'}</Button>*/}
            <Button onClick={() => setBlockOpen(false)}>????????????</Button>
        </DialogActions>
      </Dialog>
    </MetaLayout>
  );
}
export default UserPage;
