import React from 'react';


const ProductUserBlockSubRep = ({id, sellerdId, mobile}) => {
	return (
		id == sellerdId ? null : 
		<div className="ad__block_bottom__adaptive">
			{mobile && (
				<div className="ad__block_bottom__adaptive_left">
					{" "}
					<a className="SellerInfoUserAdd"></a>Подписаться
				</div>
			)}
			<div className="ad__block_bottom__adaptive_right">
				<a className="SellerInfoShutUp small light underline">Заблокировать пользователя</a>
				<a className="SellerInfoComplain small light underline">Пожаловаться</a>
			</div>
		</div>
	)
}

export default ProductUserBlockSubRep;