import React from 'react';
import ProductReviewed from './ProductSmallComponents/ProductReviewed';


const ProductOption = ({status, delivery, reviewed, safeDeal, mobile}) => {


	if (mobile) {
		return (
			<div className="SellerInfo__adaptive_information">
				{safeDeal && <div className="SellerInfoSecure superLight">Безопасная сделка</div>}
				{delivery && <div className="SellerInfoDelivery superLight">Возможна доставка</div>}
			</div>
		)
	}


	return (
		status !== 7 ? 
		(
			<div className="SellerInfoAboutDeal">
				<div>
					{safeDeal && <div className="SellerInfoSecure superLight">Безопасная сделка</div>}
					{delivery && <div className="SellerInfoDelivery superLight">Возможна доставка</div>}
				</div>
				{reviewed != undefined && <ProductReviewed reviewed={reviewed}/>}
			</div>
		) : null
	)
                
}

export default ProductOption;