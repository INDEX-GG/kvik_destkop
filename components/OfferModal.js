import React from 'react'
import { Typography, Button, Box, CardMedia, makeStyles } from "@material-ui/core";
import { ToRubles } from "../lib/services";
import { useOfferAccount } from '../lib/Context/OfferAccountCTX';
import { BASE_URL } from '../lib/constants';
import {useAuth} from "../lib/Context/AuthCTX";
import {getTokenDataByPost} from "../lib/fetch";
import {Grid} from "@mui/material";

const useStyles = makeStyles((theme) => ({
	offer_form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '32px 24px',
		color: theme.palette.grey[100],
	},
	offer_form__item: {
		width: '120px',
		height: '225px',
		borderRadius: '1px',
		textAlign: 'center',
		marginBottom: '15px',
	},
	offer_form__content: {
		width: '100%',
		paddingLeft: '6px',
		textAlign: 'left',
		background: '#FFFFFF',
		boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
		borderRadius: '0px 0px 8px 8px',
	},
	offer_form__item__img: {
		width: '100%',
		height: '136px',
		borderRadius: '8px 8px 0px 8px',
	},
	offer_form__item__price: {
		fontSize: '12px',
		fontWeight: '500',
	},
	offer_form__item__title: {
		fontSize: '12px',
		fontWeight: '500',
	},
	offer_form__item__address: {
		fontSize: '10px',
		color: '#8F8F8F',
	},
	offer_form__desc: {
		fontSize: '18px',
		fontWeight: '500',
		color: theme.palette.grey[100],
		marginBottom: '10px',

	},
	offer_form__sub_desc: {
		fontSize: '14px',
		fontWeight: '500',
		color: theme.palette.grey[500],
		marginBottom: '16px',
	},
	offer_form__btn: {
		width: '100%',
		height: '32px',
		background: theme.palette.grey[300],
		padding: '8px',
		color: theme.palette.grey[100],
		borderRadius: '8px',
		marginBottom: '24px',
		fontSize: '14px',
		fontWeight: '500',
		transition: 'all 250ms ease-in-out;',

		'&:last-child': {
			marginBottom: 0,
		},

		'&>*:last-child': {
			marginBottom: 0,
		},

		'&:hover': {
			border: '1px solid' + theme.palette.grey[500],
			background: theme.palette.grey[300],
			transition: 'all 150ms ease-in-out;',
		},
	}
}));


export default function OfferModal({offerId, offerData, openOfferModal, setOpenOfferModal, buttonId, cleanAll, setUpdate}) {
	const classes = useStyles();
	const {id: user_id} = useAuth();
	const {setReload } = useOfferAccount();
	const {token} = useAuth();
	function PushDb(id) {
		let arr = { 'id': offerId, 'active': `${id}`, 'user_id': user_id }
		getTokenDataByPost(`${BASE_URL}/api/verifyActive`, arr, token)
			.then(r => r)
			.finally(function () {
				setReload(p => !p)
				setOpenOfferModal(!openOfferModal)
			})
		typeof cleanAll === "undefined" ? null : cleanAll();
		typeof setUpdate === "undefined" ? null : setUpdate(id);
	}

	function showButtons(id) {
		if( id === "001" ) {
			return  <>
				<Typography className={classes.offer_form__desc}>Заново активировать</Typography>
				<Typography className={classes.offer_form__sub_desc}>Вы хотите активировать объявление ?</Typography>
				<Button onClick={() => PushDb(0)} className={classes.offer_form__btn}>Да</Button>
				<Button onClick={() => setOpenOfferModal( previous => !previous )} className={classes.offer_form__btn}>Нет</Button>
			</>
		}
		if( id === "002" ) {
			return  <>
				<Typography className={classes.offer_form__desc}>Удалить из своих объявлений</Typography>
				<Typography className={classes.offer_form__sub_desc}>Вы действительно хотите удалить объявление ?</Typography>
				<Button onClick={() => PushDb(99)} className={classes.offer_form__btn}>Да удалить</Button>
				<Button onClick={() => setOpenOfferModal(!openOfferModal)} className={classes.offer_form__btn}>Нет</Button>
			</>
		}
		if ( id === "003" ) {
			return  <>
				<Typography className={classes.offer_form__desc}>Снять с публикации</Typography>
				<Typography className={classes.offer_form__sub_desc}>Выберите причину</Typography>
				<Button onClick={() => PushDb(1)} className={classes.offer_form__btn}>Продано на Kvik</Button>
				<Button onClick={() => PushDb(2)} className={classes.offer_form__btn}>Продано в другом месте</Button>
				<Button onClick={() => PushDb(3)} className={classes.offer_form__btn}>Другая причина</Button>
			</>
		}
	}

	if (offerId?.length === 1) {
		const offerAction = Array.isArray(offerData) ? offerData[0] : offerData;

		return (
			<Box key={offerAction.id} className={classes.offer_form}>
				<Box className={classes.offer_form__item}>
					{offerAction.photo
						?.slice(0, 1)
						.map((imgs, i) => {
							return <CardMedia className={classes.offer_form__item__img} key={i} image={imgs} />
						})
					}
					<Grid
						spacing={0}
						container
						direction="column"
						alignItems="flex-start"
						justifyContent="space-between"
						className={classes.offer_form__content}
					>
						<Grid
							mt={1}
							xs={0}
							item
							direction="column"
						>
							<Typography className={classes.offer_form__item__price}>{ToRubles(offerAction.price)}</Typography>
							<Typography className={classes.offer_form__item__title}>{offerAction.title}</Typography>
						</Grid>
						<Grid
							item
							mt={1}
							xs={0}
						>
							<Typography className={classes.offer_form__item__address}>{offerAction.address}</Typography>
						</Grid>
					</Grid>
				</Box>
				{showButtons(buttonId)}
			</Box>
		)
	} else {
		return (
			<Box className={classes.offer_form}>
				{showButtons(buttonId)}
			</Box>
		)
	}
}
