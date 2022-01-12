// import { autocompleteClasses } from '@mui/material';
import { useMedia } from '#hooks/useMedia';
import React from 'react';

const ProductSocial = () => {
	const {matchesMobile, matchesTablet} = useMedia()
	const isMobile = matchesMobile || matchesTablet

	return (
		// <div style={{width: '108px', marginLeft: 'auto', marginRight: 'auto', paddingTop: 15,}}>
		<div className='productSocialContainer'>
			{/* <div className="productLocality">Поделиться</div> */}
			{!isMobile && <p className="productShareTitle">Поделиться</p>}
			<div style={{display: 'flex', justyfyContent: 'space-between'}}>
				<a className="productPageCharacterVK"></a>
				<a className="productPageCharacterFB"></a>
				<a className="productPageCharacterOK"></a>
			</div>
		</div>
	)
}


export default ProductSocial;
