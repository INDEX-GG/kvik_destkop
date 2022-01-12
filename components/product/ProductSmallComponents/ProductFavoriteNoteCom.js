import React from 'react';
import Favorits from '../../../UI/Favorits';
// import Views from "../../../UI/icons/Views";


const ProductFavoriteNoteCom = ({isOffer, id, sellerId}) => {
	// mobile, views, sellerId, id - неиспользуемые пропсы

	// проверяем булем, находимся ли мы на своей странице
	const isPageOwner = sellerId === id

	return (
		// sellerId === id ? null:
		<div className="SellerInfoTopButtons">
			{/* <div style={{display: "flex"}}> */}
				{/*<div className="statistic__header__block_right">*/}
				{/*	<span><Views /> {views ? `+ ${views}` : 0}</span>*/}
				{/*</div>         Скрыто пока не работает функцианал                        */}
			{/* </div> */}
			<div className={'favoritsContainer'}>
				{!isPageOwner && <Favorits isProduct idOffer={isOffer} />}
				{/*{mobile ? null : <a className="SellerInfoCompare"></a>}     Скрыто пока не работает функцианал           */}
			</div>
		</div>
	)
}


export default ProductFavoriteNoteCom;