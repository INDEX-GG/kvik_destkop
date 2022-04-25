import { NextSeo } from "next-seo";
import { createSEOProps } from "#lib/seo";
import GrAndroid from "../UI/icons/GrAndroid";
import GrApple from "../UI/icons/GrApple";
// import Instagram from '../UI/icons/Instagram';
import Vk from "../UI/icons/Vk";
import Fb from "../UI/icons/Fb";
import WhatsUp from "../UI/icons/WhatsUp";
import Odnoklas from "../UI/icons/Odnoklas";
import CustomLinkUI from "src/UI/UIcomponent/CustomLinkUI/CustomLinkUI";
const seoProps = createSEOProps({
  title: "Контакты",
  link: "/contacts",
});

export default function Contacts() {
  return (
    <>
      <NextSeo {...seoProps} />
      <div className="contacts">
        <div className="contacts__blocks">
          <div className="contacts__blocks__block">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor:de278bb067489a15a031480c20e3318914d391acd3e1995348d759fa5baa2167&amp;source=constructor"
              width=""
              height=""
              frameBorder="0"
            />
          </div>
          <div className="contacts__blocks__block contacts__block">
            <div className="contacts__blocks__block_wrapper_top">
              <p>
                Связь с нами:{" "}
                <CustomLinkUI href="tel:+79191232395">
                  8 (919) 123-23-95
                </CustomLinkUI>
              </p>
              <p>
                Адрес:{" "}
                <span className="contacts__blocks__block_wrapper_adress">
                  г. Челябинск, ул. Молодогвардейцев, 60-В
                </span>
              </p>
              <p>
                E-mail:{" "}
                <span className="contacts__blocks__block_wrapper_email">
                  support@onekvik.ru
                </span>
              </p>
              <h6 className="social__title">Мы в социальных сетях</h6>
              <div className="social__block">
                {/*<a href="https://www.instagram.com/kvik.ru/"><Instagram /></a>*/}
                <CustomLinkUI href="https://vk.com/1kvik_ru">
                  <Vk />
                </CustomLinkUI>
                <CustomLinkUI href="https://ok.ru/kvik1">
                  <Odnoklas />
                </CustomLinkUI>
                <CustomLinkUI href="https://www.facebook.com/1kvik/">
                  <Fb />
                </CustomLinkUI>
              </div>
            </div>
            <div className="contacts__blocks__block_wrapper_middle">
              <h6 className="contacts__blocks__block_wrapper_middle_title">
                Скачать приложение
              </h6>
              <span>
                <CustomLinkUI href="#">
                  <GrAndroid />
                </CustomLinkUI>
              </span>
              <span>
                <CustomLinkUI href="#">
                  <GrApple />
                </CustomLinkUI>
              </span>
            </div>
            <div className="contacts__blocks__block_wrapper_bottom">
              <h6 className="contacts__blocks__block_wrapper_bottom_title">
                Служба поддержки
              </h6>
              <div className="support__block">
                <CustomLinkUI href="https://vk.com/1kvik_ru">
                  <Vk />
                </CustomLinkUI>
                <CustomLinkUI href="https://ok.ru/kvik1">
                  <Odnoklas />
                </CustomLinkUI>
                <CustomLinkUI href="https://www.facebook.com/1kvik/">
                  <Fb />
                </CustomLinkUI>
                <CustomLinkUI href="tel:+79191232395">
                  <WhatsUp />
                </CustomLinkUI>
              </div>
              <CustomLinkUI
                customRoot={"contacts__index"}
                href="https://lndex.ru"
              >
                Разработано студией INDEX
              </CustomLinkUI>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
