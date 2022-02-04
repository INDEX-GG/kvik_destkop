import React from 'react';
import Favorits from '../../../UI/Favorits';
// import Views from "../../../UI/icons/Views";
import EyeLogo from '../../../UI/icons/StatsEye'
import PhoneLogo from '../../../UI/icons/StatsPhone'
import { useMedia } from '#hooks/useMedia';
// import { useStatistics } from '#lib/Context/StatisticsCTX';
// import { makeStyles } from "@material-ui/core";


// const useStyles = makeStyles(() => ({
// 	statsContainer: {

// 	})
// })


const ProductFavoriteNoteCom = ({isOffer, id, sellerId, stats}) => {
	// mobile, views, sellerId, id - неиспользуемые пропсы
	// const {addContactClick} = useStatistics()
	// проверяем булем, находимся ли мы на своей странице
	const isPageOwner = sellerId === id
	const {matchesMobile, matchesTablet} = useMedia()
	const isMobile = matchesMobile || matchesTablet

	return (
		// sellerId === id ? null:
		<div className="SellerInfoTopButtons">
			{/* <div style={{display: "flex"}}> */}
				{/*<div className="statistic__header__block_right">*/}
				{/*	<span><Views /> {views ? `+ ${views}` : 0}</span>*/}
				{/*</div>         Скрыто пока не работает функцианал                        */}
			{/* </div> */}

			{!isMobile && 
			<div style={{display: 'flex',height: '30px', marginRight: '240px', fontWeight: '400', color:'#5A5A5A'}}>

				<span style={{ display:'flex', alignItems: 'center', marginRight: '30px'}}>
					{`${stats?.all_time_viewing_count + 1} +${stats?.last_day_viewing_count + 1}`}
					<EyeLogo/>
				</span>
				
				{isPageOwner 
				&&
				<>
				<span style={{display:'flex', alignItems: 'center', fontWeight: '400', color: '#5A5A5A'}}>
					{`${stats?.all_time_contact_count + 1} +${stats?.last_day_contact_count + 1}`}
					<PhoneLogo/>
				</span>
				
				{/* <span style={{display:'flex', alignItems: 'center'}}>
					{`${stats?.all_time_contact_count} +${stats?.last_day_contact_count}`}
					<PhoneLogo/>
				</span> */}

				</> 
				}


			</div>}

			<div className={'favoritsContainer'}>
				{!isPageOwner && <Favorits isProduct idOffer={isOffer} />}
				{/*{mobile ? null : <a className="SellerInfoCompare"></a>}     Скрыто пока не работает функцианал           */}
			</div>
		</div>
	)
}


export default ProductFavoriteNoteCom;