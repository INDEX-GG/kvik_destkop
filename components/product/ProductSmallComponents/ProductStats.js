import React from 'react';


const ProductStats = ({status, id, sellerId, dialog, setDialog, mobile}) => {

	return (
		status !== 7 && sellerId === id ?
		(<div className={mobile ? '' : "SellerInfoTopButtons"}>
			<a className="SellerInfoStatShow underline highlight" onClick={() => setDialog(!dialog)}> 
				Статистика
			</a>
		</div>)
		: null
	)
}

export default ProductStats;