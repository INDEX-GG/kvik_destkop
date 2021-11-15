import React from "react";
import { useMedia } from "../../hooks/useMedia";
import { useAuth } from "../../lib/Context/AuthCTX";
import ProductUserBlockSubRep from "./ProductUser/ProductUserBlockSubRep";
import ProductSmallAds from "./ProductUser/ProductSmallAds";
import ProductUser from "./ProductUser/ProductUser";

export default function ProductUserInfo(data) {
	const { id } = useAuth();

	const objP = { adstatus: 8 };

	const { matchesMobile, matchesTablet } = useMedia();

	console.log('data.userAd',data.userAd)
	const userAdWithArchiveOffers = data.userAd?.filter(item => item.active === 0)

	return (
		data.user_id ? 
		<>
			<div className="ad__block_bottom">
				<div className="SellerInfoUserBlock">
					<ProductUser id={id} sellerId={data.user_id} userPhoto={data.userPhoto} name={data.name} raiting={data.raiting} userrate={objP.userrate} status={4} userAd={userAdWithArchiveOffers}  mobile={matchesTablet || matchesMobile} />
				</div>
				<ProductSmallAds id={id} sellerId={data.user_id} smallAd={userAdWithArchiveOffers} mobile={matchesTablet || matchesMobile}/>
			</div>
			<ProductUserBlockSubRep id={id} sellerId={data.user_id} mobile={matchesMobile || matchesTablet} />
		</> : null
	);
}
