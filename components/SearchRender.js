import React, { useReducer } from 'react';
import AdCard_component from './AdCard';
import { Box, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import ScrollTop from '../UI/ScrollTop';
import FavProvider from "../lib/Context/FavoritesCTX";
import EndMessage from './EndMessage';

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

const OffersRender = ({ data, title }) => {
	const [state, dispatch] = useReducer(sortReducer, { value: 'default', sorting: byInit })
	const classes = useStyles();


	return (
		<>
			<Box className={classes.top}>
				<Typography className={classes.title} variant='h2' >{title || 'Рекомендуемое'}</Typography>
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
				</TextField>
			</Box>
				<div className="scrollableOffersHome">
					{state.sorting(data)?.map((obj, i) =><FavProvider key={i}> <AdCard_component  offer={obj} /></FavProvider>)}
				</div>
			<div className={classes.messageEnd}>
				<EndMessage/>
			</div>
			<ScrollTop />
		</>
	);
};

export default OffersRender;