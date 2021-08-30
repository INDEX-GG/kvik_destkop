import React from 'react';
import { Link, makeStyles, Typography } from "@material-ui/core";
import { Icons } from '../../UI/icons/popularCategories/pc_icons';
import PopularIcon from './PopularIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from "next/router"

const useStyles = makeStyles(() => ({
	slider: {
		width: '100%',
	},
	slide: {
		width: '210px',
	},
	popular_categories: {
		marginBottom: '15px',
		marginTop: '22px',
	},
}));

const PopularCategories = () => {
	const router = useRouter()
	const classes = useStyles();
	return (
		<>
			<Typography className={classes.popular_categories} variant='h2'>Популярные категории</Typography>
			<Swiper
				className={classes.slider}
				spaceBetween={0}
				slidesPerView={'auto'}
				loop={true}
			>
				{Icons.map((icon, i) => {
					return (
						<SwiperSlide key={i} className={classes.slide} >
							<Link onClick={() => router.push(`/search/${icon.alias}`)}>	<PopularIcon icon={icon} random={0} /></Link>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</>
	)
}

export default PopularCategories;