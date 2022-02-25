// import CategoryDark from '../../UI/icons/CategoryDark';
// import CompareDark from '../../UI/icons/CompareDark';
import LikeDark from '../../UI/icons/LikeDark';
import NotifDark from '../../UI/icons/NotifDark';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { useMedia } from '../../hooks/useMedia';
import { Box, Container, Button, makeStyles, Dialog, Tooltip, Popper} from '@material-ui/core';
import { useAuth } from '../../lib/Context/AuthCTX';
import { useState, useEffect, useRef } from 'react';
import City from './City';
import { useCity } from '../../lib/Context/CityCTX';
import { useRouter } from 'next/router';
import CityConfirm from './CityConfirm';

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
	const [cityDialog, setCityDialog] = useState({
		cityDialogSelect: false,
		cityConfirm: false
	})
	const anchorRef = useRef();
	const { matchesMobile, matchesTablet } = useMedia();
	const { isAuth, id } = useAuth();
	const { city } = useCity();

	const countRenderRef = useRef(0) // считаем количество рендеров и выводим окно подтверждения города на 5

	const CustomTooltip = ({str, icon, onClick, account}) => {
		return (
			<Tooltip arrow={true} title={str} classes={{tooltip: classes.tooltip, arrow: classes.arrow}}>
				<Button
				onClick={() => onClick ? router.push({ pathname: `/account/${id}`, query: {account: account}}) : null }
				className={classes.btn__uppanel}>{icon}</Button>
			</Tooltip>
		)
	}

	useEffect(() => { countRenderRef.current += 1 })

	useEffect(() => {
		// первое нужно чтобы сбрасывать показ при переходе по ссылкам, отображаем на 2 рендере
		if(countRenderRef.current === 5) {
			const cities = localStorage.getItem('cities')
			const cityConfirm = JSON.parse(localStorage.getItem('cityConfirm'))?.cityConfirm || false

			if(typeof id === 'undefined' && !cityConfirm) {
				setTimeout(() => {
					setCityDialog(prevState => ({
						...prevState,
						cityConfirm: true
					}))
				}, 1000)
			}

			if(cities && cityConfirm) {
				setCityDialog(prevState => ({
					...prevState,
					cityConfirm: false
				}))
			}
		}
	}, [countRenderRef.current])

	const handlerButtonClick = () => {
		const cityConfirm = JSON.parse(localStorage.getItem('cityConfirm'))?.cityConfirm || false

		// если уже подтверждали город, показываем стандартное окно выбора города
		if(cityConfirm) {
			setCityDialog(prevState => ({
				...prevState,
				cityDialogSelect: true,
				cityConfirm: false
			}))
		}else {
			setCityDialog(prevState => ({
				...prevState,
				cityDialogSelect: false,
				cityConfirm: true
			}))
		}
	}

	const handlerOpenModalSelectCity = () => {
		setCityDialog(prevState => ({
			...prevState,
			cityDialogSelect: true,
			cityConfirm: false
		}))
	}

	const handlerConfirmCity = () => {
		setCityDialog(prevState => ({
			...prevState,
			cityConfirm: !prevState.cityConfirm,
		}))

		localStorage.setItem('cityConfirm', JSON.stringify({cityConfirm: true}))
	}

	const handlerSelectCity = (isCloseModalSelectCity) => {
		setCityDialog(prevState => ({
			...prevState,
			cityDialogSelect: isCloseModalSelectCity,
			cityConfirm: false,
		}))

		localStorage.setItem('cityConfirm', JSON.stringify({cityConfirm: true}))
	}

	return (
		<>
			{!matchesMobile && !matchesTablet &&
				<>
					<Box className={classes.up_panel}>
						<Container className={classes.up_panel__wrapper}>
							<Button className={classes.btn__add_location} variant='text' size='small' onClick={handlerButtonClick} ref={anchorRef} >
								<RoomOutlinedIcon fontSize='small' />{city}
							</Button>
							{isAuth && <Box className={classes.btns__uppanel}>
								{/*<CustomTooltipUI str={<div>Выберайте вашу любимую категорию товаров <br /> для быстрого перехода</div>} UIicon={<CategoryDark />} />*/}
								{/*  скрыто пока не работает */}
								{/*<CustomTooltipUI str={'Статистика'} UIicon={<CompareDark />}/>*/}
								{/*  скрыто пока не работает */}
								<CustomTooltip str={'Избранное'} icon={<LikeDark/>} account='4' onClick />
								<CustomTooltip str={'Сообщения'} icon={<NotifDark/>} account='5' onClick/>
							</Box>}
						</Container>
					</Box>
					<Dialog
						open={cityDialog.cityDialogSelect || false}
						onClose={() => setCityDialog(prevState => ({
						...prevState,
						cityDialogSelect: !prevState.cityDialog,
					}))}>
						<City dialog={cityDialog.cityDialogSelect} setDialog={handlerSelectCity} />
					</Dialog>
					<Popper open={cityDialog.cityConfirm || false} anchorEl={anchorRef.current} placement='bottom-start' style={{zIndex: '1100'}}>
							<CityConfirm
								city={city}
								onConfirmCity={handlerConfirmCity}
								onSelectCity={handlerOpenModalSelectCity} />
					</Popper>
				</>
			}
		</>
	)
}

export default UpPanel
