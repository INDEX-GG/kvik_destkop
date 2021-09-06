import React from 'react';


const ProductButton = ({icon, title, ...props}) => {
	return ( 
		<a {...props}>
			{icon} {title}
		</a>
	)
}


export default ProductButton;