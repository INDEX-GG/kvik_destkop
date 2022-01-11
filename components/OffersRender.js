import React, { useEffect, useRef, useState } from 'react';
import AdCard_component from './AdCard';
import { Box, makeStyles, Typography } from '@material-ui/core';
import ScrollTop from '../UI/ScrollTop';
import { observerGenerate } from '../lib/scrollAds';
import Loader from '../UI/icons/Loader';
import { useMedia } from '../hooks/useMedia';
import SortItem from "./SortItem";
// import EndMessage from './EndMessage';
import OffersRenderGridIcon from '#UI/icons/OffersRenderGridIcon';
import OffersRenderListIcon from '#UI/icons/OffersRenderListIcon';
import { useAuth } from '#lib/Context/AuthCTX';

const useStyles = makeStyles((theme) => ({
	top: {
		marginBottom: '7px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	title: {
		flexGrow: 1,
		marginRight: "2px",
		fontSize: "22px",
		[theme.breakpoints.down("350")]: {
			fontSize: "20px",
		}
	},
	title_filter: {
		fontSize: '14px',
	},

	offersGridSwitcher: {
		display: 'flex',
		'& svg:first-child': {
			marginRight: '15px'
		},
		'& svg': {
			// display: 'inline-block'
		}
	}
}));


const OffersRender = ({ data, title, isProduct, pageObj, limitRenderObj, setSort}) => {
	const classes = useStyles();
	const observer = useRef()
	const lastElement = useRef()
	const {matchesMobile, matchesTablet} = useMedia()
	const {id} = useAuth()
	// буль для условия отображения списка объявления (либо сетка, либо список)
	const [gridView, setGridView] = useState(true)
	
	const screenIsMobile = matchesMobile || matchesTablet;


	useEffect(() => {
		observerGenerate(lastElement, observer, limitRenderObj.limitRenderPage, limitRenderObj.setLimitRenderPage, pageObj.setPage, pageObj.page)
	})

	const classSwitcher = () => {
		if(gridView) return 'scrollableOffersHome'
		if(!gridView && screenIsMobile) return 'scrollableOffersHome scrollableOffersHomeV2'
		else return 'scrollableOffersHome'
	}
	return (
		<>
				<Box className={classes.top}>
				{!screenIsMobile && <Typography className={classes.title} variant='h2' >{title || 'Рекомендуемое'}</Typography>}

					{!isProduct &&
						// <TextField
						// 	select
						// 	value={state.value}
						// 	onChange={(e) => dispatch({ type: e.target.value })}
						// >
						// 	{sortItems.map((option, i) => (
						// 		<MenuItem key={i} className={classes.title_filter} value={option.value}>
						// 			{option.label}
						// 		</MenuItem>
						// 	))}
						// </TextField>
                        <SortItem setSort={setSort}/>
					}
					{screenIsMobile && 
					<div className={classes.offersGridSwitcher}>
						<OffersRenderGridIcon clickHandler={()=>setGridView(true)} color={gridView ? '#5a5a5a' : '#8f8f8f'} />
						<OffersRenderListIcon clickHandler={()=>setGridView(false)} color={gridView ? '#8f8f8f' : '#5a5a5a'}/>
					</div>}

				</Box>
				{/* <div className="scrollableOffersHome"> */}
				<div className={classSwitcher()}>
					{data?.map((obj, i) => isProduct ? 
					<AdCard_component id={id} isGrid={gridView} key={i} offer={obj} /> :  
					<AdCard_component isGrid={gridView} ref={lastElement} key={i} offer={obj} id={id} />)}
				</div>
				{pageObj.page !== 'end' && <div className='offer__placeholder_loader'><Loader /></div>}
				<ScrollTop />
				{/* {endMessage ? <EndMessage/> : null} */}
		</>
	);
};

export default OffersRender;