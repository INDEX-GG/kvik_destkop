// import { autocompleteClasses } from '@mui/material';
import React from 'react';

const ProductSocial = () => {
	return (
		// <div style={{width: '108px', marginLeft: 'auto', marginRight: 'auto', paddingTop: 15,}}>
		<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', borderBottom: '1px solid #e9e9e9', paddingBottom: '24px'}}>
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
