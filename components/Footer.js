import CustomLinkUI from "src/UI/UIcomponent/CustomLinkUI/CustomLinkUI";

const Footer = function() {
  return (
    <div className="footer">
      <div className="footerLeftVoid" />
      <div className="footerMainContainer">
        <div className="linkContainerFooter">
          <CustomLinkUI href="/about" customRoot="aboutLinkFooter">
            О компании
          </CustomLinkUI>

          <CustomLinkUI customRoot="contactsLinkFooter" href="/contacts">
            Контакты
          </CustomLinkUI>
          <CustomLinkUI customRoot="offerLinkFooter" href="/offer">
            Оферта
          </CustomLinkUI>
        </div>
        <div className="socialNetworksFooter">
          {/*<a href="https://www.instagram.com/kvik_baraholka/" className="instagramLinkFooter" target="_blank" rel="noreferrer">*/}
          {/*<div className="instagramLinkIcon"></div>*/}
          {/*</a>*/}
          <CustomLinkUI
            href="https://vk.com/1kvik_ru"
            customRoot="vkLinkFooter"
          >
            <div className="vkLinkIcon" />
          </CustomLinkUI>
          {/*<a href="https://www.facebook.com/Kvik-Барахолкачелябинск-107509641798965" className="fbLinkFooter" target="_blank" rel="noreferrer">*/}
          {/*<div className="fbLinkIcon" ></div>*/}
          {/*</a>*/}
        </div>
        <div className="rightContainer">
          <div className="links__download">
            <CustomLinkUI
              href="https://play.google.com/store"
              customRoot="androidDownloadLinkFooter"
            >
              <div className="androidDownloadLinkIconFooter" />
            </CustomLinkUI>
            <CustomLinkUI
              href="https:/facebook.com"
              customRoot="iosDownloadLinkFooter"
            >
              <div className="iosDownloadLinkIconFooter" />
            </CustomLinkUI>
          </div>
        </div>
        <div className="indexTitleFooter">
          {" "}
          <CustomLinkUI href="https://lndex.ru">
            {" "}
            Разработано студией INDEX
          </CustomLinkUI>
        </div>
      </div>
      <div className="footerRightVoid" />
    </div>
  );
};
export default Footer;
