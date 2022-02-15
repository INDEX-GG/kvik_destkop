import React from 'react';
import { Link, makeStyles, Typography } from "@material-ui/core";
import { Icons } from '../../UI/icons/popularCategories/pc_icons';
import PopularIcon from './PopularIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from "next/router";
import { useMedia } from '../../hooks/useMedia';
import SwiperCore, { Navigation } from "swiper/core";
import clsx from 'clsx'

SwiperCore.use([Navigation]);

const useStyles = makeStyles(() => ({
	slider: {
		width: '100%',
	},
	slide: {
		width: 'calc(1256px / 6)',
		// width: '210px',
		// width:'100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	popular_categories: {
		marginBottom: '15px',
		marginTop: '22px',
	},

	['@media screen and (max-width: 1023px)']: {
		slide: {
			width: 'calc(1000px / 5)',
		}
	},

	['@media screen and (max-width: 959px)']: {
		slide: {
			// width: 210px,
			width: '150px',
			margin: '0 15px',
		}
	},

	['@media screen and (max-width: 727px)']: {
		slide: {
			width: 'calc((100% / 4.9) - 15px)',
			margin: '0 15px',
		},
	},
}));

const PopularCategories = () => {
	const {matchesMobile, matchesTablet} = useMedia();
	const screenIsMobile = matchesMobile || matchesTablet;
	const router = useRouter()
	const classes = useStyles();

	return (
		<>
			{!screenIsMobile && <Typography title="PopularCategories" className={classes.popular_categories} variant='h2'>Популярные категории</Typography>}
			<Swiper
				modules={[Navigation]}
				// класс лежит в home.scss и нужен для того, чтобы кастомизировать кнопки навигации слайдеры и прикрепить background: url(...)
				className={clsx(classes.slider, 'popular_categ_slider')}
				spaceBetween={0}
				slidesPerView={'auto'}
				loop={true}
				navigation={true}
			>
				{Icons.map((icon, i) => {
					return (
						<SwiperSlide  key={i} className={classes.slide} >
							<Link onClick={() => router.push(`/search/${icon.alias}`)}>	<PopularIcon icon={icon} random={0} /></Link>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</>
	)
}

export default PopularCategories;
