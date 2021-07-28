import React from 'react';
import { Link, makeStyles, Typography } from "@material-ui/core";
import { Icons } from '../../UI/icons/popularCategories/pc_icons';
import PopularIcon from './PopularIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from "next/router"

const useStyles = makeStyles((theme) => ({
	slider: {
		width: '100%',
	},
	slide: {
		width: '210px',
	}
}));

const PopularCategories = () => {
	const router = useRouter()
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
						<SwiperSlide key={i} className={classes.slide} >
							<Link onClick={() => router.push(`/search/${icon.alias}`)}>	<PopularIcon icon={icon} random={Math.round(Math.random() * 360)} /></Link>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</>
	)
}

export default PopularCategories;