import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
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
import { standartDate, ToRusAccountDate } from "../../lib/services";
import { modalRating, modalSubscribers, modalSubscription, modalLogout } from "../../components/Modals";
import { useUser } from "../../hooks/useUser";
import { useAd } from "../../hooks/useAd";
import { Avatar, Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import { mutate } from "swr";

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

  const { isAuth, isLoading, username, photo, createdAt, raiting, id } = useUser();



  const [menuItem, setMenuItem] = useState({ i: 1, itm: "menuOffers", ttl: "Мои объявления" });
  const [openPicUpload, setPicUpload] = useState(false);
  const [logout, setLogout] = useState(false);

  //!! Modal
  const [reviewsModal, setReviewsModal] = useState(false);
  const [subscribersModal, setSubscribersModal] = useState(false);
  const [subscriptionsModal, setSubscriptionsModal] = useState(false);


  const signOut = () => {
    axios.get("/api/logout").then(() => {
      mutate("/api/user");
      router.push("/");
    });
  };

  return (
    <MainLayout title={"Личный кабинет"}>
      {/* <div className="userOffersPage" id="user"> */}
      <div className="clientPage text">
        <div className="clientPage__breadcrumbs thin">
          <a className="breadCrumb light" href="/">
            Главная
          </a>
          <a className="breadCrumb line light" href="/user">
            Личный кабинет
          </a>
          {menuItem && <a className="line">{menuItem.ttl}</a>}
        </div>
        <div className="clientPage__menu">
          <div key={userInfo.userId} className="clientPage__userinfo">
            <div className="clientPage__userpic">
              {isAuth && !isLoading && (
                <Avatar src={photo} style={{ backgroundColor: `${username.toColor()}` }}>
                  {username.initials()}
                </Avatar>
              )}
              <button onClick={() => setPicUpload(!openPicUpload)} className="addPhoto"></button>
            </div>
            <div className="clientPage__username">{username}</div>
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
                {userInfo.userSubscriptions}
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
        <div className="clientPage__container">{(menuItem.i === 1 && <Offers router={router} />) || (menuItem.i === 2 && <Deals />) || (menuItem.i === 3 && <Wallet />) || (menuItem.i === 4 && <Favorites id={id}/>) || (menuItem.i === 5 && <Notifications />) || (menuItem.i === 6 && <Compare />) || (menuItem.i === 7 && <Reviews />) || (menuItem.i === 8 && <Settings username />)}</div>
      </div>
      <div className="userPageWhiteSpace"></div>
      <Dialog open={openPicUpload} onClose={() => setPicUpload(!openPicUpload)} fullWidth maxWidth="xs">
        <UserPicUpload {...{ route: "", imageType: "webp", optimiztionLevel: 0.7, maxScale: 5 }} />
      </Dialog>
      <Dialog open={logout} onClose={() => setLogout(!logout)} fullWidth maxWidth="xs">
        <DialogTitle>Вы уверены, что хотите выйти?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setLogout(!logout)} color="primary" variant="text">
            Отмена
          </Button>
          <Button onClick={() => signOut()}>Выйти</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={reviewsModal} onClose={() => setReviewsModal(!reviewsModal)}>
        {modalRating(2, 2)}
      </Dialog>
      <Dialog open={subscribersModal} onClose={() => setSubscribersModal(!subscribersModal)}>
        {modalSubscribers(4, 2)}
      </Dialog>
      <Dialog open={subscriptionsModal} onClose={() => setSubscriptionsModal(!subscriptionsModal)}>
        {modalSubscription(3, 4)}
      </Dialog>
    </MainLayout>
  );
}
export default Account;
