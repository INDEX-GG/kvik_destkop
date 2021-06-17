import MainLayout from '../layout/MainLayout';
import GrAndroid from '../UI/icons/GrAndroid';
import GrApple from '../UI/icons/GrApple';
import Instagram from '../UI/icons/Instagram';
import Vk from '../UI/icons/Vk';
import Fb from '../UI/icons/Fb';
import WhatsUp from '../UI/icons/WhatsUp';
import Odnoklas from '../UI/icons/Odnoklas';

const uluru = { lat: -25.344, lng: 131.036 };

export default function Contacts() {
    return (
        <MainLayout title={'Контакты'}>
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
                                <a href="https://www.instagram.com/kvik.ru/"><Instagram /></a>
                                <a href="https://vk.com/1kvik_ru"><Vk /></a>
                                <a href="https://ok.ru/kvik1"><Odnoklas /></a>
                                <a href="https://www.facebook.com/1kvik/"><Fb /></a>
                            </div>
                        </div>
                        <div className="contacts__blocks__block_wrapper_middle">
                            <h6 className="contacts__blocks__block_wrapper_middle_title">Скачать приложение</h6>
                            <span><a href="#"><GrAndroid /></a></span>
                            <span><a href="#"><GrApple /></a></span>
                        </div>
                        <div className="contacts__blocks__block_wrapper_bottom">
                            <h6 className="contacts__blocks__block_wrapper_bottom_title">Служба поддержки</h6>
                            <div className="support__block">
                                <a href="https://vk.com/1kvik_ru"><Vk /></a>
                                <a href="https://ok.ru/kvik1"><Odnoklas /></a>
                                <a href="https://www.facebook.com/1kvik/"><Fb /></a>
                                <a href="tel:+79191232395"><WhatsUp /></a>
                            </div>
                            <a className="contacts__index" href="">Разработано студией INDEX</a>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
