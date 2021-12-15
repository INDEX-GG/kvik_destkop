import React, { useState } from 'react';
import { Box, makeStyles, Typography } from "@material-ui/core";
import Bg from '../../UI/icons/popularCategories/Bg';
import BgActive from '../../UI/icons/popularCategories/BgActive';

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
		zIndex: -1,
		transition: 'all 650ms ease-in-out'
	},
	title: {
		position: 'absolute',
		top: 0,
		width: '150px',
		textAlign: 'center',
		fontWeight: "500"
	}
}));

const PopularIcon = (icon) => {
	const [hover, setHover] = useState(false);
	const classes = useStyles();

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