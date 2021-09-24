import React, { useContext } from 'react'
import { Typography, Button, Box, CardMedia, makeStyles } from "@material-ui/core";
import { DelActiveCTX } from '../lib/Context/DialogCTX';
import { ToRubles } from "../lib/services";
import axios from 'axios';
import { useOfferAccount } from '../lib/Context/OfferAccountCTX';
import { BASE_URL } from '../lib/constants';

const useStyles = makeStyles((theme) => ({
	delete_form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '32px 24px',
		color: theme.palette.grey[100],
	},
	delete_form__item: {
		width: '100px',
		height: '126px',
		padding: '3px',
		boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
		borderRadius: '1px',
		textAlign: 'center',
		marginBottom: '20px',
	},
	delete_form__item__img: {
		width: '100%',
		height: '88px',
	},
	delete_form__item__price: {
		fontSize: '12px',
		fontWeight: '500',
	},
	delete_form__item__title: {
		fontSize: '12px',
		fontWeight: '500',
	},
	delete_form__desc: {
		fontSize: '18px',
		fontWeight: '500',
		color: theme.palette.grey[100],
		marginBottom: '24px',

	},
	delete_form__sub_desc: {
		fontSize: '14px',
		fontWeight: '500',
		color: theme.palette.grey[500],
		marginBottom: '16px',
	},
	delete_form__btn: {
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


export default function DelActiveForm({setUpdate}) {
	const classes = useStyles();
	const { offerId, offerData, openDelActiveForm, setOpenDelActiveForm, battonId, cleanAll } = useContext(DelActiveCTX);
	const { setQuery } = useOfferAccount()

	function PushBDVerifyDelete() {
		// console.warn('DelActiveForm-click-offerId',offerId);
		var arr = { 'id': [offerId], 'active': '4' }
		// console.error('DelActiveForm-click-arr', arr);
		axios.post(`${BASE_URL}/api/verifyActive`, arr)
			.then(r => r.data)
			.finally(function () {
				setQuery(p => !p)
				setOpenDelActiveForm(!openDelActiveForm)
			})
			typeof cleanAll === "undefined" ? null : cleanAll();
			typeof setUpdate === "undefined" ? null : setUpdate(1);
		// console.log('cleanAll Delete ok!!!!!!!!!');
	}

	function PushBDVerifyActivation() {
		// console.warn('DelActiveForm-click-offerId',offerId);
		var arr = { 'id': [offerId], 'active': '0' }
		// console.error('DelActiveForm-click-arr', arr);
		axios.post(`${BASE_URL}/api/verifyActive`, arr)
			.then(r => r.data)
			.finally(function () {
				setQuery(p => !p)
				setOpenDelActiveForm(!openDelActiveForm)
			})
			typeof cleanAll === "undefined" ? null : cleanAll();
			typeof setUpdate === "undefined" ? null : setUpdate(0);
			console.log("_____setUpdate___________", setUpdate)
		// console.log('cleanAll Activate ok!!!!!!!!!');	
	}

	function closeDelActiveForm() {
		setOpenDelActiveForm(!openDelActiveForm)
	}

	function PushBDVerify(e) {

		var arr = { 'id': offerId, 'active': `${e.target.parentElement.id}` }

		axios.post(`${BASE_URL}/api/verifyActive`, arr)
			.then(r => r.data)
			.finally(function () {
				setQuery(p => !p)
				setOpenDelActiveForm(!openDelActiveForm)
			})
		typeof cleanAll === "undefined" ? null : cleanAll();
		typeof setUpdate === "undefined" ? null : setUpdate(1);
	}


	 console.log("_____UnicOfferData___________", offerData)
	// console.log("_____offerId_DelActiveForms",offerId)
	// console.log("_____battonId_DelActiveForms",battonId)

	// отрисовка по нажатию на 'Активировать'
	if (battonId === '001') {
		if (offerId?.length === 1) {
			/* const offerAction = (offer.data.offers)?.filter((item) => item.id === +offerId.join()) */
			const offerAction = Array.isArray(offerData) ? offerData[0] : offerData;

			return (
				<Box key={offerAction.id} className={classes.delete_form}>
					<Box className={classes.delete_form__item}>
						{offerAction.photo
							?.slice(0, 1)
							.map((imgs, i) => {
								return <CardMedia className={classes.delete_form__item__img} key={i} image={imgs} />
							})
						}
						<Typography className={classes.delete_form__item__price}>{ToRubles(offerAction.price)}</Typography>
						<Typography className={classes.delete_form__item__title}>{offerAction.title}</Typography>
					</Box>
					<Typography className={classes.delete_form__desc}>Заново активировать</Typography>
					<Typography className={classes.delete_form__sub_desc}>Вы хотите активировать объявление ?</Typography>
					<Button onClick={() => PushBDVerifyActivation()} className={classes.delete_form__btn}>Да</Button>
					<Button onClick={closeDelActiveForm} className={classes.delete_form__btn}>Нет</Button>
				</Box>
			)
		} else {
			return (
				<Box className={classes.delete_form}>
					<Typography className={classes.delete_form__desc}>Заново активировать</Typography>
					<Typography className={classes.delete_form__sub_desc}>Вы хотите активировать объявления ?</Typography>
					<Button onClick={() => PushBDVerifyActivation()} className={classes.delete_form__btn}>Да</Button>
					<Button onClick={closeDelActiveForm} className={classes.delete_form__btn}>Нет</Button>
				</Box>
			)
		}

		// отрисовка по нажатию на 'Удалить'
	} else if (battonId === '002') {
		if (offerId?.length === 1) {
			/* const offerAction = (offer.data.offers)?.filter((item) => item.id === +offerId.join()) */
			const offerAction = Array.isArray(offerData) ? offerData[0] : offerData;
			
			return (
				<Box key={offerAction.id} className={classes.delete_form}>
					<Box className={classes.delete_form__item}>
						{offerAction.photo
							?.slice(0, 1)
							.map((imgs, i) => {
								return <CardMedia className={classes.delete_form__item__img} key={i} image={imgs} />
							})
						}
						<Typography className={classes.delete_form__item__price}>{ToRubles(offerAction.price)}</Typography>
						<Typography className={classes.delete_form__item__title}>{offerAction.title}</Typography>
					</Box>
					<Typography className={classes.delete_form__desc}>Удалить из архива</Typography>
					<Typography className={classes.delete_form__sub_desc}>Вы действительно хотите удалить объявление ?</Typography>
					<Button id='001' onClick={() => PushBDVerifyDelete()} className={classes.delete_form__btn}>Да удалить</Button>
					<Button id='002' onClick={closeDelActiveForm} className={classes.delete_form__btn}>Нет</Button>
				</Box>
			)
		} else {
			return (
				<Box className={classes.delete_form}>
					<Typography className={classes.delete_form__desc}>Удалить из архива</Typography>
					<Typography className={classes.delete_form__sub_desc}>Вы действительно хотите удалить объявления ?</Typography>
					<Button id='001' onClick={() => PushBDVerifyDelete()} className={classes.delete_form__btn}>Да удалить</Button>
					<Button id='002' onClick={closeDelActiveForm} className={classes.delete_form__btn}>Нет</Button>
				</Box>
			)
		}
	} else if( battonId === '003') {
		if (offerId?.length === 1) {
			/* const offerAction = (offer.data.offers)?.filter((item) => item.id === +offerId.join()) */
			const offerAction = Array.isArray(offerData) ? offerData[0] : offerData;
			console.log(offerAction)
			return (
				<Box key={offerAction.id} className={classes.delete_form}>
					<Box className={classes.delete_form__item}>
						{offerAction.photo
							?.slice(0, 1)
							.map((imgs, i) => {
								return <CardMedia className={classes.delete_form__item__img} key={i} image={imgs} />
							})
						}
						<Typography className={classes.delete_form__item__price}>{ToRubles(offerAction.price)}</Typography>
						<Typography className={classes.delete_form__item__title}>{offerAction.title}</Typography>
					</Box>
					<Typography className={classes.delete_form__desc}>Снять с публикации</Typography>
					<Typography className={classes.delete_form__sub_desc}>Выберете причину</Typography>
					<Button id='001' onClick={(e) => PushBDVerify(e)} className={classes.delete_form__btn}>Продано на Kvik</Button>
					<Button id='002' onClick={(e) => PushBDVerify(e)} className={classes.delete_form__btn}>Продано в другом месте</Button>
					<Button id='003' onClick={(e) => PushBDVerify(e)} className={classes.delete_form__btn}>Другая причина</Button>
				</Box>
			)
		} else {
			return (
				<Box className={classes.unpublish_form}>
					<Typography className={classes.delete_form__desc}>Снять с публикации</Typography>
					<Typography className={classes.delete_form__sub_desc}>Выберете причину</Typography>
					<Button id='001' onClick={(e) => PushBDVerify(e)} className={classes.delete_form__btn}>Продано на Kvik</Button>
					<Button id='002' onClick={(e) => PushBDVerify(e)} className={classes.delete_form__btn}>Продано в другом месте</Button>
					<Button id='003' onClick={(e) => PushBDVerify(e)} className={classes.delete_form__btn}>Другая причина</Button>
				</Box>
			)
		}
	}
}