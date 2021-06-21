import React, { useState } from 'react';
import { useMedia } from '../../hooks/useMedia';
import { ToRubles } from '../../lib/services';
import IconCall from '../../UI/icons/IconCall';
import IconMess from '../../UI/icons/IconMess';
import Statistics from '../../components/Statistics';
import { Dialog } from '@material-ui/core';

export default function ProductAction(objP) {

    const [openStatForm, setOpenStatForm] = useState(false);
    const handleStatFormDialog = () => setOpenStatForm(!openStatForm);

    const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();

    return (
        <>
            {!matchesMobile && !matchesTablet &&
                <div className={objP.adstatus === 7 ? "ad__block_top ad__padding-top" : "ad__block_top"}>
                    {objP.adstatus !== 7 & objP.adstatus !== 8 ?
                        <div className="SellerInfoTopButtons">
                            <a className="SellerInfoStatShow underline highlight" onClick={() => setOpenStatForm(!openStatForm)} >Статистика</a>
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
                    {objP.adstatus === 8 ? <a className="SellerInfoMess button contained"><IconMess /> Написать продавцу</a> : ''}
                    {objP.adstatus === 8 ? <a className="SellerInfoCall button contained"><IconCall /> Показать номер</a> : ''}
                    {objP.adstatus !== 7 ?
                        <div className="SellerInfoAboutDeal">
                            <div>
                                <div className="SellerInfoSecure superLight">Безопасная сделка</div>
                                <div className="SellerInfoDelivery superLight">Возможна доставка</div>
                            </div>
                            <div className="SellerInfoSeen dark">48 +4</div>
                        </div> : ""}
                </div>}
            {objP.adstatus === 8 && !matchesMobile && !matchesTablet && <div className="SellerInfoBuy">Купить</div>}
            {objP.adstatus !== 7 && !matchesMobile && !matchesTablet &&
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
                </div>}
            <Dialog open={openStatForm} onClose={() => setOpenStatForm(!openStatForm)} fullWidth maxWidth='sm'><Statistics Close={handleStatFormDialog}/></Dialog>
        </>
    )
}
