import React from 'react';
import ChartLogo from "../../../icons/chart/ChartLogo";
import Views from "../../../UI/icons/Views";
import Like from "../../../UI/icons/Like";

const ProductStats = ({status, id, sellerId, dialog, setDialog, mobile, views}) => {

	return (
		status !== 7 && sellerId === id ?
		(<div className={mobile ? '' : "SellerInfoTopButtons"}>
			<div className="statistic__header__block_right">
			    <span><Like /> 3 (+1) </span>
			    <span><Views /> {views ? `+ ${views}` : 0}</span>
			</div>
			<a className="SellerInfoStatShow underline highlight" onClick={() => setDialog(!dialog)}> 
				<ChartLogo/>
			</a>
		</div>)
		: null
	)
}

export default ProductStats;