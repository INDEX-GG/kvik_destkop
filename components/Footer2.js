import React from "react";

function Footer2() {
  return (
    <div className="main__block__footer">
      <p>Скачать приложение</p>
      <div className="block__links__download">
        <a className="ios_links__download" href=""></a>
        <a className="android_links__download" href=""></a>
      </div>

      <div className="footer__bottom">
        <div className="socialNetworksFooter2">
          <a href="https://instagram.com" className="instagramLinkFooter">
            <div className="instagramLinkIcon"></div>
          </a>
          <a href="https://vk.com" className="vkLinkFooter">
            <div className="vkLinkIcon"></div>
          </a>
          <a href="https:/facebook.com" className="fbLinkFooter">
            <div className="fbLinkIcon" ></div>
          </a>
        </div>
        <div className="linkContainerFooter2">
          <a className='aboutLinkFooter2' href="http://192.168.8.62:3000/about">О компании</a>
          <a className='contactsLinkFooter2' href="http://192.168.8.62:3000/contacts">Обратная связь</a>
          <a className='offerLinkFooter2' href="http://192.168.8.62:3000/offer">Оферта</a>
        </div>
        <div className='indexTitleFooter2'> <a href=""> Разработано студией INDEX</a></div>
      </div>
    </div>
  );
}
export default Footer2;