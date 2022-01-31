import { useRouter } from 'next/router';
import React from 'react'
const ProductAdsLength = ({/*id,*/ sellerId, /*smallAd,*/ productsCount}) => {
	// все пропсы {id, sellerId, smallAd, mobile}

	const router = useRouter();
	return (
		<>
		{productsCount > 0
		&&
		<a className="SellerInfoUserOffersCollapse highlight underline" target="_blank" 
			onClick={() => router.push({
				pathname: `/user/${sellerId}`
			})}
			/* onClick={(e) => { handleCollapse(e)}} */>
				{`Все объявления (${productsCount})`}
		</a>
		}
			
		</>
		// smallAd == undefined ? '' : sellerId != id ? (
			
		// 		<a className="SellerInfoUserOffersCollapse highlight underline" target="_blank" 
		// 		onClick={() => router.push({
		// 			pathname: `/user/${sellerId}`
		// 		})}
		// 		/* onClick={(e) => { handleCollapse(e)}} */>
		// 			{(`Объявлений (${smallAd == undefined ? "0" : productsCount})`) || `Скрыть`}
		// 		</a>
		// ) : (
		// 	<a className="SellerInfoUserOffersCollapse highlight underline" target="_blank" 
		// 	onClick={() => router.push({
		// 		pathname: `/user/${sellerId}`
		// 	})}
		// 	/* onClick={(e) => { handleCollapse(e)}} */>
		// 		{(`Все объявления (${smallAd == undefined ? "0" : productsCount})`) || `Скрыть`}
		// 	</a>
		// )
	)
}

export default ProductAdsLength;