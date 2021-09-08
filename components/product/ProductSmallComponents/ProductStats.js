import React from 'react';


const ProductStats = ({status, id, sellerId, dialog, setDialog, mobile}) => {

	if (mobile) {
		console.log(sellerId, id)
		return (
			sellerId === id ?
			<a className="SellerInfoStatShow underline highlight" onClick={() => setDialog(!dialog)}>
				Статистика
			</a> : null
		) 
	}

	return (
		status !== 7 && sellerId == id ?
		(<div className="SellerInfoTopButtons">
			<a className="SellerInfoStatShow underline highlight" onClick={() => setDialog(!dialog)}> 
				Статистика
			</a>
		</div>)
		: null
	)
}

export default ProductStats;