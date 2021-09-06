import React from 'react';



const ProductDeal = ({children, id, sellerID}) => {
	return (
		id == sellerID ? null : 
		<>
			{children}
		</>
	)
}



export default ProductDeal;