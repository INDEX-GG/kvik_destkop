import UpPanel from '../components/UpPanel';
import Header from '../components/Header';
import Footer from '../components/Footer';

// import GrAndroid from "../../images/contacts/android_contacts.svg";
// import GrApple from "../../images/contacts/apple_contacts.svg";
// import instagram from "../../images/contacts/inst_contacts.svg";
// import vk from "../../images/contacts/vk_contacts.svg";
// import fb from "../../images/contacts/facebook_contacts.svg";
// import WhatsUp from "../../images/contacts/whatsUp_contacts.svg";
// import Odnoklas from "../../images/contacts/odnoklas_contacts.svg";

const uluru = { lat: -25.344, lng: 131.036 };

export default function Contacts() {
  return (
    <div className="contacts bodyContacts"  id="contactsPage">
        <UpPanel />
      <Header />
      <div className="contacts">
                <div className="contacts__blocks">
                    <div className="contacts__blocks__block">
                        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor:de278bb067489a15a031480c20e3318914d391acd3e1995348d759fa5baa2167&amp;source=constructor" width="" height="" frameborder="0"></iframe>
                    </div>
                    <div className="contacts__blocks__block contacts__block">
                        <div className="contacts__blocks__block_wrapper_top">
                            <p>Связь с нами: <a href="tel:+79191232395">8 (919) 123-23-95</a></p>
                            <p>Адрес: <span className="contacts__blocks__block_wrapper_adress">г. Челябинск, ул. Молодогвардейцев, 60-В</span></p>
                            <p>E-mail: <span className="contacts__blocks__block_wrapper_email">support@1kvik.ru</span></p>
                            <h6 className="social__title">Мы в социальных сетях</h6>
                            <div className="social__block">
                                <a href="https://www.instagram.com/kvik.ru/"><img /* src={instagram} alt={instagram} */ /></a>
                                <a href="https://vk.com/1kvik_ru"><img /* src={vk} alt={vk} */ /></a>
                                <a href="https://ok.ru/kvik1"><img /* src={Odnoklas} alt={Odnoklas} */ /></a>
                                <a href="https://www.facebook.com/1kvik/"><img /* src={fb} alt={fb} */ /></a>
                            </div>
                        </div>
                        <div className="contacts__blocks__block_wrapper_middle">
                            <h6 className="contacts__blocks__block_wrapper_middle_title">Скачать приложение</h6>
                            <span><a href="#"><img /* src={GrAndroid} *//></a></span>
                            <span><a href="#"><img /* src={GrApple} *//></a></span>
                        </div>
                        <div className="contacts__blocks__block_wrapper_bottom">
                            <h6 className="contacts__blocks__block_wrapper_bottom_title">Служба поддержки</h6>
                            <div className="support__block">
                                <a href="https://vk.com/1kvik_ru"><img /* src={vk} alt={vk} */ /></a>
                                <a href="https://ok.ru/kvik1"><img /* src={Odnoklas} alt={Odnoklas} */ /></a>
                                <a href="https://www.facebook.com/1kvik/"><img /* src={fb} alt={fb} */ /></a>
                                <a href="tel:+79191232395"><img /* src={WhatsUp} alt={WhatsUp} */ /></a>
                            </div>
                            <a className="contacts__index" href="">Разработано студией INDEX</a>
                        </div>
                    </div>
                </div>
            </div>
      <Footer />
    </div>
  );
}
