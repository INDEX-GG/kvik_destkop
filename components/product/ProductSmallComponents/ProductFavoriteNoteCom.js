import React from 'react';
import Favorits from '../../../UI/Favorits';


const ProductFavoriteNoteCom = ({sellerId, id, isOffer, mobile}) => {
	return (
		sellerId === id ? null:
		<div className="SellerInfoTopButtons">
			<Favorits isProduct idOffer={isOffer} />
			{mobile ? null : <a className="SellerInfoCompare"></a>}
		</div>
	)
}


export default ProductFavoriteNoteCom;