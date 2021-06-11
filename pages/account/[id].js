import React, { useState } from "react";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StarRating from '../../components/StarRating';
import Offers from '../../components/account/Offers/Offers';
import Deals from '../../components/account/Deals/Deals';
import Wallet from '../../components/account/Wallet/Wallet';
import Favorites from '../../components/account/Favorites/Favorites';
import Notifications from '../../components/account/Notifications/Notifications';
import Compare from '../../components/account/Compare/Compare';
import Reviews from '../../components/account/Reviews/Reviews';
import Settings from '../../components/account/Settings/Settings';
import UserPicUpload from '../../components/UserPicUpload';
import Modal from '../../components/Modal';
import { standartDate } from '../../components/services';
import { modalRating, modalSubscribers, modalSubscription, modalLogout } from '../../components/Modals';

let userInfo = {};
if (typeof userAuth !== 'undefined') {
  userInfo = {
    userId: 1,
    userPic: '',
    userName: userAuth.name,
    userDateReg: standartDate(userAuth.created_at),
    userRate: 3.5,
    userReviews: 0,
    userSubscribers: 0,
    userSubscriptions: 0
  };
} else {
  userInfo = {
    userId: 1,
    userPic: '',
    userName: 'Имя пользователя',
    userDateReg: '21.56.7676',
    userRate: 3.2,
    userReviews: 0,
    userSubscribers: 0,
    userSubscriptions: 0
  };
}

const menuItems = [
  { id: 1, name: 'menuOffers', title: 'Мои объявления' },
  { id: 2, name: 'menuDeals', title: 'Сделки' },
  { id: 3, name: 'menuWallet', title: 'Кошелек' },
  { id: 4, name: 'menuFavorites', title: 'Избранное' },
  { id: 5, name: 'menuNotifications', title: 'Уведомления' },
  { id: 6, name: 'menuCompare', title: 'Сравнить' },
  { id: 7, name: 'menuReviews', title: 'Отзывы' },
  { id: 8, name: 'menuSettings', title: 'Настройки' }
];

function Account() {
  const [menuItem, setMenuItem] = useState({ i: 1, itm: 'menuOffers', ttl: 'Мои объявления' });
  const [modal, setModal] = useState({});
  function modalOlen(e, size, content, title) {
    function smf() {
      setModal({ title: title, content: content, size: size, isOpen: false });
    }
    e.preventDefault();
    setModal({ title: title, content: content, size: size, isOpen: true });
    setTimeout(smf, 500);
  }

  return (
    <div className="userOffersPage" id="user">
      <Header />
      <div className="clientPage text">
        <div className="clientPage__breadcrumbs thin">
          <a className="breadCrumb light" href="/">Главная</a>
          <a className="breadCrumb line light" href="/user">Личный кабинет</a>
          {menuItem && <a className="line">{menuItem.ttl}</a>}
        </div>
        <div className="clientPage__menu">
          <div key={userInfo.userId} className="clientPage__userinfo">
            <div className="clientPage__userpic">
              {userInfo.userPic && <img src={userInfo.userPic} /> || <div className="clientPage__userinitials" style={{ backgroundColor: `${userInfo.userName.toColor()}` }}>{userInfo.userName.initials()}</div>}
              <button onClick={e => { modalOlen(e, 'md', <UserPicUpload {...{ route: '', imageType: 'webp', optimiztionLevel: 0.7, maxScale: 5 }} />) }} className="addPhoto"></button>
            </div>
            <div className="clientPage__username">
              {userInfo.userName}
            </div>
            <div className="clientPage__userRegDate light small">
              на Kvik c {userInfo.userDateReg}
            </div>
            <div className="clientPage__userrate">
              <div className="clientPage__userrate__num">{userInfo.userRate}</div>
              <StarRating {...{ rating: userInfo.userRate }} />
            </div>
            <div className="clientPage__userstats highlight small">
              <a onClick={e => { modalOlen(e, 'lg', modalRating(userInfo.userRate)) }} className="offerUnpublish thin superLight" className="userInfoReviews">
                {userInfo.userReviews}
                <p>отзывов</p>
              </a>
              <a onClick={e => { modalOlen(e, 'lg', modalSubscribers(userInfo)) }} className="offerUnpublish thin superLight" className="userInfoSubscribers">
                {userInfo.userSubscribers}
                <p>подписчиков</p>
              </a>
              <a onClick={e => { modalOlen(e, 'lg', modalSubscription(userInfo)) }} className="offerUnpublish thin superLight" className="userInfoSubscribtions">
                {userInfo.userSubscriptions}
                <p>подписок</p>
              </a>
            </div>
          </div>
          <div className="userMenuContainer">
            {menuItems.map(item => {
              return (
                <a key={item.id} onClick={() => setMenuItem({ i: item.id, itm: item.name, ttl: item.title })} className={item.name + ((item.title === menuItem.ttl) ? (` ${item.name}Active highlight smooth`) : (' smooth'))}>{item.title}</a>
              )
            })}
            <a onClick={e => { modalOlen(e, 'sm', modalLogout()) }} className="offerUnpublish thin superLight" className="menuLogoff smooth">Выход</a>
          </div>
        </div>
        <div className="clientPage__container">
          {
            (((menuItem.i === 1) && <Offers />) ||
              ((menuItem.i === 2) && <Deals />) ||
              ((menuItem.i === 3) && <Wallet />) ||
              ((menuItem.i === 4) && <Favorites />) ||
              ((menuItem.i === 5) && <Notifications />) ||
              ((menuItem.i === 6) && <Compare />) ||
              ((menuItem.i === 7) && <Reviews />) ||
              ((menuItem.i === 8) && <Settings />))
          }
        </div>
      </div>
      <div className="userPageWhiteSpace"></div>
      <Footer />
      <Modal {...modal} />
    </div >

  );
}
export default Account;