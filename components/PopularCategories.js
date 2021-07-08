import React from 'react'
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
}));

const PopularCategories = () => {

	const classes = useStyles();

	return (
		<>
			<Typography variant='h2'>Популярные категории</Typography>
		</>
	)
}

export default PopularCategories;
