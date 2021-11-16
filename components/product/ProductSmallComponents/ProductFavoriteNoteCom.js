import React from 'react';
import Favorits from '../../../UI/Favorits';
// import Views from "../../../UI/icons/Views";


const ProductFavoriteNoteCom = ({sellerId, id, isOffer,  }) => {
	// mobile, views

	return (
		sellerId === id ? null:
		<div className="SellerInfoTopButtons">
			<div style={{display: "flex"}}>
				{/*<div className="statistic__header__block_right">*/}
				{/*	<span><Views /> {views ? `+ ${views}` : 0}</span>*/}
				{/*</div>         Скрыто пока не работает функцианал                        */}
			</div>
			<div style={{display: "flex"}}>
				<Favorits isProduct idOffer={isOffer} />
				{/*{mobile ? null : <a className="SellerInfoCompare"></a>}     Скрыто пока не работает функцианал           */}
			</div>
		</div>
	)
}


export default ProductFavoriteNoteCom;