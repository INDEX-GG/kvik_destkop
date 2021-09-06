import React from 'react';


const ProductProperties = ({name, desc}) => {
	return (
		name && desc == undefined ? 
		<div className="placeholder_animation product__placeholder_description"></div> :
		<>
			{/*	<div>
				<div>Свойство</div>
				<div>Значение</div>
			</div>
			<div>
				<div>Свойство</div>
				<div>Значение</div>
			</div>*/}
			<div>
				<div className="productLocality">{name}</div>
				<pre className='productDescription'>{desc}</pre>
			</div>
		</>
				
	)
}


export default ProductProperties;