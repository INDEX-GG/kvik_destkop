import { useRouter } from 'next/router';
import React from 'react'
const ProductAdsLength = ({id, sellerId, smallAd, mobile}) => {
	const router = useRouter();
	return (
		smallAd == undefined ? '' : sellerId != id ? (
			!mobile ? (
				<a className="SellerInfoUserOffersCollapse highlight underline" target="_blank" 
				onClick={() => router.push({
					pathname: `/user/${sellerId}`
				})}
				/* onClick={(e) => { handleCollapse(e)}} */>
					{(`Все объявления продавца (${smallAd == undefined ? "0" : smallAd.length})`) || `Скрыть`}
				</a>
			) : (
				""
			)
		) : (
			<a className="SellerInfoUserOffersCollapse highlight underline" target="_blank" 
			onClick={() => router.push({
				pathname: `/user/${sellerId}`
			})}
			/* onClick={(e) => { handleCollapse(e)}} */>
				{(`Все объявления (${smallAd == undefined ? "0" : smallAd.length})`) || `Скрыть`}
			</a>
		)
	)
}

export default ProductAdsLength;