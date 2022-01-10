import { useRouter } from 'next/router';
import React from 'react'
const ProductAdsLength = ({id, sellerId, smallAd}) => {
	// все пропсы {id, sellerId, smallAd, mobile}
	const router = useRouter();
	return (
		smallAd == undefined ? '' : sellerId != id ? (
			
				<a className="SellerInfoUserOffersCollapse highlight underline" target="_blank" 
				onClick={() => router.push({
					pathname: `/user/${sellerId}`
				})}
				/* onClick={(e) => { handleCollapse(e)}} */>
					{(`Объявлений (${smallAd == undefined ? "0" : smallAd.length})`) || `Скрыть`}
				</a>
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