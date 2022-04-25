import { useMedia } from "../hooks/useMedia";
import CustomLinkUI from "src/UI/UIcomponent/CustomLinkUI/CustomLinkUI";
function Footer2() {
  const { matchesMobile, matchesTablet, matchesCustom1024 } = useMedia();

  return (
    <div className="main__block__footer">
      {matchesMobile || matchesTablet || matchesCustom1024 ? (
        <>
          <p>Скачать приложение</p>
          <div className="block__links__download">
            <a className="ios_links__download" href="" />
            <a className="android_links__download" href="" />
          </div>
        </>
      ) : (
        <div style={{ height: "63px" }} />
      )}

      <div className="footer__bottom">
        <div className="socialNetworksFooter2">
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
        <div className="linkContainerFooter2">
          <CustomLinkUI
            defaultColor={false}
            customRoot="aboutLinkFooter2"
            href="/about"
          >
            О компании
          </CustomLinkUI>
          <CustomLinkUI
            defaultColor={false}
            customRoot="contactsLinkFooter2"
            href="/contacts"
          >
            Контакты
          </CustomLinkUI>
          <CustomLinkUI
            defaultColor={false}
            customRoot="offerLinkFooter2"
            href="/offer"
          >
            Оферта
          </CustomLinkUI>
        </div>
        <div className="indexTitleFooter2">
          {" "}
          <a target="_blank" href="https://lndex.ru" rel="noopener noreferrer">
            Разработано студией INDEX
          </a>
        </div>
      </div>
    </div>
  );
}
export default Footer2;
