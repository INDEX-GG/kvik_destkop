import React, { useEffect, useRef } from 'react';
import AdCard_component from './AdCard';
import { Box, makeStyles, Typography } from '@material-ui/core';
import ScrollTop from '../UI/ScrollTop';
import { observerGenerate } from '../lib/scrollAds';
import Loader from '../UI/icons/Loader';
import SortItem from "./SortItem";
// import EndMessage from './EndMessage';

const useStyles = makeStyles((theme) => ({
	top: {
		marginBottom: '7px',
		display: 'flex',
		alignItems: 'center',
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
}));


const OffersRender = ({ data, title, isProduct, pageObj, limitRenderObj, setSort}) => {
	const classes = useStyles();
	const observer = useRef()
	const lastElement = useRef()


	useEffect(() => {
		observerGenerate(lastElement, observer, limitRenderObj.limitRenderPage, limitRenderObj.setLimitRenderPage, pageObj.setPage, pageObj.page)
	})


	return (
		<>
				<Box className={classes.top}>
					<Typography className={classes.title} variant='h2' >{title || 'Рекомендуемое'}</Typography>

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

				</Box>
				<div className="scrollableOffersHome">
					{data?.map((obj, i) => isProduct ? <AdCard_component key={i} offer={obj} /> :  <AdCard_component ref={lastElement} key={i} offer={obj} />)}
				</div>
				{pageObj.page !== 'end' && <div className='offer__placeholder_loader'><Loader /></div>}
				<ScrollTop />
				{/* {endMessage ? <EndMessage/> : null} */}
		</>
	);
};

export default OffersRender;