import { Avatar } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useMedia } from '../../../hooks/useMedia';
import StarRating from '../../StarRating';


const ProductUser = ({id, sellerId, userPhoto, name, raiting, mobile, userAd, status, userrate}) => {
	const router = useRouter();
	const {matchesMobile} = useMedia();
	return (
		<>
			<Avatar alt="User" src={userPhoto} className="SellerInfoUserPic" onClick={() => {
				router.push(`/user/${sellerId}`)
			}} />

			{sellerId === undefined ? <div className="placeholder_animation product__placeholder_userinfo"></div> :
				<>
					<div>
						<div className='productUserName' onClick={() => {
							router.push(`/user/${sellerId}`)

						}}> {name} </div>
						<div>
							<div className="SellerInfoRateNumber">{userrate} </div>
							<StarRating rating={raiting}/>
							{sellerId === id || status === 2 || status === 3 || status === 4 || status === 5 || status === 6 ? (
								mobile ? (
									<>
										{sellerId != id && <span className="count__ad">{userAd == undefined ? "" : ((userAd).filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active === 0)).length} объявлений</span>}
										{sellerId != id && <a className="SellerInfoloarmore"></a>}
									</>
								) : ("")) : ("")}
						</div>
						{matchesMobile ?
							(
								<>
									<span style={{ marginLeft: "0px" }} className="count__ad">{userAd == undefined ? "" : ((userAd).filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active === 0)).length} объявлений</span>
								</>
							) : null}
					</div>


					{sellerId !== id ?
						mobile ? '' :
							<div className="ad__block_bottom__adaptive_left">
								<a className="SellerInfoUserAdd"></a>
							</div>
						: ''
					}

					{/* {status === 7 && sellerId === id ? !matchesMobile && !matchesTablet ? <a className="SellerInfoUserAdd"></a> : "" : ""} */}

					{mobile ? (
						matchesMobile ? null : (
							<>
								<div className="SellerProductInfo">
									{sellerId != id && <span className="count__ad">{userAd == undefined ? "" : ((userAd).filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active === 0)).length} объявлений</span>}
									{sellerId != id && <a className="SellerInfoloarmore">&nbsp;</a>}
								</div>
							</>
						)
					) : (
						""
					)}
				</>
			}
		</>
	)
}

export default ProductUser;