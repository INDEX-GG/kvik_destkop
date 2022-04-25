import CustomLinkUI from "src/UI/UIcomponent/CustomLinkUI/CustomLinkUI";

const Footer = function() {
  return (
    <div className="footer">
      <div className="footerLeftVoid" />
      <div className="footerMainContainer">
        <div className="linkContainerFooter">
          <CustomLinkUI
            defaultColor={false}
            customRoot="aboutLinkFooter"
            href="/about"
          >
            О компании
          </CustomLinkUI>
          <CustomLinkUI
            defaultColor={false}
            customRoot="contactsLinkFooter"
            href="/contacts"
          >
            Контакты
          </CustomLinkUI>
          <CustomLinkUI
            defaultColor={false}
            customRoot="offerLinkFooter"
            href="/offer"
          >
            Оферта
          </CustomLinkUI>
        </div>
        <div className="socialNetworksFooter">
          {/*<a href="https://www.instagram.com/kvik_baraholka/" className="instagramLinkFooter" target="_blank" rel="noreferrer">*/}
          {/*<div className="instagramLinkIcon"></div>*/}
          {/*</a>*/}
          <a
            href="https://vk.com/1kvik_ru"
            className="vkLinkFooter"
            target="_blank"
            rel="noreferrer"
          >
            <div className="vkLinkIcon" />
          </a>
          {/*<a href="https://www.facebook.com/Kvik-Барахолкачелябинск-107509641798965" className="fbLinkFooter" target="_blank" rel="noreferrer">*/}
          {/*<div className="fbLinkIcon" ></div>*/}
          {/*</a>*/}
        </div>
        <div className="rightContainer">
          <div className="links__download">
            <a
              href="https://play.google.com/store"
              className="androidDownloadLinkFooter"
            >
              <div className="androidDownloadLinkIconFooter" />
            </a>
            <a href="https:/facebook.com" className="iosDownloadLinkFooter">
              <div className="iosDownloadLinkIconFooter" />
            </a>
          </div>
        </div>
        <div className="indexTitleFooter">
          {" "}
          <a href="https://lndex.ru"> Разработано студией INDEX</a>
        </div>
      </div>
      <div className="footerRightVoid" />
    </div>
  );
};
export default Footer;
