import React, { useState } from 'react';
import { Box, makeStyles, Typography } from "@material-ui/core";
import Bg from '../../UI/icons/popularCategories/Bg';
import BgActive from '../../UI/icons/popularCategories/BgActive';
// import { useMedia } from '../../hooks/useMedia';

const useStyles = makeStyles(() => ({
	root: {
		position: 'relative',
		width: '210px',
		height: '210px',
		cursor: 'pointer',
		backgroundColor: 'transparent',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		width: '100%',
		height: '100%',
		position: 'relative',
		zIndex: 3,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	bg: {
		position: 'absolute',
		width: '80%',
		zIndex: -1,
		transition: 'all 650ms ease-in-out'
	},
	title: {
		position: 'absolute',
		top: 0,
		width: '150px',
		textAlign: 'center',
		fontWeight: "500",
	},

	['@media screen and (max-width: 727px)']: {
		root: {
			width: '100%',
			height: '80px'
		},
		title: {
			// top: 'auto',
			top: '85%',
			width: '100%',
			fontSize: '10px'
		},
	},
}));

const PopularIcon = (icon) => {
	// const {matchesMobile, matchesTablet} = useMedia()
	// console.log(matchesMobile, matchesTablet)
	const [hover, setHover] = useState(false);
	const classes = useStyles();
	// console.log(icon.icon.icon, 'icon')

	return (
		<button
			className={classes.root}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<Box className={classes.icon}>{icon?.icon.icon}</Box>
			<Box className={classes.bg}>
				{!hover ? <Bg />:<BgActive />}
			</Box>
			<Typography className={classes.title}>{icon?.icon.title}</Typography>
		</button>
	)
}

export default PopularIcon;