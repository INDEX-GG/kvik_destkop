import React from 'react';
import Image from 'next/image';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
		marginTop: '29px',
		minWidth: '224px',
		'&>*': {
			margin: '12px 0 !important'
		}
    },
}));

const FilterBlock = () => {

	const classes = useStyles();

	return (
		<Box className={classes.root} >
		</Box>
	)
}

export default FilterBlock
