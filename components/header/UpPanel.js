import CategoryDark from '../../UI/icons/CategoryDark';
import CompareDark from '../../UI/icons/CompareDark';
import LikeDark from '../../UI/icons/LikeDark';
import NotifDark from '../../UI/icons/NotifDark';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { useMedia } from '../../hooks/useMedia';
import { Box, Container, Button, makeStyles, Dialog, Tooltip  } from '@material-ui/core';
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
	},
	tooltip: {
		border: "#8F8F8F solid 1px",
        background: "#FFFFFF",
        color: "#5A5A5A",
        fontSize: "12px",
		textAlign: 'center',
		maxWidth: '190px',
	}, 
	arrow: {
		color: '#FFFFFF',
        "&:before": {
			content: '""',
            border: "#8F8F8F solid 1px",
        }
	},
	btn__add_location: {
		color: "#8F8F8F"
	}
}));

const UpPanel = () => {
	const classes = useStyles();
	const router = useRouter();
	const [cityDialog, setCityDialog] = useState(false);
	const { matchesMobile, matchesTablet } = useMedia();
	const { isAuth, id } = useAuth();
	const { city } = useCity();



	const CustomTooltip = ({str, icon, onClick}) => {
		return (
			<Tooltip arrow={true} title={str} classes={{tooltip: classes.tooltip, arrow: classes.arrow}}>
				<Button 
				onClick={() => onClick ? router.push({ pathname: `/account/${id}`, query: {account: "4"}}) : null } 
				className={classes.btn__uppanel}>{icon}</Button>
			</Tooltip>
		)
	}


	return (
		<>
			{!matchesMobile && !matchesTablet &&
				<>
					<Box className={classes.up_panel}>
						<Container className={classes.up_panel__wrapper}>
							<Button className={classes.btn__add_location} variant='text' size='small' onClick={() => setCityDialog(!cityDialog)} ><RoomOutlinedIcon fontSize='small' />{city}</Button>
							{isAuth && <Box className={classes.btns__uppanel}>
								<CustomTooltip str={<div>Выберайте вашу любимую категорию товаров <br /> для быстрого перехода</div>} icon={<CategoryDark />} />
								<CustomTooltip str={'Статистика'} icon={<CompareDark />}/>
								<CustomTooltip str={'Избранное'} icon={<LikeDark/>} onClick />
								<CustomTooltip str={'Сообщения'} icon={<NotifDark/>}/>
							</Box>}
						</Container>
					</Box>
					<Dialog open={cityDialog || false} onClose={() => setCityDialog(!cityDialog)}>
						<City dialog={cityDialog} setDialog={setCityDialog} />
					</Dialog>
				</>
			}
		</>
	)
}

export default UpPanel