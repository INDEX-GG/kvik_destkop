import React, { useState } from "react";
import { useMedia } from "../../hooks/useMedia";
import { ToRubles, ToRusDate } from "../../lib/services";
import { Dialog } from "@material-ui/core";
import IconCall from "../../UI/icons/IconCall";
import IconMess from "../../UI/icons/IconMess";
import Statistics from "../../components/Statistics";
import PhoneModule from "./PhoneModule";
import { useAuth } from "../../lib/Context/AuthCTX";
import UnpublishForm from "../UnpublishForm";
import { UnpublishCTX } from "../../lib/Context/DialogCTX";
import router from "next/router";
import ProductButton from "./ProductUI/ProductButton";
import ProductDeal from "./ProductDeal";
import ProductDate from "./ProductSmallComponents/ProductDate";
import ProductPrice from "./ProductPrice";
import ProductOption from "./ProductOption";
import ProductStats from "./ProductSmallComponents/ProductStats";
import ProductFavoriteNoteComp from "./ProductSmallComponents/ProductFavoriteNoteCom";
export default function ProductAction(data) {
  const { id } = useAuth();
  const [openStatForm, setOpenStatForm] = useState(false);
  const [phoneModuleState, setPhoneModuleState] = useState(false);
  const handleStatFormDialog = () => setOpenStatForm(!openStatForm);

  const { matchesMobile, matchesTablet } = useMedia();

  const objP = { adstatus: 8 };
  const [offerId, setOfferId] = useState();

  const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
  const handleUnpublishFormDialog = () => setOpenUnpublishForm(!openUnpublishForm);

  /* Модальное окно */
  function pushCheck() {
    setOfferId(+data.router);
    setOpenUnpublishForm(!openUnpublishForm);
    handleUnpublishFormDialog();
  }


  console.log(data.trade)

  return (
    <>
      <UnpublishCTX.Provider value={{ offerId, openUnpublishForm, setOpenUnpublishForm }}>


        {!matchesMobile && !matchesTablet && (
          data.user_id == undefined ? <div className="placeholder_animation product__placeholder_ProductAction_one"></div> :
            <>
              <div className={objP.adstatus === 7 ? "ad__block_top ad__padding-top" : "ad__block_top"}>
				<ProductStats status={objP.adstatus} sellerId={data.user_id} id={id} dialog={openStatForm} setDialog={setOpenStatForm} />
				<ProductFavoriteNoteComp sellerId={data.user_id} id={id} isOffer={+data.router}/>
				<ProductDate id={id} sellerId={data.user_id} date={ToRusDate(data.created_at)} leftDay={30} />
				<ProductPrice oldPrice={data.oldprice} price={data.price} id={id} sellerId={data.user_id} trade={data.trade} adstatus={objP.adstatus} />
				<ProductDeal id={id} sellerID={data.user_id}>
					<ProductButton className="SellerInfoMess button contained" title='Написать продацу' icon={<IconMess/>} />
					<ProductButton className="SellerInfoCall button contained" title='Показать номер' icon={<IconCall/>} onClick={() => setPhoneModuleState(!phoneModuleState)} />
				</ProductDeal>
				<ProductOption status={objP.adstatus} delivery={data.delivery} safeDeal={data.secure_transaction} reviewed={data.reviewed}/>
              </div>

            </>
        )
        }
        {!matchesMobile && !matchesTablet && (
          data.user_id == undefined ?
            <div className='product__placeholder_ProductAction_main'><div className="placeholder_animation product__placeholder_ProductAction_two "></div>
              <div className="placeholder_animation product__placeholder_ProductAction_two_tow "></div> </div> :
            <>
              {/* {data.user_id !== id && <div className="SellerInfoBuy" onClick={() => router.push("/checkout/buy")} >Купить</div>} */}
			  {data.user_id !== id && <ProductButton className="SellerInfoBuy" onClick={() => router.push("/checkout/buy")}  title='Купить'/>}
              {objP.adstatus !== 7 && (
                <div className="ad__block_middle">
                  {/* {data.user_id === id ? <a className="up_view_btn button contained">Увеличить просмотры</a> : ""} */}
                  {data.user_id === id ? (
                    <div className="ad__block_middle__description_service">
                      {/* потом восстановить! */}
                      {/* <span className="description_service">Применена услуга: выделение цветом, показ в других городах, VIP-объявление, проднятие в топе</span> */}
                      {/* <span className="service_days_left">Осталось 30 дней</span> */}
                    </div>
                  ) : (
                    ""
                  )}
                  {data.user_id === id ? <ProductButton className="ad_btn ad_btn_edit buttonGrey button">Редактировать</ProductButton> : ""}
                  {data.user_id === id ? (
                    <ProductButton onClick={(e) => pushCheck(e)} className="ad_btn buttonGrey button">
                      Снять с публикации
                    </ProductButton>
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

              {data.user_id == undefined ?
                <div className="placeholder_animation product__placeholder_ProductAction_three "></div>
                : ''
              }
            </>
        )}

        <Dialog open={openStatForm || false} onClose={() => setOpenStatForm(!openStatForm)} fullWidth maxWidth="sm">
          <Statistics Close={handleStatFormDialog} />
        </Dialog>
        {/*  */}

        <PhoneModule dialog={phoneModuleState} setDialog={setPhoneModuleState} />


        <Dialog open={openUnpublishForm || false} onClose={() => setOpenUnpublishForm(!openUnpublishForm)} fullWidth maxWidth="xs">
          <UnpublishForm isProductPages Close={handleUnpublishFormDialog} />
        </Dialog>
      </UnpublishCTX.Provider>
    </>
  );
}
