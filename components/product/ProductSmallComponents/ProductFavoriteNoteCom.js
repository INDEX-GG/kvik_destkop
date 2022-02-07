import React from 'react';
import Favorits from '../../../UI/Favorits';
// import Views from "../../../UI/icons/Views";
import EyeLogo from '../../../UI/icons/StatsEye'
import PhoneLogo from '../../../UI/icons/StatsPhone'
import { useMedia } from '#hooks/useMedia';
import {useProduct} from '../../../hooks/useProduct'
// import { useStatistics } from '#lib/Context/StatisticsCTX';
// import { makeStyles } from "@material-ui/core";
// import {useAuth} from '../../../lib/Context/AuthCTX'


// const useStyles = makeStyles(() => ({
// 	statsContainer: {

// 	})
// })


const ProductFavoriteNoteCom = ({isOffer, id, sellerId, /*stats*/}) => {


	const {
        // full_stat,
        all_time_viewing_count,
        last_day_viewing_count,
        // likes_count,
        all_time_contact_count,
        last_day_contact_count,
        // user_products_count,
    } = useProduct(isOffer)
	

	// useEffect(() => {
	// 	if(all_time_viewing_count) {
	// 		setIsRender(true)
	// 	}
	// }, [all_time_viewing_count])

	// console.log(isOffer)
	// console.log(auth)
	// mobile, views, sellerId, id - неиспользуемые пропсы
	// const {addContactClick} = useStatistics()
	// проверяем булем, находимся ли мы на своей странице
	const isPageOwner = sellerId === id
	const {matchesMobile, matchesTablet} = useMedia()
	const isMobile = matchesMobile || matchesTablet
	const countIsNaN = isNaN(all_time_viewing_count + 1)

	return (
		// sellerId === id ? null:
		<div className="SellerInfoTopButtons">
			{/* <div style={{display: "flex"}}> */}
				{/*<div className="statistic__header__block_right">*/}
				{/*	<span><Views /> {views ? `+ ${views}` : 0}</span>*/}
				{/*</div>         Скрыто пока не работает функцианал                        */}
			{/* </div> */}

			{(!isMobile && !countIsNaN) &&
			<div style={{display: 'flex',height: '30px', marginRight: '240px', fontWeight: '400', color:'#5A5A5A'}}>

				<span style={{ display:'flex', alignItems: 'center', marginRight: '30px'}}>
					{`${all_time_viewing_count + 1} +${last_day_viewing_count + 1}`}
					<EyeLogo/>
				</span>
				
				{isPageOwner &&
				<span style={{display:'flex', alignItems: 'center', fontWeight: '400', color: '#5A5A5A'}}>
					{`${all_time_contact_count + 1} +${last_day_contact_count + 1}`}
					<PhoneLogo/>
				</span>}
			</div>}

			<div className={'favoritsContainer'}>
				{!isPageOwner && <Favorits isProduct idOffer={isOffer} />}
				{/*{mobile ? null : <a className="SellerInfoCompare"></a>}     Скрыто пока не работает функцианал           */}
			</div>
		</div>
	)
}


export default ProductFavoriteNoteCom;