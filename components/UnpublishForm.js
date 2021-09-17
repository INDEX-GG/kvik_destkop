import React, { useContext } from 'react'
import { Typography, Button, Box, CardMedia, makeStyles } from "@material-ui/core";
import { UnpublishCTX } from '../lib/Context/DialogCTX';
import { ToRubles } from "../lib/services";
import axios from 'axios';
import { useOfferAccount } from '../lib/Context/OfferAccountCTX';
import { BASE_URL } from '../lib/constants';
const useStyles = makeStyles((theme) => ({
	unpublish_form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '32px 24px',
		color: theme.palette.grey[100],
	},
	unpublish_form__item: {
		width: '100px',
		height: '126px',
		padding: '3px',
		boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
		borderRadius: '1px',
		textAlign: 'center',
		marginBottom: '20px',
	},
	unpublish_form__item__img: {
		width: '100%',
		height: '88px',
	},
	unpublish_form__item__price: {
		fontSize: '12px',
		fontWeight: '500',
	},
	unpublish_form__item__title: {
		fontSize: '12px',
		fontWeight: '500',
	},
	unpublish_form__desc: {
		fontSize: '18px',
		fontWeight: '500',
		color: theme.palette.grey[100],
		marginBottom: '24px',

	},
	unpublish_form__sub_desc: {
		fontSize: '14px',
		fontWeight: '500',
		color: theme.palette.grey[500],
		marginBottom: '16px',
	},
	unpublish_form__btn: {
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


export default function UnpublishForm() {
	const classes = useStyles();
	const { dataCheck, offerData, openUnpublishForm, setOpenUnpublishForm, cleanAll } = useContext(UnpublishCTX);

	const { setQuery } = useOfferAccount()

	function PushBDVerify(e) {

		var arr = { 'id': [dataCheck], 'verify': `${e.target.parentElement.id}` }

		axios.post(`${BASE_URL}/api/verifyActive`, arr)
			.then(r => r.data)
			.finally(function () {
				setQuery(p => !p)
				setOpenUnpublishForm(!openUnpublishForm)
			})
		cleanAll();
	}

	console.log("_____offerData_____", offerData)
	console.log("_____dataCheck_____", dataCheck)

	if (dataCheck?.length === 1) {
		/* const offerAction = (offer.data.offers)?.filter((item) => item.id === +offerId.join()) */
		const offerAction = Array.isArray(offerData) ? offerData[0] : offerData;
		return (
			<Box key={offerAction.id} className={classes.unpublish_form}>
				<Box className={classes.unpublish_form__item}>
					{offerAction.photo
						?.slice(0, 1)
						.map((imgs, i) => {
							return <CardMedia className={classes.unpublish_form__item__img} key={i} image={imgs} />
						})
					}
					<Typography className={classes.unpublish_form__item__price}>{ToRubles(offerAction.price)}</Typography>
					<Typography className={classes.unpublish_form__item__title}>{offerAction.title}</Typography>
				</Box>
				<Typography className={classes.unpublish_form__desc}>Снять с публикации</Typography>
				<Typography className={classes.unpublish_form__sub_desc}>Выберете причину</Typography>
				<Button id='001' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>Продано на Kvik</Button>
				<Button id='002' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>Продано в другом месте</Button>
				<Button id='003' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>Другая причина</Button>
			</Box>
		)
	} else {
		return (
			<Box className={classes.unpublish_form}>
				<Typography className={classes.unpublish_form__desc}>Снять с публикации</Typography>
				<Typography className={classes.unpublish_form__sub_desc}>Выберете причину</Typography>
				<Button id='001' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>Продано на Kvik</Button>
				<Button id='002' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>Продано в другом месте</Button>
				<Button id='003' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>Другая причина</Button>
			</Box>
		)
	}
}