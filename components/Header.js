import React, { useState, useEffect } from "react";
import Logo from 'next/image';
// import searchIcon from "../../images/header/searchIcon.svg";
// import createDealIcon from "../../images/header/plus.svg";
// import dropMenuIcon from "../../images/header/dropMenu.svg";
// import radioFalse from "../../images/header/radioFalse.svg";
// import radioTrue from "../../images/header/radioTrue.svg";
// import userPic from '../../images/header/userPic.svg'
// import personalAccount from "../../../icons/personal_account.svg";
// import SignIn from "../auth/signin";
import HeaderCategories from './HeaderCategories';
import PersonalMenu from './PersonalMenu';
// import qs from 'qs';
const axios = require('axios');

function Header() {

const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [num3, setNum3] = useState();
  const [num4, setNum4] = useState();
  var num = [num1, num2, num3, num4]
  var numAsString = num.join('');
  // var csrf_token = document.getElementById('csrf-token')
  // var checkAuth = document.getElementById('checkerAuth')

  function changeCursor(x) {
    var ml = ~~x.getAttribute('maxlength');
    if (ml && x.value.length >= ml) {
      do {
        x = x.nextSibling;
      }
      while (x && !(/text/.test(x.type)));
      if (x && /text/.test(x.type)) {
        x.focus();
      }
    }
  }

  const options = {
    // method: 'POST',
    // headers: { 'content-type': 'application/x-www-form-urlencoded', 'X-CSRF-TOKEN': csrf_token.content },
    // data: numAsString,
    // url: '/confirm'
  };
  function hideAuth() {
    var checkerPhoneBlock = document.getElementById("checkerPhoneBlock");
    var checkerPhoneBack = document.getElementById("checkerPhoneBack");

    if (checkerPhoneBlock.style.display === "block") {
      checkerPhoneBlock.style.display = "none";
      checkerPhoneBack.style.display = "none";
    }

    var showOverflow = document.getElementById("body");
    if (showOverflow.style.overflow === "hidden") {
      showOverflow.style.overflow = "visible";
    } else {
      showOverflow.style.overflow = "visible";
    }
  }
  function showSignIn() {
    var signInShow = document.getElementById("signIn");
    var signInMainContainerShow = document.getElementById("signInMainContainer");

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

  function showCategories() {
    var showBlockBg2 = document.querySelector(".headerCategories__background");
    var showCategories2 = document.querySelector(".headerCategories");
    var dropMenuIcon = document.querySelector('.dropMenuIcon');

    if (showCategories2.classList.contains('hide')) {
      showCategories2.classList.add('HeaderCategories-active');
      showBlockBg2.classList.add('headerCategories__background-active');
      showCategories2.classList.remove('hide');
      dropMenuIcon.style.transition = "all 100ms ease-in-out";
      dropMenuIcon.style.transform = "rotate(-180deg)";

    } else {
      showCategories2.classList.remove('HeaderCategories-active');
      showBlockBg2.classList.remove('headerCategories__background-active');
      showCategories2.classList.add('hide');
      dropMenuIcon.style.transition = "all 100ms ease-in-out";
      dropMenuIcon.style.transform = "rotate(0)";

    }
  }

  function showUserMenu() {
    var accountMenuBackground2 = document.querySelector('.account_menu__background');
    var accountMenu2 = document.querySelector('.account_menu')

    if (accountMenu2.classList.contains('hide')) {
      accountMenu2.classList.add('account_menu-active');
      accountMenuBackground2.classList.add('account_menu__background-active');
      accountMenu2.classList.remove('hide');
    } else {
      accountMenu2.classList.remove('account_menu-active');
      accountMenuBackground2.classList.remove('account_menu__background-active');
      accountMenu2.classList.add('hide');

    }
  }

  function showSearchOptions() {
    var showSearchOptions = document.getElementById("headerShadowHideSettings");
    if (showSearchOptions.style.display === "none") {
      showSearchOptions.style.display = "block";
    }
    var oldScrollY = 0;
    var headerShadowHideSettings = document.getElementById(
      "headerShadowHideSettings"
    );
    window.onscroll = function () {
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      var dY = scrolled - oldScrollY;

      if (dY > 1) {
        headerShadowHideSettings.style.display = "none";
      }
      oldScrollY = scrolled;
    };
  }

  function onlyPhotoRadioTrue() {
    var searchOptionTrue = document.getElementById("onlyPhotoRadioTrue");
    if (searchOptionTrue.style.display === "none") {
      searchOptionTrue.style.display = "block";
      searchOptionTrue.style.position = "relative";
      searchOptionTrue.style.bottom = "17px";
    }
  }

  function onlyPhotoRadioFalse() {
    var searchOptionTrue = document.getElementById("onlyPhotoRadioTrue");
    if (searchOptionTrue.style.display === "block") {
      searchOptionTrue.style.display = "none";
    }
  }

  function safeDealRadioTrue() {
    var searchOptionTrue = document.getElementById("safeDealRadioTrue");
    if (searchOptionTrue.style.display === "none") {
      searchOptionTrue.style.display = "block";
      searchOptionTrue.style.position = "relative";
      searchOptionTrue.style.bottom = "17px";
    }
  }
  
  function safeDealRadioFalse() {
    var searchOptionTrue = document.getElementById("safeDealRadioTrue");
    if (searchOptionTrue.style.display === "block") {
      searchOptionTrue.style.display = "none";
    }
  }

  function saveSearchRadioTrue() {
    var searchOptionTrue = document.getElementById("saveSearchRadioTrue");
    if (searchOptionTrue.style.display === "none") {
      searchOptionTrue.style.display = "block";
      searchOptionTrue.style.position = "relative";
      searchOptionTrue.style.bottom = "17px";
    }
  }

  function saveSearchRadioFalse() {
    var searchOptionTrue = document.getElementById("saveSearchRadioTrue");
    if (searchOptionTrue.style.display === "block") {
      searchOptionTrue.style.display = "none";
    }
  }

/*   window.onload = function () {
    var authHeader = document.getElementById('authHeader');
    var userPicVar = document.getElementById('userPic');

    if (checkAuth.content == 'true' && userPicVar != null) {
      userPicVar.style.display = 'inline-block'
      authHeader.style.display = 'none'
    } if (checkAuth.content == 'false' && authHeader != null) {
      authHeader.style.display = 'inline-block'
    }
  } */

  var showPhoneChecker = () => {
    var checkerFormPhone = document.getElementById('checkerFormPhone')
    var checkerPhoneBlock = document.getElementById('checkerPhoneBlock')
    var checkerPhoneBack = document.getElementById('checkerPhoneBack')
    if (checkerFormPhone.content == 'true' && checkerPhoneBlock.style.visibility == 'hidden') {
      checkerPhoneBlock.style.visibility = 'visible'
      checkerPhoneBack.style.display = 'block'
    }
  }

  function subBtnChecker() {
    var unSubBtnNum = document.getElementById('unSubBtnNum')
    var subBtnNum = document.getElementById('subBtnNum')
    if (numAsString.length == 4 && unSubBtnNum !== null && subBtnNum !== null) {
      subBtnNum.style.display = 'block'
      unSubBtnNum.style.display = 'none'
    } if (numAsString.length < 4 && unSubBtnNum !== null && subBtnNum !== null) {
      var unSubBtnNum = document.getElementById('unSubBtnNum')
      var subBtnNum = document.getElementById('subBtnNum')
      subBtnNum.style.display = 'none'
      unSubBtnNum.style.display = 'block'

    }
  }

  /* Если зашел админ то тру и панель меняется */
const userAdminInfo = false;

  return (
   <div id="header" className="header" /* onLoad={showPhoneChecker} */ >
      <div className="headerShadowHide" id="headerShadowHide"  >
        <HeaderCategories />
        <PersonalMenu />
        {/* <SignIn /> */}
        <div className="headerMainContainer">
          <div className='headerMobileLeftMenu'>
            <button className="burger__menu" /* onClick={showCategories} */>
              <span>
              </span>
            </button>
          </div>

          <a href="/">

            <Logo width={200} height={100} alt="Picture of the author" src='/icons/logo.svg'/>
          </a>
          <button className="categories" /* onClick={showCategories} */>
            <div className="categoriesTitle">Категории</div>
            <img className="dropMenuIcon" /* src={dropMenuIcon} */ alt="" />
          </button>
         

          <div className="mainSearch__block">
            <button className="mainSearch">
              <input
                className="mainSearchInput"
                placeholder="Поиск по объявлениям"
                /* onClick={showSearchOptions} */
              />
              <a href="/search">
                <img className="mainSearchIcon" /* src={searchIcon} */ alt="" />
              </a>
            </button>

            <div id="headerShadowHideSettings" className="headerShadowHideSettings" style={{ display: "none" }}>
              <div className="searchSettingsButtons">
                <div className="onlyPhoto">
                  <button type="submit" className="onlyPhotoRadio">
                    <img
                      className="onlyPhotoRadioFalse"
                      id="onlyPhotoRadioFalse"
                  /*     onClick={onlyPhotoRadioTrue} */
                 /*      src={radioFalse} */
                    />
                    <img
                      /* onClick={onlyPhotoRadioFalse} */
                      className="onlyPhotoRadioTrue"
                      id="onlyPhotoRadioTrue"
                      /* src={radioTrue} */
                      style={{ display: "none" }}
                    />
                  </button>
                  <div className="onlyPhotoTitle"> Только с фото </div>
                </div>
                <div className="safeDeal">
                  <button type="submit" className="safeDealRadio">
                    <img
                      className="safeDealRadioFalse"
                      id="safeDealRadioFalse"
                      /* onClick={safeDealRadioTrue} */
                      /* src={radioFalse} */
                    />
                    <img
                      className="safeDealRadioTrue"
                      id="safeDealRadioTrue"
                      /* onClick={safeDealRadioFalse} */
                      /* src={radioTrue} */
                      style={{ display: "none" }}
                    />
                  </button>
                  <div className="safeDealTitle"> Безопасная сделка </div>
                </div>
                <div className="saveSearch">
                  <button type="submit" className="saveSearchRadio">
                    <img
                      className="saveSearchRadioFalse"
                      id="saveSearchRadioFalse"
                      /* src={radioFalse} */
                      /* onClick={saveSearchRadioTrue} */
                    />
                    <img
                      className="saveSearchRadioTrue"
                      id="saveSearchRadioTrue"
                      style={{ display: "none" }}
                      /* src={radioTrue} */
                     /*  onClick={saveSearchRadioFalse} */
                    />
                  </button>
                  <div className="saveSearchTitle"> Сохранить поиск </div>
                </div>
              </div>
            </div>
          </div>


          <div className="filter__burger filter__burger-active  ">
            <span>99</span>
          </div>
          
          {userAdminInfo ? '' : <button className="createDeal">
            <a href="/createoffer" className="createOfferLink">
              <img className="createDealIcon" /* src={createDealIcon} */ alt="" />
              <div className="createDealTitle">Подать объявление</div>
            </a>
          </button>}

          <button
            className="authHeader"
            id="authHeader"
            // onClick={showSignIn}
            style={{
              display: 'none'
            }}
          >
            Войти
          </button>
          <button className='headerMobileRightMenu' /* onClick={showUserMenu} */ ><img /* src={personalAccount} */ className='personalAccount' /></button>

          <a
            href='/user'
            className="userPic"
            id="userPic"
            style={{
              display: 'none'
            }}>
            <img /* src={userPic} */ />
          </a>
        </div>

      </div>
      <button type="reset" className="checkerPhoneBack" id="checkerPhoneBack" /* onClick={hideAuth}  */style={{ display: 'none' }} />{" "}
      <div id="checkerPhoneBlockContainer" 
    //   action={route('register.numberConfirm')} 
      className='checkerPhoneBlockContainer' style={{ display: 'grid', gridTemplateColumns: 'auto 652px auto', gridTemplateRows: 'auto 279px auto', zIndex: '2', visibility: 'hidden', position: 'relative' }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
       {/*  <form method='POST' id="checkerPhoneBlock" 
        action={route('register.numberConfirm')} 
        name='checkerPhoneBlock' className='checkerPhoneBlock' style={{ display: 'block', zIndex: '2', visibility: 'hidden', width: '652px', height: '279px', position: 'relative', userSelect: 'none' }}>
          <input type="hidden" name="_token" value={csrf_token.content} />
          <input type="hidden" name="_method" value="POST" />
          <input type="hidden" name="inputNumber" value={numAsString} />
          <div style={{ width: '608px', height: '279px', background: 'white', boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.15)', borderRadius: '8px' }}>
            <div style={{ textAlign: 'center', position: 'relative', fontFamily: 'ubuntu-medium', fontSize: '22px', top: '32px' }}>Регистрация</div>
            <div style={{ textAlign: 'center', position: 'relative', left: '130px', fontFamily: 'ubuntu', fontSize: '14px', color: '#C7C7C7', width: '328px', height: '48px', top: '48px' }}>На указанный телефон будет совершен звонок.
            Пожалуйста введите последние 4 цифры
            звонящего номера в поле ниже.</div>
            <div className='checkerPhoneBlockNumInputBlock' onLoad={subBtnChecker()} style={{ width: '250px', height: '32px', position: 'relative', top: '72px', left: '200px' }}>
              <input autoFocus maxLength='1' onInput={event => changeCursor(event.target)} onChange={event => setNum1(event.target.value)} style={{ textAlign: 'center', fontFamily: 'ubuntu-medium', fontSize: '22px', width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #8F8F8F', marginLeft: '10px' }} />
              <input maxLength='1' onInput={event => changeCursor(event.target)} onChange={event => setNum2(event.target.value)} style={{ textAlign: 'center', fontFamily: 'ubuntu-medium', fontSize: '22px', width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #8F8F8F', marginLeft: '10px' }} />
              <input maxLength='1' onInput={event => changeCursor(event.target)} onChange={event => setNum3(event.target.value)} style={{ textAlign: 'center', fontFamily: 'ubuntu-medium', fontSize: '22px', width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #8F8F8F', marginLeft: '10px' }} />
              <input maxLength='1' onInput={event => changeCursor(event.target)} onChange={event => setNum4(event.target.value)} style={{ textAlign: 'center', fontFamily: 'ubuntu-medium', fontSize: '22px', width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #8F8F8F', marginLeft: '10px' }} />
            </div>
            <div className='unSubBtnNum' id='unSubBtnNum' style={{ width: '296px', height: '32px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', background: '#A1DCE0', borderRadius: '8px', position: 'relative', top: '110px', left: '150px', display: 'block' }}>
              <div style={{ color: 'white', fontFamily: 'ubuntu', fontSize: '14px', textAlign: 'center', position: 'relative', top: '8px' }}>Продолжить</div>
            </div>
            <br />
            <button className='subBtnNum' id='subBtnNum' style={{ width: '296px', height: '32px', cursor: 'pointer', background: '#00A0AB', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', borderRadius: '8px', position: 'relative', top: '92px', left: '150px', display: 'none' }}>
              <div style={{ color: 'white', fontFamily: 'ubuntu', fontSize: '14px' }}>Продолжить</div>
            </button>

          </div>

        </form> */}

        <div></div>
        <div></div>
        <div></div>

      </div>

    </div>
  );
}
export default Header;