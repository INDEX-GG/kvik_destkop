import React, { useContext } from 'react'
import { Typography, Button, Box, CardMedia, makeStyles } from "@material-ui/core";
import { DeleteCTX } from '../lib/Context/DialogCTX';
import { ToRubles } from "../lib/services";
import axios from 'axios';
import { useOfferAccount } from '../lib/Context/OfferAccountCTX';
import { BASE_URL} from '../lib/constants';
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


export default function DeleteForm() {
	const classes = useStyles();
	const { offerId, offerData, openDeleteForm, setOpenDeleteForm, battonId } = useContext(DeleteCTX);
	const { setQuery } = useOfferAccount()

	function PushBDVerifyDelete() {
		console.warn('DeleteForm-click-offerId',offerId);
		var arr = { 'id': [offerId], 'verify': '4' }
		console.error('DeleteForm-click-arr', arr);
		axios.post(`${BASE_URL}/api/verifyActive`, arr)
			.then(r => r.data)
			.finally(function () {
				setQuery(p => !p)
				setOpenDeleteForm(!openDeleteForm)
			})
	}

	function PushBDVerifyActivation() {
		console.warn('DeleteForm-click-offerId',offerId);
		var arr = { 'id': [offerId], 'verify': '0' }
		console.error('DeleteForm-click-arr', arr);
		axios.post(`${BASE_URL}/api/verifyActive`, arr)
			.then(r => r.data)
			.finally(function () {
				setQuery(p => !p)
				setOpenDeleteForm(!openDeleteForm)
			})
	}

	function closeDeleteForm() {
		setOpenDeleteForm(!openDeleteForm)		
	}


	
	console.log("_____delete_ offers_DeleteForms",offerData)
	console.log("_____offerId_DeleteForms",offerId)
	console.log("_____battonId_DeleteForms",battonId)
	
	
	console.log('Правильно не правильно значение айди баттон')
	console.log(typeof battonId)
	console.log(battonId === '001')

	if(battonId === '001'){
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
					<Button onClick={(e) => PushBDVerifyActivation(e)} className={classes.delete_form__btn}>Да</Button>
					<Button onClick={closeDeleteForm} className={classes.delete_form__btn}>Нет</Button>
				</Box>
			)
		} else {
			return (
				<Box className={classes.delete_form}>
					<Typography className={classes.delete_form__desc}>Заново активировать</Typography>
					<Typography className={classes.delete_form__sub_desc}>Вы хотите активировать объявление ?</Typography>
					<Button onClick={(e) => PushBDVerifyActivation(e)} className={classes.delete_form__btn}>Да</Button>
					<Button onClick={closeDeleteForm} className={classes.delete_form__btn}>Нет</Button>
				</Box>
			)
		}


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
					<Button id='001' onClick={(e) => PushBDVerifyDelete(e)} className={classes.delete_form__btn}>Да удалить</Button>
					<Button id='002' onClick={closeDeleteForm} className={classes.delete_form__btn}>Нет</Button>
				</Box>
			)
		} else {
			return (
				<Box className={classes.delete_form}>
					<Typography className={classes.delete_form__desc}>Удалить из архива</Typography>
					<Typography className={classes.delete_form__sub_desc}>Вы действительно хотите удалить объявление ?</Typography>
					<Button id='001' onClick={(e) => PushBDVerifyDelete(e)} className={classes.delete_form__btn}>Да удалить</Button>
					<Button id='002' onClick={closeDeleteForm} className={classes.delete_form__btn}>Нет</Button>
				</Box>
			)
		}
	}



	
}