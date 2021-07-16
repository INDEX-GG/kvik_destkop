import React from 'react';
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Icons } from '../../UI/icons/popularCategories/pc_icons';
import PopularIcon from './PopularIcon';
import { Swiper, SwiperSlide } from 'swiper/react';

const useStyles = makeStyles((theme) => ({
	slider: {
		width: '100%',
	},
	slide: {
		width: '210px',
	}
}));

const PopularCategories = () => {
	const classes = useStyles();
	return (
		<>
			<Typography variant='h2'>Популярные категории</Typography>
				<Swiper
					className={classes.slider}
					spaceBetween={0}
					slidesPerView={'auto'}
					loop={true}
				>
					{Icons.map((icon, i) => {
						return (
							<SwiperSlide className={classes.slide}>
								<PopularIcon icon={icon} random={Math.round(Math.random() * 360)} />
							</SwiperSlide>
						)
					})}
				</Swiper>
		</>
	)
}

export default PopularCategories;