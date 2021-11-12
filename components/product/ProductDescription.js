import React from 'react';
import ProductInformationPlaceHolder from "../placeHolders/ProductInformationPlaceHolder/ProductInformationPlaceHolder";


const ProductDescription = ({description, mobile, style}) => {
	return (
		description === undefined ? <ProductInformationPlaceHolder/> :
		<>
			<div className="productWrap" style={{...style}}>
				{mobile && <div className="productLocality" style={{padding: "14px 0"}}>Описание</div>}
				<pre className='productDescription'>{description}</pre>
			</div>
		</>
				
	)
}


export default ProductDescription;
