import React from 'react'
import { useMedia } from '../../hooks/useMedia';
import ProrductLastEdit from './ProductSmallComponents/ProductLastEdit';
import ProductWarning from './ProductSmallComponents/ProductWarning';
import ProductButtonAds from './ProductUI/ProductButtonAds';


const ProductButtonChangeAds = ({id, sellerId, status, lastDate, mobile, setOpenUnpublishForm}) => {

  const {matchesTablet} = useMedia();
  const width = matchesTablet ? status === 2 || status === 3 || status === 6 ? '100' : '' : '';
  console.log("данные в setOpenUnpublishForm =====>", status)
  
  return (
	id == sellerId ? 
	<>
		{status === 4 ? <ProrductLastEdit lastDate={lastDate}/> : ""}
		{status === 4 ? <ProductWarning status={0}/> : null}
		<div style={{flexWrap: 'wrap'}} className={mobile ? 'SellerInfo__adaptive_buttons' : ''}>
			{status === 2 || status === 3 || status === 5 ? <ProductButtonAds width={width} title='Активировать'/> : null}
			{status === 0 || status === 1 || status === 2 || status === 3 || status === 4 || status === 5 ? <ProductButtonAds width={width} left title='Редактировать'/> : null}
			{status === 1 || status === 0 || status === 3 ? <ProductButtonAds width={width} title='Cнять с публикации' onClick={() => setOpenUnpublishForm(true)}/> : null}
			{status === 2 || status === 4 || status === 6 ? <ProductButtonAds width={width} title='Удалить'/> : null}
		</div>
	</> : null
  )
}

export default ProductButtonChangeAds;