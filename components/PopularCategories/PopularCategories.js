import React from 'react';
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Icons } from '../../UI/icons/popularCategories/pc_icons';
import PopularIcon from './PopularIcon';
import { Swiper, SwiperSlide } from 'swiper/react';

const useStyles = makeStyles((theme) => ({
    root: {
		display: 'flex',
		flexDirection: 'column'
    },
	slider: {
		display: 'flex',
		flexDirection: 'row',
	}
}));

const PopularCategories = () => {
	const classes = useStyles();
	return (
		<Box>
			<Typography variant='h2'>Популярные категории</Typography>
			<Swiper 
				className={classes.slider}
				spaceBetween={0}
				slidesPerView={7}
				>
				{Icons.map((icon, i) => {
					return(
						<SwiperSlide>
							<PopularIcon icon={icon} />
						</SwiperSlide>
					)			
				})}
			</Swiper>
		</Box>
	)
}

export default PopularCategories;