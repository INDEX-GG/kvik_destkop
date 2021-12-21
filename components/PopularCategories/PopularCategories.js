import React from 'react';
import { Link, makeStyles, Typography } from "@material-ui/core";
import { Icons } from '../../UI/icons/popularCategories/pc_icons';
import PopularIcon from './PopularIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from "next/router";
import { useMedia } from '../../hooks/useMedia';

const useStyles = makeStyles(() => ({
	slider: {
		width: '100%',
	},
	slide: {
		width: 'calc(100% / 5.8)',
		margin: '15px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	popular_categories: {
		marginBottom: '15px',
		marginTop: '22px',
	},

	['@media screen and (max-width: 959px)']: {
		slide: {
			// backgroundColor: 'red',
			width: 'calc(100% / 3.3)',
		}
	},

	['@media screen and (max-width: 727px)']: {
		slide: {
			width: 'calc(100% / 5.5)',
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
				className={classes.slider}
				spaceBetween={0}
				slidesPerView={'auto'}
				loop={true}
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