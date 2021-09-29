import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import DefaultFilter from './filter/DefaultFilter';

const useStyles = makeStyles(() => ({
    root: {
		marginTop: '29px',
		minWidth: '224px',
		'&>*': {
			margin: '12px 0 !important'
		}
    },
}));

const FilterBlock = ({categoryData}) => {
	let filter;
	const category = categoryData?.aliasName[0].alias
	const classes = useStyles();

	switch (category){
		default: 
			filter = <DefaultFilter />
	}

	return (
		<Box className={classes.root} >
			{filter}
		</Box>
	)
}

export default FilterBlock
