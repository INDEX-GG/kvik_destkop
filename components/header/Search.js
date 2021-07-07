import React from 'react'
import { Box, TextField, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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

const Search = () => {

	const classes = useStyles();

	return (
		<Box className={classes.input} >
			<TextField 
				variant='outlined' size='small' 
				placeholder="Поиск по объявлениям" 
				fullWidth />
			<SearchIcon className={classes.icon} />
		</Box>
	)
}

export default Search;
