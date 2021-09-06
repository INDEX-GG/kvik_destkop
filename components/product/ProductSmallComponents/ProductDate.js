import React from 'react';


const ProductDate = ({id, sellerId, date, mobile, leftDay = 0}) => {
	let divClass = id === sellerId ? "SellerInfoDate" : "SellerInfoDate_active"
	if (mobile) divClass = 'SellerInfoDate'
	return (
	<>
		<div className={divClass}>Размещено {date}</div>
		{id == sellerId ? <span className="ad__block_top__days_left">Осталось {leftDay} дней</span> : null}
	</>
	)
}

export default ProductDate;