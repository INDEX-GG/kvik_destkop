import {useState} from 'react'
import LogoIcon from '../../UI/icons/Logo';
import {IconButton, makeStyles } from '@material-ui/core';
import Router from 'next/router';

const useStyles = makeStyles((theme) => ({
    logo: {
        padding: '0px 8px 0px 8px',
		'&:hover': {
			backgroundColor: 'transparent'
		}
    }
}));

const Logo = () => {
	const [hover, setHover] = useState(false);
	const classes = useStyles();
	return (
		<IconButton 
			onClick={() => Router.push('/')} 
			className={classes.logo}
			disableRipple
			disableFocusRipple
			onMouseEnter={() => setHover(!hover)}
			onMouseLeave={() => setHover(!hover)}
			>
				<LogoIcon 
				primeColor2={hover ? '#007E87' : '#52B9C5'}
				secondaryColor={hover ? '#151515' : '#2C2C2C'}/>
		</IconButton>
	)
}

export default Logo;