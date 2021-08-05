import React, { useState } from "react";
import { useMedia } from "../../hooks/useMedia";
import { ToRubles, ToRusDate } from "../../lib/services";
import { Dialog } from "@material-ui/core";
import IconCall from "../../UI/icons/IconCall";
import IconMess from "../../UI/icons/IconMess";
import Statistics from "../../components/Statistics";
import PhoneModule from "./PhoneModule";
import Favorits from "../../UI/Favorits";
import { useAuth } from "../../lib/Context/AuthCTX";
import UnpublishForm from "../UnpublishForm";
import { UnpublishCTX } from "../../lib/Context/DialogCTX";
import router from "next/router";
export default function ProductAction(data) {
  const { id } = useAuth();
  const [openStatForm, setOpenStatForm] = useState(false);
  const [phoneModuleState, setPhoneModuleState] = useState(false);
  const handleStatFormDialog = () => setOpenStatForm(!openStatForm);

  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();

  const objP = { adstatus: 8 };
  const [offerId, setOfferId] = useState();

  const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
  const handleUnpublishFormDialog = () => setOpenUnpublishForm(!openUnpublishForm);

  /* Модальное окно */
  function pushCheck(e) {
    setOfferId(+data.router.query.id);
    setOpenUnpublishForm(!openUnpublishForm);
    handleUnpublishFormDialog();
  }

  return (
    <>
      <UnpublishCTX.Provider value={{ offerId, openUnpublishForm, setOpenUnpublishForm }}>
        {!matchesMobile && !matchesTablet && (
          <div className={objP.adstatus === 7 ? "ad__block_top ad__padding-top" : "ad__block_top"}>
            {(objP.adstatus !== 7) & (data.user_id === id) ? (
              <div className="SellerInfoTopButtons">
                <a className="SellerInfoStatShow underline highlight" onClick={() => setOpenStatForm(!openStatForm)}>
                  Статистика
                </a>
              </div>
            ) : (
              ""
            )}
            {data.user_id !== id ? (
              <div className="SellerInfoTopButtons">
                <Favorits isProduct />
                <a className="SellerInfoCompare"></a>
              </div>
            ) : (
              ""
            )}
            <div className={data.user_id === id ? "SellerInfoDate" : "SellerInfoDate_active"}>Размещено {ToRusDate(data.created_at)}</div>
            {/* { <span className={data.user_id === id  ? "ad__block_top__publication_date ad__posted" : "ad__block_top__publication_date"}>Размещено {ToRusDate(data.created_at)}</span> } */}
            {data.user_id === id ? <span className="ad__block_top__days_left">Осталось 30 дней</span> : ""}
            <div className="SellerInfoOldPrice thin dark crossed">{data.oldprice == undefined ? "" : ToRubles(data.oldprice)}</div>
            <div className="SellerInfoPrice thin xxl">{ToRubles(data.price)}</div>
            {objP.adstatus !== 7 ? <div className="SellerInfoBargain dark thin">{ data.user_id != id && data.trade && <p>Торг уместен</p>}</div> : ""}
            {data.user_id !== id ? (
              <a className="SellerInfoMess button contained">
                <IconMess /> Написать продавцу
              </a>
            ) : (
              ""
            )}
            {data.user_id !== id ? (
              <button className="SellerInfoCall button contained" onClick={() => setPhoneModuleState(!phoneModuleState)}>
                <IconCall /> Показать номер
              </button>
            ) : (
              ""
            )}
            {objP.adstatus !== 7 ? (
              <div className="SellerInfoAboutDeal">
                <div>
                  {data.secure_transaction && <div className="SellerInfoSecure superLight">Безопасная сделка</div>}
                  {data.delivery && <div className="SellerInfoDelivery superLight">Возможна доставка</div>}
                </div>
                <div className="SellerInfoSeen dark">{data.reviewed} +4</div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
        {data.user_id !== id && !matchesMobile && !matchesTablet && <div className="SellerInfoBuy" onClick={() => router.push("/checkout/buy")} >Купить</div>}
        {objP.adstatus !== 7 && !matchesMobile && !matchesTablet && (
          <div className="ad__block_middle">
            {data.user_id === id ? <a className="up_view_btn button contained">Увеличить просмотры</a> : ""}
            {data.user_id === id ? (
              <div className="ad__block_middle__description_service">
                <span className="description_service">Применена услуга: выделение цветом, показ в других городах, VIP-объявление, проднятие в топе</span>
                <span className="service_days_left">Осталось 30 дней</span>
              </div>
            ) : (
              ""
            )}
            {data.user_id === id ? <a className="ad_btn ad_btn_edit buttonGrey button">Редактировать</a> : ""}
            {data.user_id === id ? (
              <a onClick={(e) => pushCheck(e)} className="ad_btn buttonGrey button">
                Снять с публикации
              </a>
            ) : (
              ""
            )}
            {objP.adstatus === 2 || objP.adstatus === 3 || objP.adstatus === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Активировать</a> : ""}
            {objP.adstatus === 2 || objP.adstatus === 3 || objP.adstatus === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Редактировать</a> : ""}
            {objP.adstatus === 2 || objP.adstatus === 3 ? <a className="ad_btn ad_btn_edit buttonGrey button">Удалить</a> : ""}
            {objP.adstatus === 4 ? <p className="date__last__edit">Дата последнего редактирования 00.00.00</p> : ""}
            {objP.adstatus === 4 ? (
              <p className="reason__rejection">
                Причина отклонения: <span>Неверная цена / Неверная категория / Невозможно дозвониться / Признаки дискриминации / Товар или услуга, запрещенные к продаже в РФ / В одном объявлении несколько предложений товаров и услуг /Использование одинаковых изображений в разных объявлениях / Контактная информация в названии, тексте объявления или на фото / Нарушение других правил Квик</span>
              </p>
            ) : (
              ""
            )}
            {objP.adstatus === 4 || objP.adstatus === 6 ? <a className="ad_btn ad_btn_edit buttonGrey button">Редактировать</a> : ""}
            {objP.adstatus === 4 || objP.adstatus === 6 ? <a className="ad_btn ad_btn_edit buttonGrey button">Удалить</a> : ""}
            {objP.adstatus === 6 ? (
              <p className="ad__last__edit">
                Дата последнего редактирования 00.00.00
                <span>Будет удалено навсегда через 00 дней</span>
              </p>
            ) : (
              ""
            )}
          </div>
        )}
        <Dialog open={openStatForm} onClose={() => setOpenStatForm(!openStatForm)} fullWidth maxWidth="sm">
          <Statistics Close={handleStatFormDialog} />
        </Dialog>
        {/*  */}

        <PhoneModule dialog={phoneModuleState} setDialog={setPhoneModuleState} />


        <Dialog open={openUnpublishForm} onClose={() => setOpenUnpublishForm(!openUnpublishForm)} fullWidth maxWidth="xs">
          <UnpublishForm isProductPages Close={handleUnpublishFormDialog} />
        </Dialog>
      </UnpublishCTX.Provider>
    </>
  );
}
