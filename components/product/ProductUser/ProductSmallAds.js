import React from 'react';
import Link from 'next/link';
import { ToRubles } from '../../../lib/services';
import { useRouter } from 'next/router';


const ProductSmallAd = ({id, sellerId, status, mobile, smallAd}) => {
	const router = useRouter();
	let userSmallAd = ''
	return (
		<>
		{
			status === 7 || sellerId != id ? (
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

						{
							(userSmallAd = smallAd?.filter((item) => item.id != router.query.id)) &&
							userSmallAd.slice(0, 3).map((userAd) => {
								return (
									<Link key={userAd.id} href={`/product/${userAd.id}`}>
										<div className="SellerInfoOfferCard small">
											{console.log(userAd)}
											{userAd.photo?.slice(0, 1).map((imgs, i) => {
												return <img key={i} src={imgs} />;
											})}
											<div>{ToRubles(userAd.price)}</div>
											<div>{userAd.title.length > 15 ? userAd.title.slice(0, 12) + "..." : userAd.title}</div>
										</div>
									</Link>
								);
							}
							)
							// ||
							// data.userAd.map((userAd) => {
							//   return (
							//     <Link key={userAd.id} href={`/product/${userAd.id}`}>
							//       <div className="SellerInfoOfferCard small">
							//         {JSON.parse(userAd.photo)
							//           .photos.slice(0, 1)
							//           .map((imgs, i) => {
							//             return <img key={i} src={imgs} />;
							//           })}
							//         <div>{ToRubles(userAd.price)}</div>
							//         <div>{userAd.title.length > 15 ? userAd.title.slice(0, 12) + "..." : userAd.title}</div>
							//       </div>
							//     </Link>
							//   );
							// })
						}

					</div>
				) : (
					""
				)
			) : ("")
		}
		{smallAd == undefined ? (
			""
		) : sellerId != id ? (
			!mobile ? (
				<a className="SellerInfoUserOffersCollapse highlight underline" target="_blank" onClick={() => router.push({
					pathname: `/user/${sellerId}`
				})}

		/* onClick={(e) => { handleCollapse(e)}} */>

					{(`Все объявления продавца (${smallAd == undefined ? "0" : smallAd.length})`) || `Скрыть`}
				</a>
			) : (
				""
			)
		) : (
			""
		)
		}
		</>
	)
}

export default ProductSmallAd;