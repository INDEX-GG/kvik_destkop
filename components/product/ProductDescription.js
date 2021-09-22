import React from 'react';


const ProductDescription = ({description, mobile, style}) => {
	return (
		description == undefined ? 
		<div style={{order: 0}} className="placeholder_animation product__placeholder_description"></div> :
		<>
			<div style={{...style}}>
				{mobile && <div className="productLocality" style={{padding: "14px 0"}}>Описание</div>}
				<pre className='productDescription'>{description}</pre>
			</div>
		</>
				
	)
}


export default ProductDescription;
