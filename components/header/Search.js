import { Box, TextField, makeStyles, FormControl } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

const useStyles = makeStyles(() => ({
	input: {
		position: 'relative',
		flexGrow: 1,
		'& input': {
			padding: '7px 24px',
		}
    },
    icon: {
        position: 'absolute',
        right: '24px',
        height: '100%',
    },
}));

const Search = ({text = false}) => {
	const classes = useStyles();
	// const [search, setSearch] = useState();
	// const [result, setRes] = useState();

	// const handelSearch = e => {
	// 	setSearch(e.target.value)
	// 	if (search?.length > 2) {
	// 		setRes(search)
	// 	}
	// }

	// useEffect(() => {
	// 	axios.post('/api/search', { product_name: result })
	// 		.then(res => console.log(res))
	// }, [result])


	return (
		<Box className={classes.input} >
			<FormControl fullWidth>
				<TextField
					onClick={() => console.log("asdasdas")}
					onFocus={(event) => console.log(event)}
					// value={search}
					// onChange={e => handelSearch(e)}
					variant='outlined' size='small'
					placeholder={text ? text : "Поиск по объявлениям"}
					fullWidth className={classes.searchInput} 
				/>
				<SearchIcon className={classes.icon} />
			</FormControl>
		</Box>
	)
}

export default Search;
