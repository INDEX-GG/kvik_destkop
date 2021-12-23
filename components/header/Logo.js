import { useState } from 'react'
import LogoIcon from '../../UI/icons/Logo';
import { makeStyles } from '@material-ui/core';
import { InternalLink } from '#components/links/InternalLink';

const useStyles = makeStyles(() => ({
	block: {
		padding: '0px 0px 0px 0px',
		'&:hover': {
			backgroundColor: 'transparent'
		}
	},
}));

const Logo = () => {
	const [hover, setHover] = useState(false);
	const classes = useStyles();
	return (
		<InternalLink
			href="/"
			className={classes.block}
			// TODO: переписать костыль
			anchourProps={{
				onMouseEnter: () => setHover(!hover),
				onMouseLeave: () => setHover(!hover)
			}}
			
		>
			<LogoIcon
				primeColor2={hover ? '#007E87' : '#52B9C5'}
				secondaryColor={hover ? '#151515' : '#2C2C2C'} 
			/>
		</InternalLink>
	)
}

export default Logo;