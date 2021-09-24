import { useRouter } from 'next/router';
import React from 'react'
import IconCall from '../../../UI/icons/IconCall';
import IconMess from '../../../UI/icons/IconMess';
import ProductButtonChangeAds from '../ProductButtonsChangeAds';
import ProductDeal from '../ProductDeal';
import ProductOption from '../ProductOption';
import ProductButton from '../ProductUI/ProductButton';
import { UnpublishCTX } from '../../../lib/Context/DialogCTX';
import { Dialog } from '@material-ui/core';
import UnpublishForm from '../../UnpublishForm';


const ProductMobileButtons = ({id, sellerId, mobile, photo, status, secure_transaction, delivery, setDialog, productInfo}) => {
 	const router = useRouter();
	const [openUnpublishForm, setOpenUnpublishForm] = React.useState(false)
	const dataCheck = [productInfo?.id]
	const offerData = productInfo;
	
 	console.log("PHOTO------------------>", photo)
 	return (
		<div>
			{mobile && (

				photo == undefined ?
					''
					:
					sellerId ? 
					<UnpublishCTX.Provider value={{offerData, dataCheck, openUnpublishForm, setOpenUnpublishForm}}>
						<div className="SellerInfo__adaptive_button">
							{/* {status === 2 || status === 3 || status === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Активировать</a> : ""}
							{status === 2 || status === 3 || status === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Редактировать</a> : ""} */}
							{/* {status === 2 || status === 3 ? <a className="ad_btn ad_btn_edit buttonGrey button">Удалить</a> : ""} */}
							{/* {sellerId === id ? <a className="up_view_btn button contained">Увеличить просмотры</a> : ""} */}
							<div className="ad__block_middle__description_service">
								{/* {sellerId === id ? <span className="description_service">Применена услуга: выделение цветом, показ в других городах, VIP-объявление, проднятие в топе</span> : ""} */}
								<div className="SellerInfo__adaptive_buttons__top">
									<ProductDeal id={id} sellerID={sellerId}>
										<ProductButton className="SellerInfoMess button contained" title='Написать продацу' icon={<IconMess/>} />
										<ProductButton className="SellerInfoCall button contained" onClick={() => setDialog(true)} title='Показать номер' icon={<IconCall/>} />
									</ProductDeal>
								</div>
								
								{sellerId === id || sellerId !== id ? (
									<ProductOption safeDeal={secure_transaction} deliver={delivery} mobile/>
								) : ''}
								{sellerId !== id && <ProductButton style={{display: 'block'}} className="SellerInfoBuy buy_btn__adaptive" onClick={() => router.push("/checkout/buy")}  title='Купить'/>}
								<ProductButtonChangeAds id={id} sellerId={sellerId} status={status} lastDate={0} mobile={mobile} setOpenUnpublishForm={setOpenUnpublishForm}/>
								{/* {status === 4 ? <ProrductLastEdit lastDate={0}/> : ""}
								{status === 4 ? <ProductWarning status={0}/> : ''}
								{status === 6 ? (
									<p className="ad__last__edit">
										Дата последнего редактирования 00.00.00
										<span>Будет удалено навсегда через 00 дней</span>
									</p>
								) : (
									""
								)}
								<div className="SellerInfo__adaptive_buttons">
									{true ? <a className="ad_btn_edit buttonGrey button btn-left">Редактировать</a> : ""}
									{true ? <a className="ad_btn_edit buttonGrey button ">Удалить</a> : ""}
									{sellerId === id ? <a className="ad_btn_edit buttonGrey button btn-left">Редактировать</a> : ""}
									{sellerId === id ? <a className="ad_btn ad_btn_edit buttonGrey button">Снять с публикации</a> : ""}
								</div> */}
							</div>
						</div>
						<Dialog open={openUnpublishForm} onClose={() => setOpenUnpublishForm(!openUnpublishForm) } fullWidth maxWidth="xs">
							<UnpublishForm/>
						</Dialog>
					</UnpublishCTX.Provider> : null
			)}
		</div>
 )
}

export default ProductMobileButtons;