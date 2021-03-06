import React, { useContext } from 'react'
import { Typography, Button, Box, CardMedia, makeStyles } from "@material-ui/core";
import { UnpublishCTX } from '../lib/Context/DialogCTX';
import { ToRubles } from "../lib/services";
import { useOfferAccount } from '../lib/Context/OfferAccountCTX';
import { BASE_URL } from '../lib/constants';
import {getTokenDataByPost} from "../lib/fetch";
import {useAuth} from "../lib/Context/AuthCTX";
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
	const {id} = useAuth();
	const { dataCheck, offerData, openUnpublishForm, setOpenUnpublishForm, cleanAll, setUpdate } = useContext(UnpublishCTX);

	const {token} = useAuth();

	const { setQuery } = useOfferAccount()

	function PushBDVerify(e) {
		const active = parseInt(e.target.parentElement.id)
		// var arr = { 'id': dataCheck, 'active': `${e.target.parentElement.id}`, 'user_id': id }
		var arr = { 'id': dataCheck, 'active': active, 'user_id': id }

		getTokenDataByPost(`${BASE_URL}/api/verifyActive`, arr, token)
			.then(r => r)
			.finally(function () {
				setQuery(p => !p)
				setOpenUnpublishForm(!openUnpublishForm)
			})
		typeof cleanAll === "undefined" ? null : cleanAll();
		typeof setUpdate === "undefined" ? null : setUpdate(true);
	}

	if (dataCheck?.length === 1) {
		/* const offerAction = (offer.data.offers)?.filter((item) => item.id === +offerId.join()) */
		const offerAction = Array.isArray(offerData) ? offerData[0] : offerData;
		// console.log(offerAction)
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
				<Typography className={classes.unpublish_form__desc}>?????????? ?? ????????????????????</Typography>
				<Typography className={classes.unpublish_form__sub_desc}>???????????????? ??????????????</Typography>
				<Button id='001' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>?????????????? ???? Kvik</Button>
				<Button id='002' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>?????????????? ?? ???????????? ??????????</Button>
				<Button id='003' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>???????????? ??????????????</Button>
			</Box>
		)
	} else {
		return (
			<Box className={classes.unpublish_form}>
				<Typography className={classes.unpublish_form__desc}>?????????? ?? ????????????????????</Typography>
				<Typography className={classes.unpublish_form__sub_desc}>???????????????? ??????????????</Typography>
				<Button id='001' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>?????????????? ???? Kvik</Button>
				<Button id='002' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>?????????????? ?? ???????????? ??????????</Button>
				<Button id='003' onClick={(e) => PushBDVerify(e)} className={classes.unpublish_form__btn}>???????????? ??????????????</Button>
			</Box>
		)
	}
}
