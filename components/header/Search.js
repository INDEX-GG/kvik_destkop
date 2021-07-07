import { useEffect, useState } from 'react'
import { Box, TextField, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'

const useStyles = makeStyles(() => ({
	input: {
		position: 'relative',
		flexGrow: 1,
	},
	icon: {
		position: 'absolute',
		right: '14px',
		height: '100%',
	},
}));

const Search = () => {

	const classes = useStyles();
	const [search, setSearch] = useState();
	const [result, setRes] = useState();

	const handelSearch = e => {
		setSearch(e.target.value)
		if (search?.length > 2) {
			setRes(search)
		}
	}

	useEffect(() => {
		axios.post('/api/search', { product_name: result })
			.then(res => console.log(res))
	}, [result])

	console.log(result)



	return (
		<Box className={classes.input} >
			<TextField
				value={search}
				onChange={e => handelSearch(e)}
				variant='outlined' size='small'
				placeholder="Поиск по объявлениям"
				fullWidth className={classes.searchInput} />
			<SearchIcon className={classes.icon} />
		</Box>
	)
}

export default Search;
