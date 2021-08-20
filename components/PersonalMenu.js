import { useState } from "react";

function showSignIn() {
  var signInShow = document.getElementById("signIn");
  var signInMainContainerShow = document.getElementById(
    "signInMainContainer"
  );
  if (
    signInShow.style.display === "none" ||
    signInMainContainerShow.style.display === "none"
  ) {
    signInShow.style.display = "grid";
    signInMainContainerShow.style.display = "grid";
  }
  var hideOverflow = document.getElementById("body");
  if (hideOverflow.style.overflow === "visible" && hideOverflow != null) {
    hideOverflow.style.overflow = "hidden";
  } else {
    hideOverflow.style.overflow = "hidden";
  }
}

function PersonalAccountMenu_component() {
  function accountMenuBackground() {
    var accountMenu = document.querySelector(".account_menu");
    var accountMenuBackground = document.querySelector(".account_menu__background");
    if (!accountMenu.classList.contains("hide")) {
      accountMenu.classList.remove('account_menu-active');
      accountMenuBackground.classList.remove('account_menu__background-active');
      accountMenu.classList.add('hide');
    }
  }

  const [menuItem, setMenuItem] = useState({ i: 1, itm: 'menuOffers', ttl: 'Мои объявления' });

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

  return (
    <div className="account_menu hide">
      <div className="account_menu__background">
        <div className="account_menu__wrapper">
          <div className="account_menu__header">
            <button className="account_menu__back" type="reset" onClick={accountMenuBackground} />
            <h6>Личный кабинет</h6>
          </div>

          {typeof userAuth !== 'undefined' ?
            <div className="account_menu__block_links">
              {menuItems.map(item => {
                return (
                  <a key={item.id} onClick={() => setMenuItem({ i: item.id, itm: item.name, ttl: item.title })} className={item.name + ((item.title === menuItem.ttl) ? (` ${item.name} smooth__menu`) : (' smooth__menu'))}>{item.title}</a>
                )
              })}
            </div> : ''}
          <div className="account_menu__block__log_sign">
            {typeof userAuth !== 'undefined' ? <a className="smooth__menu menu__log_sign"> Выход </a> : <a className="smooth__menu menu__log_sign" id="" onClick={showSignIn}> Войти</a>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalAccountMenu_component