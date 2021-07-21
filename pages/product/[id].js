import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Dialog } from '@material-ui/core';
import axios from 'axios';
// import Header from '../../components/header/Header';
// import Footer from '../../components/Footer';
import AdCard_component from '../../components/AdCard';
import ProductCarousel from '../../components/ProductCarousel';
import Statistics from '../../components/Statistics';
import ProductInformation from '../../components/product/ProductInformation';
import ProductAction from '../../components/product/ProductAction';
import ProductUserInfo from '../../components/product/ProductUserInfo';
import { ToRubles, ToRusDate } from '../../lib/services';
import IconCall from '../../UI/icons/IconCall';
import IconMess from '../../UI/icons/IconMess';
import { useMedia } from '../../hooks/useMedia';
import { useProduct } from '../../hooks/useProduct';
import {useAd} from "../../hooks/useAd"
import Favorits from '../../UI/Favorits';
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
    userid: 777,/* id пользователя для проверки отображения блока объявления */
    username: 'Иван Иванов',/* статус для отображения блока объявления 1-активное, 2-истек срок размещения, 3-продано, 4-отклонено, 5-архив, 6-черновик, 7-неактивное (другой пльзователь) 8-активное (другой пльзователь)*/
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

const Product = () => {

    const router = useRouter();

    const [openStatForm, setopenStatForm] = useState(false);
    const handleStatFormDialog = () => setopenStatForm(!openStatForm);

    const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();

    const [collSO, setCollSO] = useState(true);
    const handleCollSO = e => {
        e.preventDefault();
        if (collSO) {
            setCollSO(false);
        } else {
            setCollSO(true);
        }
    }

    const [data, setData] = useState();
    useEffect(() => {
        axios.post('/api/getPosts', { of: 0 })
            .then((res) => setData(res.data.result)
            )

        return () => { }
    }, [])

    const { name, raiting, address, userPhoto, category_id, commercial, user_id, created_at, delivery, description, email, id, phone, photo, rating, reviewed, secure_transaction, title, trade, price, oldprice, verify_moderator } = useProduct({ router });

    console.log(router)
    console.log("USER ID" + user_id)
    console.log(useProduct({router}))

    const [userAd, setUserAd] = useState();
    useEffect(() => {
        axios.post('/api/getProductOfUser', { user_id: user_id })
            .then((res) => setUserAd(res.data.result))
        return () => { }
    }, [user_id]);


    return (
        <div className="productPage" id="productPage">
            <Header />
            <div className="productPageContainer text">
                {!matchesMobile && !matchesTablet && <div className="breadcrumbs thin">Хлебные крошки</div>}
                {/* Блок объявления */}
                <div className="product__wrapper">
                    <div className="productPageWrapper">
                        <div className="product__main_block">
                            <div className="productPageDescription">
                                {!matchesMobile && !matchesTablet && <div className="productPageTitle xl">{title}</div>}
                                {objP.adstatus === 8 && !matchesLaptop && !matchesDesktop && !matchesHD &&
                                    <div className="SellerInfoTopButtons">
                                        <input className="SellerInfoNoteInput" placeholder="Заметка к объявлению" />
                                        <a className="SellerInfoNote"></a>
                                        <a className="SellerInfoFavorite"></a>
                                        
                                    </div>}
                                <ProductCarousel photo={photo} />
                                {!matchesLaptop && !matchesDesktop && !matchesHD && <div className="productPageTitle xl">{title}</div>}
                                {!matchesLaptop && !matchesDesktop && !matchesHD && <div className="productPageAdaptive">
                                    <div className="SellerInfoOldPrice__adaptive">
                                        <div className="SellerInfoOldPrice thin dark crossed">
                                            {oldprice == undefined ? '' : ToRubles(oldprice)}
                                        </div>
                                        <div className="SellerInfoPrice thin xxl">
                                            {ToRubles(price)}
                                        </div>
                                        <div className="SellerInfoBargain dark thin">
                                            {(trade) && (<p>Торг уместен</p>)}
                                        </div>
                                    </div>
                                    <div className="SellerInfo__adaptive_info">
                                        <div className="SellerInfo__adaptive_info_top">
                                            <div className="SellerInfoSeen dark"> {reviewed} +4</div>{objP.adstatus === 8 ? "" : <a className="SellerInfoStatShow underline highlight" onClick={() => setopenStatForm(!openStatForm)} >Статистика</a>}
                                        </div>
                                        <div className="SellerInfoDate">Размещено {ToRusDate(created_at)}</div>
                                        {objP.adstatus === 1 ? <span className="ad__block_top__days_left">Осталось 30 дней</span> : ''}
                                    </div></div>
                                }
                                {!matchesLaptop && !matchesDesktop && !matchesHD &&
                                    <div className="SellerInfo__adaptive_button">
                                        {objP.adstatus === 2 || objP.adstatus === 3 || objP.adstatus === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Активировать</a> : ''}
                                        {objP.adstatus === 2 || objP.adstatus === 3 || objP.adstatus === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Редактировать</a> : ''}
                                        {objP.adstatus === 2 || objP.adstatus === 3 ? <a className="ad_btn ad_btn_edit buttonGrey button">Удалить</a> : ''}
                                        {objP.adstatus === 1 ? <a className="up_view_btn button contained">Увеличить просмотры</a> : ''}
                                        <div className="ad__block_middle__description_service">
                                            {objP.adstatus === 1 ? <span className="description_service">Применена услуга: выделение цветом, показ в других городах, VIP-объявление, проднятие в топе</span> : ''}
                                            {objP.adstatus === 1 ? <span className="service_days_left">Осталось 30 дней</span> : ''}
                                            <div className="SellerInfo__adaptive_buttons__top">
                                                {objP.adstatus === 8 ? <a className="SellerInfoMess button contained"><IconMess /> Написать продавцу</a> : ''}
                                                {objP.adstatus === 8 ? <a className="SellerInfoCall button contained"><IconCall /> Показать номер</a> : ''}
                                            </div>
                                            {objP.adstatus === 1 || objP.adstatus === 8 ? <div className="SellerInfo__adaptive_information">
                                                {secure_transaction && <div className="SellerInfoSecure superLight">Безопасная сделка</div>}
                                                {delivery && (<div className="SellerInfoDelivery superLight">Возможна доставка</div>)}
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
                                }
                                {/* адрес, карта, свойства и значения */} <ProductInformation address={address} description={description} />
                            </div>
                            {/* Блок информации*/}
                            <div className="block__my_active_ad" >
                                {/* статус объявления, кнопки */} <ProductAction reviewed={reviewed} oldprice={oldprice} price={price} created_at={created_at} delivery={delivery} trade={trade} secure_transaction={secure_transaction} />
                                {/* пользователь и его объявления */}
                                <ProductUserInfo name={name} userPhoto={userPhoto} raiting={raiting} id={user_id} userAd={userAd} />
                            </div>
                        </div>
                        {!matchesMobile && !matchesTablet && !matchesLaptop &&
                            <div className="showsmthWrapper">
                                <div className="freedomBlock_1"></div>
                                <div className="freedomBlock_2"></div>
                            </div>}</div>

                    <div className='productPageSimilarOffersTitle xl bold'>Похожие объявления</div>
                    <div className="productPageSimilarOffers">
                        <div className="product__carts__wrapper">
                            <div className="productPageSimilarOffersContainer">
                                {data && data.map((obj, i) => {
                                    return (<AdCard_component key={i} offer={obj} user_id={user_id} />)
                                })}
                            </div>
                            <div className={`SimilarOffersColl highlight underline ${collSO && 'SOCColl'}`} onClick={e => handleCollSO(e)}>{collSO && 'Показать ещё' || 'Скрыть'}</div>

                        </div>
                        <div className="productPageSimilar__advertisement">
                            {!matchesMobile && !matchesTablet && !matchesDesktop && !matchesHD && <div className="showsmthWrapper">
                                <div className="freedomBlock_1"></div>
                                <div className="freedomBlock_2"></div>
                            </div>}
                        </div>

                    </div>
                </div>
            </div>
            <div className="productPageWhiteSpace"></div>
            <Dialog open={openStatForm} onClose={() => setopenStatForm(!openStatForm)} fullWidth maxWidth='sm'> <Statistics Close={handleStatFormDialog} /> </Dialog>
            <Footer />
        </div >
    )
}

// export async function getStaticPaths() {
//     const offers = await getDataByQuery('/api/getPosts', { of: 0 })
//     const paths = offers.result.map((offer) => ({
//         params: { id: String(offer.id) },
//     }))
//     // { fallback: false } несуществующие страницы упадут на 404
//     return { paths, fallback: false }
// }

// export async function getStaticProps({ params }) {
//     const res = await fetch(`${process.env.HOST}/product/${params.id}`)
//     const offer = await res.json()
//     //Протестировать

//     return { props: { offer } }
// }
export default Product;