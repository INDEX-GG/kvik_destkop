function Footer() {
  return (
    <div className="footer">
      <div className='footerLeftVoid'></div>
      <div className='footerMainContainer'>
        <div className="linkContainerFooter">
          <a className='aboutLinkFooter' href="/about">О компании</a>
          <a className='contactsLinkFooter' href="/contacts">Контакты</a>
          <a className='offerLinkFooter' href="/offer">Оферта</a>
        </div>
        <div className="socialNetworksFooter">
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
        <div className="rightContainer">
          <div className="links__download">
            <a href="https://play.google.com/store" className="androidDownloadLinkFooter">
              <div className="androidDownloadLinkIconFooter"></div>
            </a>
            <a href="https:/facebook.com" className="iosDownloadLinkFooter">
              <div className="iosDownloadLinkIconFooter"></div>
            </a>
          </div>
        </div>
        <div className='indexTitleFooter'> <a href="https://vk.com/index_ds"> Разработано студией INDEX</a></div>
      </div>
      <div className='footerRightVoid'></div>
    </div>
  );
}
export default Footer;
