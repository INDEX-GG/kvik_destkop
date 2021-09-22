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

	return (
		data.user_id ? 
		<>
			<div className="ad__block_bottom">
				<div className="SellerInfoUserBlock">
					<ProductUser id={id} sellerId={data.user_id} userPhoto={data.userPhoto} name={data.name} raiting={data.raiting} userrate={objP.userrate} status={4} userAd={data.userAd}  mobile={matchesTablet || matchesMobile} />
				</div>
				<ProductSmallAds id={id} sellerId={data.user_id} smallAd={data.userAd} mobile={matchesTablet || matchesMobile}/>
			</div>
			<ProductUserBlockSubRep id={id} sellerdId={data.user_id} mobile={matchesMobile || matchesTablet} />
		</> : null
	);
}
