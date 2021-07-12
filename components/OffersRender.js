import React, {useReducer} from 'react';
import AdCard_component from './AdCard';
import { Box, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import ScrollTop from '../UI/ScrollTop';

const useStyles = makeStyles((theme) => ({
    top: {
		marginBottom: '15px',
		display: 'flex',
    },
	title: {
		flexGrow: 1,
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
			return {value: 'default', sorting: byDefault};
		case 'new':
			return {value: 'new', sorting: byNew};
		case 'cheap':
			return {value: 'cheap', sorting: byCheap};
		case 'expensive':
			return {value: 'expensive', sorting: byExpensive};
		case 'remote':
			return {value: 'remote', sorting: byDefault};
		default:
			return {value: 'default', sorting: byInit};
	}
};

const sortItems = [
	{value: 'default', label: 'По умолчанию'},
	{value: 'new', label: 'Сначала новые'},
	{value: 'cheap', label: 'Дешевле'},
	{value: 'expensive', label: 'Дороже'},
	{value: 'remote', label: 'По удалённости'}
];

const OffersRender = (data) => {
	const [state, dispatch] = useReducer(sortReducer, {value: 'default', sorting: byInit})
	const classes = useStyles();
	console.log(data.data)

	return (
		<>
			<Box className={classes.top}>
				<Typography  className={classes.title} variant='h2' >{data?.title || 'Рекомендуемое'}</Typography>
				<TextField
					select
					value={state.value}
					onChange={(e) => dispatch({type: e.target.value})}
				>
				{sortItems.map((option, i) => (
					<MenuItem key={i} value={option.value}>
						{option.label}
					</MenuItem>
                            ))}
				</TextField>
			</Box>
			<div className="scrollableOffersHome">
				{state.sorting(data?.data).map((obj, i) => <AdCard_component key={i} offer={obj} />)}
			</div>
			<ScrollTop/>
		</>
	);
};

export default OffersRender;