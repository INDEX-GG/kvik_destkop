import React, { useEffect, useReducer, useRef } from 'react';
import AdCard_component from './AdCard';
import { Box, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import ScrollTop from '../UI/ScrollTop';
import { observerGenerate } from '../lib/scrollAds';
import Loader from '../UI/icons/Loader';
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

const byInit = arr => arr;
const byDefault = arr => {
	return arr.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at))
};
const byNew = arr => {
	return arr.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
};
const byCheap = arr => {
	return arr.sort((a, b) => +a.price - +b.price)
};
const byExpensive = arr => {
	return arr.sort((a, b) => +b.price - +a.price)
};

const sortReducer = (state, action) => {
	switch (action.type) {
		case 'default':
			return { value: 'default', sorting: byDefault };
		case 'new':
			return { value: 'new', sorting: byNew };
		case 'cheap':
			return { value: 'cheap', sorting: byCheap };
		case 'expensive':
			return { value: 'expensive', sorting: byExpensive };
		case 'remote':
			return { value: 'remote', sorting: byDefault };
		default:
			return { value: 'default', sorting: byInit };
	}
};

const sortItems = [
	{ value: 'default', label: 'По умолчанию' },
	{ value: 'new', label: 'Сначала новые' },
	{ value: 'cheap', label: 'Дешевле' },
	{ value: 'expensive', label: 'Дороже' },
	{ value: 'remote', label: 'По удалённости' }
];

const OffersRender = ({ data, title, isProduct, page = false, limitRender = false, setLimitRenderPage = false, setPage = false,/*  endMessage = true */ }) => {
	const [state, dispatch] = useReducer(sortReducer, { value: 'default', sorting: byInit })
	const classes = useStyles();
	const observer = useRef()
	const lastElement = useRef()

	// console.log(lastElement)
	

	useEffect(() => {
		observerGenerate(lastElement, observer, limitRender, setLimitRenderPage, setPage, page)
	})

	// console.log(data)

	return (
		<>
				<Box className={classes.top}>
					<Typography className={classes.title} variant='h2' >{title || 'Рекомендуемое'}</Typography>

					{!isProduct &&
						<TextField
							select
							value={state.value}
							onChange={(e) => dispatch({ type: e.target.value })}
						>
							{sortItems.map((option, i) => (
								<MenuItem key={i} className={classes.title_filter} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					}

				</Box>
				<div className="scrollableOffersHome">
					{state.sorting(data)?.map((obj, i) => isProduct ? <AdCard_component key={i} offer={obj} /> :  <AdCard_component ref={lastElement} key={i} offer={obj} />)}
				</div>
				{page == 'end' ? null : isProduct ? <div ref={data ? lastElement : null} className='offer__placeholder_loader'><Loader /></div> : <div className='offer__placeholder_loader'><Loader /></div>}
				<ScrollTop />
				{/* {endMessage ? <EndMessage/> : null} */}
		</>
	);
};

export default OffersRender;