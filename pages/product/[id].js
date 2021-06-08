import React, { useState, useEffect } from 'react';

import Modal from '../../components/Modal';
import UpPanel from '../../components/UpPanel';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdCard_component from '../../components/AdCard';
import ProductCarousel from '../../components/ProductCarousel';
import {ToRubles} from '../../components/services';

import Statistics from '../../components/Statistics';
// import IconCall from "../../../icons/phone_light.svg"
// import IconMess from "../../../icons/notif_light.svg"

const obj = [{ title: "Toyota Mark II jxz90", objImg: [{ img: "https://source.unsplash.com/random?cars" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 200000, newPrice: 180000, city: "Челябинск", date: "2021-05-19T12:03:51.000000Z", seen: true, status: 0, call: true, message: true, like: true, compare: false, delivery: true, security: true },
{ title: "Toyota Altezza", objImg: [{ img: "https://source.unsplash.com/random?forest" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: '', newPrice: 400000, city: "Челябинск", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: false, like: true, compare: false, delivery: false, security: true },
{ title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?land" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 2, call: true, message: true, like: true, compare: false, delivery: true, security: true },
{ title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?tools" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 0, call: true, message: true, like: true, compare: false, delivery: true, security: true },
{ title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?cars" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true },
{ title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?moto" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: true, status: 0, call: true, message: true, like: true, compare: false, delivery: true, security: true },
{ title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?house" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 2, call: true, message: true, like: true, compare: false, delivery: true, security: true },
{ title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?dog" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: true, status: 2, call: true, message: true, like: true, compare: false, delivery: true, security: true },
{ title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?smail" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true },
{ title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?animals" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true },
{ title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?boat" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: true, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true },
{ title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?region" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true }]

const objP = {
    id: 1,
    title: 'Продам 2-комню квартиру, 95м в центре',
    offerImg: [
        { id: 1, offerpic: 'https://source.unsplash.com/random?interior' },
        { id: 2, offerpic: 'https://source.unsplash.com/random?interior' },
        { id: 3, offerpic: 'https://source.unsplash.com/random?interior' },
        { id: 4, offerpic: 'https://source.unsplash.com/random?interior' },
        { id: 5, offerpic: 'https://source.unsplash.com/random?interior' },
        { id: 6, offerpic: 'https://source.unsplash.com/random?interior' },
        { id: 7, offerpic: 'https://source.unsplash.com/random?interior' },
        { id: 8, offerpic: 'https://source.unsplash.com/random?interior' },
        { id: 9, offerpic: 'https://source.unsplash.com/random?interior' }
    ],
    locality: 'Челябинск, ул. Елькина, 94з',
    date: '12 апреля 11:37',
    price: 4200000,
    oldprice: 5000000,
    bargain: true,
    /* id пользователя для проверки отображения блока объявления */
    userid: 777,
    username: 'Иван Иванов',
    /* статус для отображения блока объявления 1-активное, 2-истек срок размещения, 3-продано, 4-отклонено, 5-архив, 6-черновик, 7-неактивное (другой пльзователь) 8-активное (другой пльзователь)*/
    adstatus: 8,
    userpic: 'https://source.unsplash.com/random?portrait',
    userrate: 3.7,
    userOffers: [
        { id: 1, offerimg: 'https://source.unsplash.com/random?1', offerprice: 56, offertitle: 'Товар' },
        { id: 2, offerimg: 'https://source.unsplash.com/random?2', offerprice: 3453, offertitle: 'Продукт' },
        { id: 3, offerimg: 'https://source.unsplash.com/random?3', offerprice: 25600, offertitle: 'Авто' },
        { id: 4, offerimg: 'https://source.unsplash.com/random?4', offerprice: 30000, offertitle: 'Услуга' },
        { id: 5, offerimg: 'https://source.unsplash.com/random?5', offerprice: 3458, offertitle: 'Квартира' },
        { id: 6, offerimg: 'https://source.unsplash.com/random?6', offerprice: 33, offertitle: 'Стул' },
        { id: 7, offerimg: 'https://source.unsplash.com/random?7', offerprice: 800, offertitle: 'Недвижимость' },
        { id: 8, offerimg: 'https://source.unsplash.com/random?8', offerprice: 12079000, offertitle: 'Телевизор' }
    ]
};

const similarOffersBox = [
    { id: 1, oldPrice: 34234, price: 33345, title: 'Кухонный комбайн', img: 'https://source.unsplash.com/random', seen: false, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 2, oldPrice: 45343, price: 25433, title: 'Смартфон', img: 'https://source.unsplash.com/random', seen: false, locality: 'Миасс', date: '21.12.2020 00:12' },
    { id: 3, oldPrice: 56, price: 45, title: 'Мука', img: 'https://source.unsplash.com/random', seen: false, locality: 'Златоуст', date: '21.12.2020 00:12' },
    { id: 4, oldPrice: 4564, price: 1121, title: 'Бритва', img: 'https://source.unsplash.com/random', seen: true, locality: 'Ектеринбург', date: '21.12.2020 00:12' },
    { id: 5, oldPrice: 87976, price: 44333, title: 'Матрац', img: 'https://source.unsplash.com/random', seen: true, locality: 'Владивосток', date: '21.12.2020 00:12' },
    { id: 6, oldPrice: 222, price: 211, title: 'Телевизор', img: 'https://source.unsplash.com/random', seen: false, locality: 'Простоквашино', date: '21.12.2020 00:12' },
    { id: 7, oldPrice: 24543544, price: 2343445, title: 'Автомобиль', img: 'https://source.unsplash.com/random', seen: true, locality: 'Казань', date: '21.12.2020 00:12' },
    { id: 8, oldPrice: 32453, price: 34535, title: 'Очки', img: 'https://source.unsplash.com/random', seen: true, locality: 'Литтл Уингинг', date: '21.12.2020 00:12' },
    { id: 9, oldPrice: 78777, price: 66556, title: 'Костюм', img: 'https://source.unsplash.com/random', seen: false, locality: 'Нью-Йорк', date: '21.12.2020 00:12' },
    { id: 10, oldPrice: 678, price: 564, title: 'Пельмени', img: 'https://source.unsplash.com/random', seen: false, locality: 'Аша', date: '21.12.2020 00:12' },
    { id: 11, oldPrice: 54767, price: 43533, title: 'Монитор', img: 'https://source.unsplash.com/random', seen: false, locality: 'Карабаш', date: '21.12.2020 00:12' },
    { id: 12, oldPrice: 909888890, price: 567657567, title: 'Сокол Тысячелетия', img: 'https://source.unsplash.com/random', seen: true, locality: 'Дуга Кесселя', date: '21.12.2020 00:12' },
    { id: 13, oldPrice: 324324, price: 324312, title: 'Мотоцикл', img: 'https://source.unsplash.com/random', seen: false, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 14, oldPrice: 123123, price: 45332, title: 'Кирпич', img: 'https://source.unsplash.com/random', seen: true, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 15, oldPrice: 34534, price: 12321, title: 'Футбольный мяч', img: 'https://source.unsplash.com/random', seen: true, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 16, oldPrice: 76543, price: 23423, title: 'Весло', img: 'https://source.unsplash.com/random', seen: false, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 17, oldPrice: 1232, price: 999, title: 'Цветы', img: 'https://source.unsplash.com/random', seen: true, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 18, oldPrice: 1232133, price: 314234, title: 'Кирпич', img: 'https://source.unsplash.com/random', seen: true, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 19, oldPrice: 32434, price: 9899, title: 'Слон', img: 'https://source.unsplash.com/random', seen: false, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 20, oldPrice: 1565, price: 767, title: 'Светофор', img: 'https://source.unsplash.com/random', seen: false, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 21, oldPrice: 1000, price: 10000000, title: 'Биткоин', img: 'https://source.unsplash.com/random', seen: true, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 22, oldPrice: 122112, price: 2112, title: 'Стулья', img: 'https://source.unsplash.com/random', seen: false, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 23, oldPrice: 2323, price: 3444, title: 'Карамбола', img: 'https://source.unsplash.com/random', seen: true, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 24, oldPrice: 898079, price: 879879, title: 'Склад', img: 'https://source.unsplash.com/random', seen: false, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 25, oldPrice: 567507, price: 324234, title: 'Пылесос', img: 'https://source.unsplash.com/random', seen: false, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 26, oldPrice: 2334, price: 451, title: 'Стол', img: 'https://source.unsplash.com/random', seen: true, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 27, oldPrice: 234324234324, price: 5435454545, title: 'Недвижимость', img: 'https://source.unsplash.com/random', seen: true, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 28, oldPrice: 100000000, price: 100000, title: 'Камин', img: 'https://source.unsplash.com/random', seen: true, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 29, oldPrice: 999999, price: 99999, title: 'Собака', img: 'https://source.unsplash.com/random', seen: true, locality: 'Челябинск', date: '21.12.2020 00:12' },
    { id: 30, oldPrice: 76, price: 5, title: 'Мороженное', img: 'https://source.unsplash.com/random', seen: false, locality: 'Челябинск', date: '21.12.2020 00:12' },
];

export default function Product() {

    const [collapsed, setCollapsed] = useState(true);
    const handleCollapse = e => {
        e.preventDefault();
        if (collapsed) {
            setCollapsed(false);
        } else {
            setCollapsed(true);
        }
    }

    const [collMap, setCollMap] = useState(true);
    const handleCollMap = e => {
        e.preventDefault();
        if (collMap) {
            setCollMap(false);
        } else {
            setCollMap(true);
        }
    }

    const [collSO, setCollSO] = useState(true);
    const handleCollSO = e => {
        e.preventDefault();
        if (collSO) {
            setCollSO(false);
        } else {
            setCollSO(true);
        }
    }
    let similarOffers = [];
    if (collSO) {
        similarOffers = obj.slice(0, 16);
    } else {
        similarOffers = obj;
    }

    const [modal, setModal] = useState({});
    function modalOlen(e, size, content, title) {
        function smf() {
            setModal({ title: title, content: content, size: size, isOpen: false });
            console.log(modal)
        }
        e.preventDefault();
        setModal({ title: title, content: content, size: size, isOpen: true });
        console.log(modal);
        setTimeout(smf, 500);
    }

    // const [width, setWidth] = useState(window.innerWidth);
    // useEffect(() => {
    //     window.addEventListener("resize", updateWidthAndHeight);
    // });
    // const updateWidthAndHeight = () => {
    //     setWidth(window.innerWidth);
    //     window.removeEventListener;
    // };

    // const true = `${width}` > 1365;
    // const false = `${width}` <= 1366;
    // const false = `${width}` > 752;
    return (
        <div className="productPage" id="productPage">
            <UpPanel />
            <Header />
            <div className="productPageContainer text">
                {true ? <div className="breadcrumbs thin">Хлебные крошки</div> : ''}
                {/* Блок объявления */}
                <div className="productPageWrapper">
                    <div className="productPageDescription">
                        {true ? <div className="productPageTitle xl">{objP.title}</div> : ''}
                        {objP.adstatus === 8 && false ?
                            <div className="SellerInfoTopButtons">
                                <input className="SellerInfoNoteInput" placeholder="Заметка к объявлению" />
                                <a className="SellerInfoNote"></a>
                                <a className="SellerInfoFavorite"></a>
                            </div> : ""}
                        <ProductCarousel {...objP} />
                        {false ? <div className="productPageTitle xl">{objP.title}</div> : ''}
                        {false ? <div className="productPageAdaptive">
                            <div className="SellerInfoOldPrice__adaptive">
                                <div className="SellerInfoOldPrice thin dark crossed">
                                    {ToRubles(objP.oldprice)}
                                </div>
                                <div className="SellerInfoPrice thin xxl">
                                    {ToRubles(objP.price)}
                                </div>
                                <div className="SellerInfoBargain dark thin">
                                    {(objP.bargain) && (<p>Торг уместен</p>)}
                                </div>
                            </div>
                            <div className="SellerInfo__adaptive_info">
                                <div className="SellerInfo__adaptive_info_top">
                                    <div className="SellerInfoSeen dark"> 48 +4</div>{objP.adstatus === 8 ? "" : <a className="SellerInfoStatShow underline highlight" onClick={e => { modalOlen(e, 'xl', <Statistics />) }} >Статистика</a>}
                                </div>
                                <div className="SellerInfoDate">Размещено {objP.date}</div>
                                {objP.adstatus === 1 ? <span className="ad__block_top__days_left">Осталось 30 дней</span> : ''}
                            </div></div>
                            : ''}
                        {false ?
                            <div className="SellerInfo__adaptive_button">
                                {objP.adstatus === 2 || objP.adstatus === 3 || objP.adstatus === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Активировать</a> : ''}
                                {objP.adstatus === 2 || objP.adstatus === 3 || objP.adstatus === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Редактировать</a> : ''}
                                {objP.adstatus === 2 || objP.adstatus === 3 ? <a className="ad_btn ad_btn_edit buttonGrey button">Удалить</a> : ''}
                                {objP.adstatus === 1 ? <a className="up_view_btn button contained">Увеличить просмотры</a> : ''}
                                <div className="ad__block_middle__description_service">
                                    {objP.adstatus === 1 ? <span className="description_service">Применена услуга: выделение цветом, показ в других городах, VIP-объявление, проднятие в топе</span> : ''}
                                    {objP.adstatus === 1 ? <span className="service_days_left">Осталось 30 дней</span> : ''}
                                    <div className="SellerInfo__adaptive_buttons__top">
                                        {objP.adstatus === 8 ? <a className="SellerInfoMess button contained"><img /* src={IconMess} */ alt="" />  Написать продавцу</a> : ''}
                                        {objP.adstatus === 8 ? <a className="SellerInfoCall button contained"><img /* src={IconCall}  */alt="" /> Показать номер</a> : ''}
                                    </div>
                                    {objP.adstatus === 1 || objP.adstatus === 8 ? <div className="SellerInfo__adaptive_information">
                                        <div className="SellerInfoSecure superLight">Безопасная сделка</div>
                                        <div className="SellerInfoDelivery superLight">Возможна доставка</div>
                                    </div> : ''}
                                    {objP.adstatus === 4 ? <p className="date__last__edit">Дата последнего редактирования 00.00.00</p> : ''}
                                    {objP.adstatus === 4 ? <p className="reason__rejection">Причина отклонения: <span>Неверная цена / Неверная категория / Невозможно дозвониться / Признаки дискриминации / Товар или услуга, запрещенные к продаже в РФ
                                    / В одном объявлении несколько предложений товаров и услуг /Использование одинаковых изображений в разных объявлениях
                                / Контактная информация в названии, тексте объявления или на фото / Нарушение других правил Квик</span></p> : ''}
                                    {objP.adstatus === 6 ? <p className="ad__last__edit">Дата последнего редактирования 00.00.00
                            <span>Будет удалено навсегда через 00 дней</span></p> : ''}
                                    {objP.adstatus === 8 ? <div className="SellerInfoBuy buy_btn__adaptive">Купить</div> : ''}
                                    <div className="SellerInfo__adaptive_buttons">
                                        {objP.adstatus === 4 || objP.adstatus === 6 ? <a className=" ad_btn_edit buttonGrey button ad_btn btn-left">Редактировать</a> : ''}
                                        {objP.adstatus === 4 || objP.adstatus === 6 ? <a className=" ad_btn_edit buttonGrey button ad_btn">Удалить</a> : ''}
                                        {objP.adstatus === 1 ? <a className="ad_btn ad_btn_edit buttonGrey button btn-left">Редактировать</a> : ''}
                                        {objP.adstatus === 1 ? <a className="ad_btn ad_btn_edit buttonGrey button">Снять с публикации</a> : ''}
                                    </div>
                                </div>
                            </div>
                            : ''}
                        <div className="productPageCharacterMapBlock" style={collMap ? { paddingBottom: 0 } : { paddingBottom: '18px' }} >
                            <div className="productPageCharacterLocality">
                                {true ? <div>Местоположение</div> : ''}
                                <div>{objP.locality}</div>
                                <a className={`productPageCharacterMapSwitch highlight underline ${collMap ? ('') : ('collMapSw')}`} onClick={e => handleCollMap(e)}>На карте</a>
                            </div>
                            <div className="productPageCharacterMap" style={collMap ? { height: 0 } : { height: '400px' }}>
                                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ade278bb067489a15a031480c20e3318914d391acd3e1995348d759fa5baa2167&amp;source=constructor" width="618" height="400" frameBorder="0"></iframe>
                            </div>
                        </div>
                        <div className="productPageCharacter thin">
                            <div>
                                <div>Свойство</div>
                                <div>Значение</div>
                            </div>
                            <div>
                                <div>Свойство</div>
                                <div>Значение</div>
                            </div>
                            <div>
                                <div>Свойство</div>
                                <div>Значение</div>
                            </div>
                            <div>
                                <div>Поделиться</div>
                                <div>
                                    <a className="productPageCharacterVK"></a>
                                    <a className="productPageCharacterFB"></a>
                                    <a className="productPageCharacterOK"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Блок информации*/}
                    <div className="block__my_active_ad" >
                        {true ?
                            <div className={objP.adstatus === 7 ? "ad__block_top ad__padding-top" : "ad__block_top"}>
                                {objP.adstatus !== 7 & objP.adstatus !== 8 ?
                                    <div className="SellerInfoTopButtons">
                                        <a className="SellerInfoStatShow underline highlight" onClick={e => { modalOlen(e, 'xl', <Statistics />) }} >Статистика</a>
                                    </div> : ''}
                                {objP.adstatus === 8 ?
                                    <div className="SellerInfoTopButtons">
                                        <input className="SellerInfoNoteInput" placeholder="Заметка к объявлению" />
                                        <a className="SellerInfoNote"></a>
                                        <a className="SellerInfoCompare"></a>
                                        <a className="SellerInfoFavorite"></a>
                                    </div> : ""}
                                {objP.adstatus === 8 ?
                                    <div className="SellerInfoDate">Размещено {objP.date}</div> : ""}
                                {objP.adstatus !== 8 ? <span className={objP.adstatus !== 1 ? "ad__block_top__publication_date ad__posted" : "ad__block_top__publication_date"}>Размещено {objP.date}</span> : ""}
                                {objP.adstatus === 1 ? <span className="ad__block_top__days_left">Осталось 30 дней</span> : ''}
                                <div className="SellerInfoOldPrice thin dark crossed">
                                    {ToRubles(objP.oldprice)}
                                </div>
                                <div className="SellerInfoPrice thin xxl">
                                    {ToRubles(objP.price)}
                                </div>
                                {objP.adstatus !== 7 ?
                                    <div className="SellerInfoBargain dark thin">
                                        {(objP.bargain) && (<p>Торг уместен</p>)}
                                    </div> : ""}
                                {objP.adstatus === 8 ? <a className="SellerInfoMess button contained"><img /* src={IconMess} */ alt="" />Написать продавцу</a> : ''}
                                {objP.adstatus === 8 ? <a className="SellerInfoCall button contained"><img /* src={IconCall} */ alt="" />Показать номер</a> : ''}
                                {objP.adstatus !== 7 ?
                                    <div className="SellerInfoAboutDeal">
                                        <div>
                                            <div className="SellerInfoSecure superLight">Безопасная сделка</div>
                                            <div className="SellerInfoDelivery superLight">Возможна доставка</div>
                                        </div>
                                        <div className="SellerInfoSeen dark">48 +4</div>
                                    </div> : ""}
                            </div> : ''}
                        {objP.adstatus === 8 && true ? <div className="SellerInfoBuy">Купить</div> : ''}
                        {objP.adstatus !== 7 && true ?
                            <div className="ad__block_middle">
                                {objP.adstatus === 1 ? <a className="up_view_btn button contained">Увеличить просмотры</a> : ''}
                                {objP.adstatus === 1 ? <div className="ad__block_middle__description_service">
                                    <span className="description_service">Применена услуга: выделение цветом, показ в других городах, VIP-объявление, проднятие в топе</span>
                                    <span className="service_days_left">Осталось 30 дней</span>
                                </div> : ''}
                                {objP.adstatus === 1 ? <a className="ad_btn ad_btn_edit buttonGrey button">Редактировать</a> : ''}
                                {objP.adstatus === 1 ? <a className="ad_btn buttonGrey button">Снять с публикации</a> : ''}
                                {objP.adstatus === 2 || objP.adstatus === 3 || objP.adstatus === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Активировать</a> : ''}
                                {objP.adstatus === 2 || objP.adstatus === 3 || objP.adstatus === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Редактировать</a> : ''}
                                {objP.adstatus === 2 || objP.adstatus === 3 ? <a className="ad_btn ad_btn_edit buttonGrey button">Удалить</a> : ''}
                                {objP.adstatus === 4 ? <p className="date__last__edit">Дата последнего редактирования 00.00.00</p> : ''}
                                {objP.adstatus === 4 ? <p className="reason__rejection">Причина отклонения: <span>Неверная цена / Неверная категория / Невозможно дозвониться / Признаки дискриминации / Товар или услуга, запрещенные к продаже в РФ
                                / В одном объявлении несколько предложений товаров и услуг /Использование одинаковых изображений в разных объявлениях
                                / Контактная информация в названии, тексте объявления или на фото / Нарушение других правил Квик</span></p> : ''}
                                {objP.adstatus === 4 || objP.adstatus === 6 ? <a className="ad_btn ad_btn_edit buttonGrey button">Редактировать</a> : ''}
                                {objP.adstatus === 4 || objP.adstatus === 6 ? <a className="ad_btn ad_btn_edit buttonGrey button">Удалить</a> : ''}
                                {objP.adstatus === 6 ? <p className="ad__last__edit">Дата последнего редактирования 00.00.00
                            <span>Будет удалено навсегда через 00 дней</span></p> : ''}
                            </div> : ''}
                        {objP.adstatus === 1 || objP.adstatus === 2 || objP.adstatus === 3 || objP.adstatus === 4 || objP.adstatus === 5 || objP.adstatus === 6 ?
                            <div className="ad__block_bottom">
                                <div className="SellerInfoUserBlock">
                                    <img className="SellerInfoUserPic" src={objP.userpic} />
                                    <div>
                                        <div>{objP.username}</div>
                                        <div>
                                            <div className="SellerInfoRateNumber">{objP.userrate}</div>
                                            <div className="rating">
                                                <div className="stars">
                                                    <div className="on" style={{ width: `${objP.userrate * 20}%` }}></div>
                                                    <div className="live">
                                                        <span data-rate="1"></span>
                                                        <span data-rate="2"></span>
                                                        <span data-rate="3"></span>
                                                        <span data-rate="4"></span>
                                                        <span data-rate="5"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="count__ad">00 объявлений</span>
                                        </div>
                                    </div>
                                </div>
                                {false ? <a className="SellerInfoloarmore"></a> : ''}
                            </div> : ''}
                        {objP.adstatus === 7 || objP.adstatus === 8 ?
                            <div className="main_ad__dottom">
                                <div className="SellerInfoUserBlock">
                                    <img className="SellerInfoUserPic" src={objP.userpic} />
                                    <div>
                                        <div>{objP.username}</div>
                                        <div>
                                            <div className="SellerInfoRateNumber">{objP.userrate}</div>
                                            <div className="rating">
                                                <div className="stars">
                                                    <div className="on" style={{ width: `${objP.userrate * 20}%` }}></div>
                                                    <div className="live">
                                                        <span data-rate="1"></span>
                                                        <span data-rate="2"></span>
                                                        <span data-rate="3"></span>
                                                        <span data-rate="4"></span>
                                                        <span data-rate="5"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {true ? <a className="SellerInfoUserAdd"></a> : ''}
                                    {false ? <a className="SellerInfoloarmore"></a> : ''}
                                </div>
                                {true ? <div className="SellerInfoOffers">
                                    {(collapsed) &&
                                        (objP.userOffers.slice(0, 3).map(offer => {
                                            return (
                                                <div key={offer.id} className="SellerInfoOfferCard small">
                                                    <img src={offer.offerimg} />
                                                    <div>{ToRubles(offer.offerprice)}</div>
                                                    <div>{offer.offertitle}</div>
                                                </div>
                                            )
                                        }))
                                        ||
                                        (objP.userOffers.map(offer => {
                                            return (
                                                <div key={offer.id} className="SellerInfoOfferCard small">
                                                    <img src={offer.offerimg} />
                                                    <div>{ToRubles(offer.offerprice)}</div>
                                                    <div>{offer.offertitle}</div>
                                                </div>
                                            )
                                        }))
                                    }
                                </div> : ""}
                                {true ? <a className="SellerInfoUserOffersCollapse highlight underline" onClick={e => { handleCollapse(e) }}>{(collapsed) && `Все объявления продавца (${objP.userOffers.length})` || `Скрыть`}</a> : ""}
                                {true ? <a className="SellerInfoShutUp small light underline">Заблокировать пользователя</a> : ""}
                            </div> : ''}
                        {objP.adstatus === 7 || objP.adstatus === 8 ?
                            <div className="ad__block_bottom__adaptive">
                                {false ? <div className="ad__block_bottom__adaptive_left"> <a className="SellerInfoUserAdd"></a>Подписаться</div> : ''}
                                <div className="ad__block_bottom__adaptive_right">
                                    {false ? <a className="SellerInfoShutUp small light underline">Заблокировать пользователя</a> : ""}
                                    {objP.adstatus === 8 ? <a className="SellerInfoComplain small light underline">Пожаловаться</a> : ""}
                                </div>
                            </div>
                            : ''}
                    </div>
                    {/* Конец блока*/}
                    <div className="productPageSimilarOffers">
                        <div className='productPageSimilarOffersTitle xl bold'>Похожие объявления</div>
                        <div className="productPageSimilarOffersContainer">
                            {similarOffers.map(obj => {
                                return (
                                    <AdCard_component objs={obj} />
                                )
                            })}
                        </div>
                        <div className="productPageSimilar__advertisement">
                            {false ? <div className="showsmthWrapper">
                                <div className="freedomBlock_1"></div>
                                <div className="freedomBlock_2"></div>
                            </div> : ''}
                        </div>
                        <div className={`SimilarOffersColl highlight underline ${collSO && 'SOCColl'}`} onClick={e => handleCollSO(e)}>{collSO && 'Показать ещё' || 'Скрыть'}</div>
                    </div>
                </div>
                { true ?
                    <div className="showsmthWrapper">
                        <div className="freedomBlock_1"></div>
                        <div className="freedomBlock_2"></div>
                    </div> : ''}
            </div>
            <div className="productPageWhiteSpace"></div>
            <Modal {...modal} />
            <Footer />
        </div >
    )
}