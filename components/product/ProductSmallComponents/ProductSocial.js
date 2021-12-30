// import { autocompleteClasses } from '@mui/material';
import React from 'react';

const ProductSocial = () => {
	return (
		// <div style={{width: '108px', marginLeft: 'auto', marginRight: 'auto', paddingTop: 15,}}>
		<div className='productSocialContainer'>
			{/* <div className="productLocality">Поделиться</div> */}
			<p className="productShareTitle">Поделиться</p>
			<div style={{display: 'flex', justyfyContent: 'space-between'}}>
				<a className="productPageCharacterVK"></a>
				<a className="productPageCharacterFB"></a>
				<a className="productPageCharacterOK"></a>
			</div>
		</div>
	)
}


export default ProductSocial;
