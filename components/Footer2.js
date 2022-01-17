import { useMedia } from "../hooks/useMedia";

function Footer2() {

  const { matchesMobile, matchesTablet, matchesCustom1024 } = useMedia()

  return (
    <div className="main__block__footer">
      {matchesMobile || matchesTablet || matchesCustom1024 ? (
        <>
          <p>Скачать приложение</p>
          <div className="block__links__download">
            <a className="ios_links__download" href=""></a>
            <a className="android_links__download" href=""></a>
          </div>
        </>
      ) : <div style={{ height: "63px" }}></div>}

      <div className="footer__bottom">
        <div className="socialNetworksFooter2">
					<a href="https://instagram.com" className="instagramLinkFooter" target="_blank">
            <div className="instagramLinkIcon"></div>
          </a>
					<a href="https://vk.com" className="vkLinkFooter" target="_blank">
            <div className="vkLinkIcon"></div>
          </a>
					<a href="https:/facebook.com" className="fbLinkFooter" target="_blank">
            <div className="fbLinkIcon" ></div>
          </a>
        </div>
        <div className="linkContainerFooter2">
          <a className='aboutLinkFooter2' href="/about">О компании</a>
          <a className='contactsLinkFooter2' href="/contacts">Контакты</a>
          <a className='offerLinkFooter2' href='/offer'>Оферта</a>
        </div>
        <div className='indexTitleFooter2'> <a target="_blank" href="https://lndex.ru" rel="noopener noreferrer">Разработано студией INDEX</a></div>
      </div>
    </div>
  );
}
export default Footer2;