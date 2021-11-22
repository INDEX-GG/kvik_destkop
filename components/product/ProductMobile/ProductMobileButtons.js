import { useRouter } from 'next/router';
import React from 'react'
import IconCall from '../../../UI/icons/IconCall';
import IconMess from '../../../UI/icons/IconMess';
import ProductButtonChangeAds from '../ProductButtonsChangeAds';
import ProductDeal from '../ProductDeal';
import ProductOption from '../ProductOption';
import ProductButton from '../ProductUI/ProductButton';
import { Dialog } from '@material-ui/core';
import OfferModal from "../../OfferModal";



const ProductMobileButtons = ({id, sellerId, mobile, photo, status, secure_transaction, delivery, setDialog, productInfo, /*update,*/ setUpdate, createChat}) => {
 	const router = useRouter();
	const [openOfferModal, setOpenOfferModal] = React.useState(false);
	const [buttonId, setButtonId] = React.useState('');
	const offerId = [productInfo?.id]
	const offerData = productInfo;
	
 	return (
		<div>
			{mobile && (

				photo == undefined ?
					''
					:
					sellerId ? 
					<>
						<div className="SellerInfo__adaptive_button">
							{/* {status === 2 || status === 3 || status === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Активировать</a> : ""}
							{status === 2 || status === 3 || status === 5 ? <a className="ad_btn ad_btn_edit buttonGrey button">Редактировать</a> : ""} */}
							{/* {status === 2 || status === 3 ? <a className="ad_btn ad_btn_edit buttonGrey button">Удалить</a> : ""} */}
							{/* {sellerId === id ? <a className="up_view_btn button contained">Увеличить просмотры</a> : ""} */}
							<div className="ad__block_middle__description_service">
								{/* {sellerId === id ? <span className="description_service">Применена услуга: выделение цветом, показ в других городах, VIP-объявление, проднятие в топе</span> : ""} */}
								<div className="SellerInfo__adaptive_buttons__top">
									<ProductDeal id={id} sellerID={sellerId}>
										<ProductButton onClick={createChat} className="SellerInfoMess button contained" title='Написать продацву' icon={<IconMess/>} />
										<ProductButton className="SellerInfoCall button contained" onClick={() => setDialog(true)} title='Показать номер' icon={<IconCall/>} />
									</ProductDeal>
								</div>
								
								{sellerId === id || sellerId !== id ? (
									<ProductOption safeDeal={secure_transaction} deliver={delivery} mobile/>
								) : ''}
								{sellerId !== id && <ProductButton style={{display: 'block'}} className="SellerInfoBuy buy_btn__adaptive" onClick={() => router.push("/checkout/buy")}  title='Купить'/>}
								<ProductButtonChangeAds id={id} sellerId={sellerId} status={status} lastDate={0} mobile={mobile} setOpenOfferModal={setOpenOfferModal} setButtonId={setButtonId}/>
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
						<Dialog open={openOfferModal} onClose={() => setOpenOfferModal(!setOpenOfferModal) } fullWidth maxWidth="xs">
							<OfferModal
								offerId={offerId}
								offerData={offerData}
								setUpdate={setUpdate}
								buttonId={buttonId}
								openOfferModal={openOfferModal}
								setOpenOfferModal={setOpenOfferModal}
							/>
						</Dialog>
					</> : null
			)}
		</div>
 )
}

export default ProductMobileButtons;