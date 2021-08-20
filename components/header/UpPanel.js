import CategoryDark from '../../UI/icons/CategoryDark';
import CompareDark from '../../UI/icons/CompareDark';
import LikeDark from '../../UI/icons/LikeDark';
import NotifDark from '../../UI/icons/NotifDark';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { useMedia } from '../../hooks/useMedia';
import { Box, Container, Button, makeStyles, Dialog } from '@material-ui/core';
import { useAuth } from '../../lib/Context/AuthCTX';
import { useState } from 'react';
import City from './City';
import { useCity } from '../../lib/Context/CityCTX';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
	up_panel: {
		background: theme.palette.background.paper,
	},
	up_panel__wrapper: {
		padding: '0 12px',
		display: 'flex',
		justifyContent: 'space-between',
	},
	btns__uppanel: {
		display: 'flex',
		alignItems: 'center',
	},
	btn__uppanel: {
		padding: 0,
		minWidth: '24px',
		height: '24px',
		marginLeft: '10px',
		'&:hover span svg': {
			fill: theme.palette.primary.main,
		},
	}
}));

const UpPanel = () => {
	const classes = useStyles();
	const router = useRouter();
	const [cityDialog, setCityDialog] = useState(false);
	const { matchesMobile, matchesTablet } = useMedia();
	const { isAuth, id } = useAuth();
	const { city } = useCity();




	return (
		<>
			{!matchesMobile && !matchesTablet &&
				<>
					<Box className={classes.up_panel}>
						<Container className={classes.up_panel__wrapper}>
							<Button className={classes.btn__add_location} variant='text' size='small' onClick={() => setCityDialog(!cityDialog)} ><RoomOutlinedIcon fontSize='small' />{city}</Button>
							{isAuth && <Box className={classes.btns__uppanel}>
								<Button className={classes.btn__uppanel}><CategoryDark /></Button>
								<Button className={classes.btn__uppanel}><CompareDark /></Button>
								<Button onClick={() => {
									router.push({
										pathname: `/account/${id}`,
										query: {
											account: "4"
										}
									})
								}} className={classes.btn__uppanel}><LikeDark /></Button>
								<Button className={classes.btn__uppanel}><NotifDark /></Button>
							</Box>}
						</Container>
					</Box>
					<Dialog open={cityDialog} onClose={() => setCityDialog(!cityDialog)}>
						<City dialog={cityDialog} setDialog={setCityDialog} />
					</Dialog>
				</>
			}
		</>
	)
}

export default UpPanel