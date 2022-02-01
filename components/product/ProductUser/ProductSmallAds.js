import React from 'react';
import Link from 'next/link';
import { ToRubles } from '../../../lib/services';

import ProductAdsLength from '../ProductSmallComponents/ProductAdsLength';
import { photos2arr } from '../../../lib/services';
import { STATIC_URL } from '#lib/constants';


const ProductSmallAd = ({id, sellerId, mobile, smallAd, totalProducts}) => {
	const isOwnerPage = id === sellerId
	// Заливаем корректные ссылки на фото
	const modifySmallAd = smallAd
	?.map(it=>({...it, photo: photos2arr(it.photo)}))
	.filter(it => it.photo !== undefined)
	

	// проп status не используется
	return (
		<> 
		{
			// status === 7 || sellerId !== id ? (
			!mobile ? (
				sellerId === undefined ?
					<>
						<div className="SellerInfoOffers">
							<div className='placeholder_animation product__placeholder_useroffer'>
								<div className="placeholder_animation product__placeholder_useroffer_block-top"></div>
								<div className="placeholder_animation product__placeholder_useroffer_block-bottom"></div>
							</div>
							<div className='placeholder_animation product__placeholder_useroffer'>
								<div className="placeholder_animation product__placeholder_useroffer_block-top"></div>
								<div className="placeholder_animation product__placeholder_useroffer_block-bottom"></div>
							</div>
							<div className='placeholder_animation product__placeholder_useroffer'>
								<div className="placeholder_animation product__placeholder_useroffer_block-top"></div>
								<div className="placeholder_animation product__placeholder_useroffer_block-bottom"></div>
							</div>
						</div>
					</>
					:
					<div className="SellerInfoOffers">
						{modifySmallAd && modifySmallAd?.map(item => {
							return (
								<Link key={item.id} href={`/product/${item.id}`}>
									<div className="SellerInfoOfferCard small">
										<img alt="Offer Photo" src={`${STATIC_URL}/${item.photo[0]}`}/>
										<div>{ToRubles(item.price)}</div>
										<div>{item.title.length > 15 ? item.title.slice(0, 12) + "..." : item.title}</div>
									</div>
								</Link>
							)
						})}
						{/* {
							(userSmallAd = smallAd?.filter((item) => {
								return item.id !== router.query.id && item.active === 0 && item.verify === 0
							})) &&
							userSmallAd.slice(0, 3).map((userAd) => {
								return (
										<Link key={userAd.id} href={`/product/${userAd.id}`}>
											<div className="SellerInfoOfferCard small">
												{userAd.photo?.slice(0, 1).map((imgs, i) => {
													return <img alt={"Offer photo"} key={i} src={imgs} />;
												})}
												<div>{ToRubles(userAd.price)}</div>
												<div>{userAd.title.length > 15 ? userAd.title.slice(0, 12) + "..." : userAd.title}</div>
											</div>
										</Link>
									);
								}
							)	
						} */}

							
					</div>

				) : (
					""
				)
			// ) : ("")
		}
		<ProductAdsLength id={id} sellerId={sellerId} smallAd={smallAd} mobile={mobile} productsCount={totalProducts} />
		{(!mobile && !isOwnerPage) &&
		<div className="ad__block_bottom__adaptive_right">
			<a className="SellerInfoComplain small light underline">Пожаловаться</a>
		</div>}
		</>
	)
}

export default ProductSmallAd;