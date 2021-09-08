import React from 'react';
import { ToRubles } from '../../lib/services';

const ProductPrice = ({mobile, oldPrice, price, id, sellerId, trade, status}) => {

	return (
		mobile ? 
		<div className='SellerInfoOldPrice__adaptive'>
			<div className="SellerInfoOldPrice thin dark crossed">{oldPrice ? ToRubles(oldPrice) : ''}</div>
            <div className="SellerInfoPrice thin xxl">{ToRubles(price)}</div>
			{status !== 7 ? <div className="SellerInfoBargain dark thin">{sellerId !== id && trade &&  <p>Торг уместен</p>}</div> : ''}
		</div> :
		<>
			<div className="SellerInfoOldPrice thin dark crossed">{oldPrice ? ToRubles(oldPrice) : ''}</div>
            <div className="SellerInfoPrice thin xxl">{ToRubles(price)}</div>
			{status !== 7 ? <div className="SellerInfoBargain dark thin">{sellerId !== id && trade &&  <p>Торг уместен</p>}</div> : ''}
		</>
	)
}

export default ProductPrice;