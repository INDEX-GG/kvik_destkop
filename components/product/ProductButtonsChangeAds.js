import React from 'react'
import { useMedia } from '../../hooks/useMedia';
import ProrductLastEdit from './ProductSmallComponents/ProductLastEdit';
import ProductWarning from './ProductSmallComponents/ProductWarning';
import ProductButtonAds from './ProductUI/ProductButtonAds';


const ProductButtonChangeAds = ({id, sellerId, status, lastDate, mobile, setOpenOfferModal, setButtonId}) => {

  const {matchesTablet} = useMedia();
  const width = matchesTablet ? status === 2 || status === 3 || status === 6 ? '100' : '' : '';

  
  return (
	id == sellerId ? 
	<>
		{status === 4 ? <ProrductLastEdit lastDate={lastDate}/> : ""}
		{status === 4 ? <ProductWarning status={0}/> : null}
		<div style={{flexWrap: 'wrap'}} className={mobile ? 'SellerInfo__adaptive_buttons' : ''}>
			{status === 1 || status === 2 || status === 3 || status === 5 ? <ProductButtonAds width={width} title='Активировать' onClick={() => {setOpenOfferModal(true); setButtonId("001")}}/> : null}
			{status === 0 || status === 1 || status === 2 || status === 3 || status === 4 || status === 5 ? <ProductButtonAds width={width} left title='Редактировать'/> : null}
			{status === 0 ? <ProductButtonAds width={width} title='Cнять с публикации' onClick={() => {setOpenOfferModal(true); setButtonId("003")}}/> : null}
			{status === 1 || status === 2 || status === 3 || status === 6 ? <ProductButtonAds width={width} title='Удалить' onClick={() => {setOpenOfferModal(true); setButtonId("002")}}/> : null}
		</div>
	</> : null
  )
}

export default ProductButtonChangeAds;