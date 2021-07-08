import React from 'react'
import { Box, makeStyles, Typography } from "@material-ui/core";
import {Bg, BikeIcon, CarIcon, HomeIcon, JobIcon, NotebookIcon, PartIcon, RealtyIcon, SrvicesIcon, PhoneIcon} from '../UI/icons/popularCategories/pc_icons';

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
}));

const PopularCategories = () => {

	const classes = useStyles();

	return (
		<>
			<Typography variant='h2'>Популярные категории</Typography>
			
			<Box>
				<BikeIcon/>
				<Bg/>
			</Box>
			

		</>
	)
}

export default PopularCategories;