import React, {useState} from 'react';
import { Box, makeStyles } from "@material-ui/core";
import Bg from '../../UI/icons/popularCategories/Bg';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
		width: '180px',
		height: '180px',
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
	}
}));

const PopularIcon = ({icon}) => {

	const [hover, setHover] = useState(false);
	const classes = useStyles();

	return (
		<button 
			className={classes.root}
			onMouseEnter={() => setHover(!hover)}
			onMouseLeave={() => setHover(!hover)}
		>
			<Box className={classes.icon}>{icon}</Box>
			<Box 
				className={classes.bg} 
				style={{transform: `rotate(${Math.round(Math.random()*360)}deg)`, }}>
					<Bg color={hover ? '#e9e9e9' : '#f7f7f7'}/>
			</Box>
			
		</button>
	)
}

export default PopularIcon
