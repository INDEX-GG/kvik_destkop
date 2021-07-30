import { useState, useEffect } from "react";
import MetaLayout from "../../layout/MetaLayout";
import StarRating from "../../components/StarRating";
import Offers from "../../components/account/Offers/Offers";
import Deals from "../../components/account/Deals/Deals";
import Wallet from "../../components/account/Wallet/Wallet";
import Favorites from "../../components/account/Favorites/Favorites";
import Notifications from "../../components/account/Notifications/Notifications";
import Compare from "../../components/account/Compare/Compare";
import Reviews from "../../components/account/Reviews/Reviews";
import Settings from "../../components/account/Settings/Settings";
import UserPicUpload from "../../components/UserPicUpload";
import { initials, stringToColor, ToRusAccountDate } from "../../lib/services";
import { ModalRating, ModalSubscribers, ModalSubscription } from "../../components/Modals";
import { useUser } from "../../hooks/useUser";
import { Avatar, Button, Dialog, DialogTitle } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { useMedia } from "../../hooks/useMedia";
import { useAuth } from "../../lib/Context/AuthCTX";
import { useMutate } from "../../lib/Context/MutateCTX";


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

const menuItems = [
  { id: 1, name: "menuOffers", title: "Мои объявления" },
  { id: 2, name: "menuDeals", title: "Сделки" },
  { id: 3, name: "menuWallet", title: "Кошелек" },
  { id: 4, name: "menuFavorites", title: "Избранное" },
  { id: 5, name: "menuNotifications", title: "Уведомления" },
  { id: 6, name: "menuCompare", title: "Сравнить" },
  { id: 7, name: "menuReviews", title: "Отзывы" },
  { id: 8, name: "menuSettings", title: "Настройки" },
];

function Account() {
  const router = useRouter();
  const {mutateAvatar} = useMutate();
  const [avatar, setAvatar] = useState();
  const { isLoading, name, userPhoto, createdAt, raiting, subscriptions } = useUser();
  


  const {signOut, id} = useAuth();

  const [menuItem, setMenuItem] = useState(router.query.favorite === '' ? { i: 4, itm: "menuFavorites", ttl: "Избранное" } : { i: 1, itm: "menuOffers", ttl: "Мои объявления" });

  const [openPicUpload, setPicUpload] = useState(false);
  const [logout, setLogout] = useState(false);

  //!! Modal
  const [reviewsModal, setReviewsModal] = useState(false);
  const [subscribersModal, setSubscribersModal] = useState(false);
  const [subscriptionsModal, setSubscriptionsModal] = useState(false);

  const {matchesMobile, matchesTablet} = useMedia()

  function closeModal(modal, changeModal) {
    changeModal(!modal)
  }

  const closePicUpload = () => {
	  setPicUpload(p => !p)
  }

  useEffect(() => {
	setAvatar(`${userPhoto}?${Date.now()}`)
  }, [userPhoto, mutateAvatar]);

  const logOut = () => {
    axios.get("/api/logout").then(() => {
      mutate("/api/user");
	  signOut();
      router.push("/");
    });
  };

  return (
    <MetaLayout title={"Личный кабинет"}>
      {/* <div className="userOffersPage" id="user"> */}
      <div className="clientPage text">
        <div className="clientPage__breadcrumbs thin">
          <a className="breadCrumb light" href="/">
            Главная
          </a>
          <a className="breadCrumb line light" href={id}>
            Личный кабинет
          </a>
          {menuItem && <a className="line">{menuItem.ttl}</a>}
        </div>
        <div className="clientPage__menu">
          <div className="clientPage__userinfo">
            <div className="clientPage__userpic">
              {!isLoading && (
                <Avatar src={avatar} style={{ backgroundColor: `${stringToColor(name)}` }}>
                  {initials(name)}
                </Avatar>
              )}
              <button onClick={() => setPicUpload(!openPicUpload)} className="addPhoto"></button>
            </div>
            <div className="clientPage__username">{name}</div>
            <div className="clientPage__userRegDate light small">на Kvik c {ToRusAccountDate(createdAt)}</div>
            <div className="clientPage__userrate">
              <div className="clientPage__userrate__num">{raiting}</div>
              <StarRating {...{ rating: raiting }} />
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
                { subscriptions ? JSON.parse(subscriptions)?.length: '0'}
                <p>подписок</p>
              </a>
            </div>
          </div>
          <div className="userMenuContainer">
            {menuItems.map((item) => {
              return (
                <a key={item.id} onClick={() => setMenuItem({ i: item.id, itm: item.name, ttl: item.title })} className={item.name + (item.title === menuItem.ttl ? ` ${item.name}Active highlight smooth` : " smooth")}>
                  {item.title}
                </a>
              );
            })}
            <a onClick={() => setLogout(!logout)} className="offerUnpublish thin superLight" className="menuLogoff smooth">
              Выход
            </a>
          </div>
        </div>
        <div className="clientPage__container">{(menuItem.i === 1 && <Offers router={router} />) || (menuItem.i === 2 && <Deals />) || (menuItem.i === 3 && <Wallet />) || (menuItem.i === 4 && <Favorites router={router.query.id}/>) || (menuItem.i === 5 && <Notifications />) || (menuItem.i === 6 && <Compare />) || (menuItem.i === 7 && <Reviews />) || (menuItem.i === 8 && <Settings username />)}</div>
      </div>
      <div className="userPageWhiteSpace"></div>
      <Dialog open={openPicUpload} onClose={() => setPicUpload(p => !p)} fullWidth maxWidth="xs">
        <UserPicUpload {...{ imageType: "webp", optimiztionLevel: 0.7, maxScale: 5, Close: closePicUpload }} />
      </Dialog>
      <Dialog open={logout} onClose={() => setLogout(!logout)} fullWidth maxWidth="xs">
        <DialogTitle className="accountLogout">Вы уверены, что хотите выйти?</DialogTitle>
        <div className="accountLogoutBtnBox">
          <Button onClick={() => setLogout(!logout)} variant="text" color="primary" style={{textTransform:"uppercase"}}>
            Отмена
          </Button>
          <Button onClick={() => logOut()} className="accountLogoutYes" style={{color:"red", textTransform:"uppercase"}}>Выйти</Button>
        </div>
      </Dialog>
      <Dialog open={reviewsModal} onClose={() => setReviewsModal(!reviewsModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        {<ModalRating rate={2} comments={2} modal={() => closeModal(reviewsModal, setReviewsModal)} mobile={matchesTablet || matchesMobile}/>}
      </Dialog>
      <Dialog open={subscribersModal} onClose={() => setSubscribersModal(!subscribersModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        <ModalSubscribers data={5} subscribers={10} modal={() => closeModal(subscribersModal, setSubscribersModal)} mobile={matchesTablet || matchesMobile}/>
      </Dialog>
      <Dialog open={subscriptionsModal} onClose={() => setSubscriptionsModal(!subscriptionsModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
        <ModalSubscription data={5} subscription={1} modal={() => closeModal(subscriptionsModal, setSubscriptionsModal)} mobile={matchesTablet || matchesMobile}/>
      </Dialog>
    </MetaLayout>
  );
}
export default Account;
