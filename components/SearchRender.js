import React, { useEffect, useReducer, useRef } from 'react';
import AdCard_component from './AdCard';
import { Box, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import ScrollTop from '../UI/ScrollTop';
import { observerGenerate } from '../lib/scrollAds';
import Loader from '../UI/icons/Loader';
// import EndMessage from './EndMessage';

const useStyles = makeStyles(() => ({
	top: {
		marginBottom: '15px',
		display: 'flex',
	},
	title: {
		flexGrow: 1,
	},
	messageEnd: {
		margin: "20px 0 32px"
	}
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


const SearchRender = ({ data, title, limitRender, setLimitRenderPage, setPage, page/* , endMessage = true  */}) => {
	const [state, dispatch] = useReducer(sortReducer, { value: 'default', sorting: byInit })
	const classes = useStyles();

	const observer = useRef()
	const lastElement = useRef()


	useEffect(() => {
		observerGenerate(lastElement, observer, limitRender, setLimitRenderPage, setPage, page)
	})

	return (
		<>
			<Box className={classes.top}>
				<Typography className={classes.title} variant='h2' >{title || 'Рекомендуемое'}</Typography>
				{data ? 
				<TextField
					select
					value={state.value}
					onChange={(e) => dispatch({ type: e.target.value })}
				>
					{sortItems.map((option, i) => (
						<MenuItem key={i} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField> : null}
			</Box>
				<div className="scrollableOffersHome">
					{state.sorting(data)?.map((obj, i) => <AdCard_component key={i} offer={obj} />)}
				</div>
				{page == 'end' || data?.length == 0 ? null : <div ref={lastElement} className='offer__placeholder_loader'><Loader /></div>}
				 {/*{data?.length == 0 ? <h1 style={{textAlign: 'center'}}>Ничего не найдено</h1> : null}*/}
			<div className={classes.messageEnd}>
				 {/*{endMessage && data?.length ? <EndMessage/> : null}*/}
			</div>
			<ScrollTop />
		</>
	);
};

export default SearchRender;