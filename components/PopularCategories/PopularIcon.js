import React, { useState } from 'react';
import { Box, makeStyles, Typography } from "@material-ui/core";
import Bg from '../../UI/icons/popularCategories/Bg';
import BgMobile from '../../UI/icons/popularCategories/bgMobile';
import BgActive from '../../UI/icons/popularCategories/BgActive';
import BgMobileActive from '../../UI/icons/popularCategories/BgMobileActive';
import { useMedia } from '../../hooks/useMedia';

const useStyles = makeStyles(() => ({
	root: {
		// position: 'relative',
		// width: '210px',
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
		// width: '80%',
		zIndex: -1,
		transition: 'all 650ms ease-in-out'
	},
	title: {
		position: 'absolute',
		top: 0,
		width: '100%',
		textAlign: 'center',
		fontWeight: "500",
	},

	['@media screen and (max-width: 727px)']: {
		root: {
			// width: '100%',
			// height: '80px'
			position: 'relative',
			width: '50px',
			height: '50px'
		},
		title: {
			// top: 'auto',
			top: '85%',
			// width: '100%',
			width: '100px',
			fontSize: '10px'
		},
	},
}));

const PopularIcon = (icon) => {
	const {matchesMobile, matchesTablet} = useMedia()
	const [hover, setHover] = useState(false);
	const classes = useStyles();

	function backgroundPicker(){
		if(matchesMobile || matchesTablet) {
			return <BgMobile />
		}
		return <Bg/>
	}

	function backgroundActivePicker(){
		if(matchesMobile || matchesTablet) {
			return <BgMobileActive />
		}
		return <BgActive/>
	}

	return (
		<>
		<button
			className={classes.root}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<Box className={classes.icon}>{icon?.icon.icon}</Box>
			{/* <Box className={classes.bg}>
				{!hover ? <Bg />:<BgActive />}
			</Box>  */}

			<Box className={classes.bg}>
				{!hover ? backgroundPicker(): backgroundActivePicker()}
			</Box>
			<Typography className={classes.title}>{icon?.icon.title}</Typography>
		</button>
		{/* <BgMobile /> */}
		</>
	)
}

export default PopularIcon;