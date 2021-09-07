import { useRouter } from 'next/router';
import React from 'react';
import ProductWarning from './ProductSmallComponents/ProductWarning';
import ProductButton from './ProductUI/ProductButton';


const ProductAdsChange = ({mobile, status, id, sellerId = undefined, modalFunc}) => {
	const router = useRouter();
	return (
		mobile ? '' : (
          sellerId == undefined ?
            <div className='product__placeholder_ProductAction_main'><div className="placeholder_animation product__placeholder_ProductAction_two "></div>
              <div className="placeholder_animation product__placeholder_ProductAction_two_tow "></div> </div> :
            <>
              {/* {sellerId !== id && <div className="SellerInfoBuy" onClick={() => router.push("/checkout/buy")} >Купить</div>} */}
			  {sellerId !== id && <ProductButton className="SellerInfoBuy" onClick={() => router.push("/checkout/buy")}  title='Купить'/>}
              {status !== 7 && (
                <div className="ad__block_middle">
                  {/* {sellerId === id ? <a className="up_view_btn button contained">Увеличить просмотры</a> : ""} */}
                  {sellerId === id ? (
                    <div className="ad__block_middle__description_service">
                      {/* потом восстановить! */}
                      {/* <span className="description_service">Применена услуга: выделение цветом, показ в других городах, VIP-объявление, проднятие в топе</span> */}
                      {/* <span className="service_days_left">Осталось 30 дней</span> */}
                    </div>
                  ) : (
                    ""
                  )}
                  {sellerId === id ? <ProductButton className="ad_btn ad_btn_edit buttonGrey button">Редактировать</ProductButton> : ""}
                  {sellerId === id ? (
                    <ProductButton onClick={(e) => modalFunc(e)} className="ad_btn buttonGrey button">
                      Снять с публикации
                    </ProductButton>
                  ) : (
                    ""
                  )}
                  {status === 2 || status === 3 || status === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Активировать</a> : ""}
                  {status === 2 || status === 3 || status === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Редактировать</a> : ""}
                  {status === 2 || status === 3 ? <a className="ad_btn ad_btn_edit buttonGrey button">Удалить</a> : ""}
                  {status === 4 ? <p className="date__last__edit">Дата последнего редактирования 00.00.00</p> : ""}
                  {status === 4 ? (
                    <ProductWarning status={0}/>
                  ) : (
                    ""
                  )}
                  {status === 4 || status === 6 ? <a className="ad_btn ad_btn_edit buttonGrey button">Редактировать</a> : ""}
                  {status === 4 || status === 6 ? <a className="ad_btn ad_btn_edit buttonGrey button">Удалить</a> : ""}
                  {status === 6 ? (
                    <p className="ad__last__edit">
                      Дата последнего редактирования 00.00.00
                      <span>Будет удалено навсегда через 00 дней</span>
                    </p>
                  ) : (
                    ""
                  )}
                </div>


              )}

              {sellerId == undefined ?
                <div className="placeholder_animation product__placeholder_ProductAction_three "></div>
                : ''
              }
            </>
        )
	)
}


export default ProductAdsChange;