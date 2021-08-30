import React, { useState, useEffect } from "react";
import { Checkbox, Dialog, makeStyles } from "@material-ui/core";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import { ToRubles, ToFullDate } from "../../../../lib/services";
import { UnpublishCTX } from "../../../../lib/Context/DialogCTX";
import UnpublishForm from "../../../UnpublishForm";

const useStyles = makeStyles((theme) => ({
	check: {
		padding: '0px',
		background: theme.palette.secondary.main,
		width: '14px',
		height: '14px',

		'&:hover': {
			background: theme.palette.secondary.main,
		},
	},
	btn__unpublish: {
		marginLeft: '12px',
		background: 'none',
		color: theme.palette.grey[200],
		cursor: 'pointer',
		transition: 'all 200ms ease-in-out',

		'&:hover': {
			transition: 'all 200ms ease-in-out',
			textDecoration: 'underline',
		},
	}
}));

export default function offerActive(offer) {
	const classes = useStyles();
	let data;

	const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
	const handleUnpublishFormDialog = () => setOpenUnpublishForm(!openUnpublishForm);
	const [offerId, setOfferId] = useState();
	const [qwe, setQwe] = useState()

	useEffect(() => {
		// setQwe(offer.data.offers.map((item) => item.id))
		data = []
		// data = { 'id': qwe, 'isCheck': offer.checkAll }
		// for (var i = 0; i < offer.data.offers?.length; i++) {
		offer.data.offers.map((item, i) => {
			data[i] = { 'id': item.id, 'isCheck': offer.checkAll }
		})
		// }
		setQwe(data)
	}, [offer.checkValue])


	useEffect(() => {
		if (offer.checkValue != undefined) {
			data = []
			offer.data.offers.map((item, i) => {
				data[i] = { 'id': item.id, 'isCheck': offer.checkAll }
			})
			mainCheck(data)
		}
	}, [offer.checkAll])


	const [check, setCheck] = useState(false);
	useEffect(() => {
		setCheck(offer.checkAll)
	}, [offer.checkAll])


	const oneCheck = e => {
		data = { 'id': e.target.value, 'isCheck': e.target.checked }
		mainCheck([data])
	}


	let zxc = []
	const [uio, setUio] = useState();

	function mainCheck(data) {

		console.log('Что хранится qwe==>', qwe)
		console.log('Данные которые заходят ==>', data)
		console.log('Что хранится uio==>', uio)
		console.log('==================================')

		console.log(qwe.filter((item) => item.id === data.map((items) => items)))
		console.log(data.map((item) => item.id))

		setUio(zxc)
	}
	console.log(uio)



	/* Модальное окно */
	function pushCheck(e) {
		if (e.target.value !== '') {
			setOfferId([+e.target.value])
		}
		setOpenUnpublishForm(!openUnpublishForm)
		handleUnpublishFormDialog()
	}

	//  '[{"name": "Личный кабинет", "url": `/account/${router.query.id}?account=1&content=1`}, {"name": "Мои объявления", "url": `/account/${router.query.id}/?account=1`}, {"name": "Активные объявления", "url": `/account/${router.query.id}/?account=1&content=1`}]'
	return (
		<UnpublishCTX.Provider value={{ offerId, offer, openUnpublishForm, setOpenUnpublishForm }}>
			<a href={`/product/${offer.offer.id}`} key={offer.i}
				className="offerContainer boxWrapper">
				<div className="offerImage">
					<div className="offerPubCheck">
						<Checkbox
							className={classes.check}
							color='primary'
							icon={<FiberManualRecordOutlinedIcon />}
							checkedIcon={<FiberManualRecordSharpIcon />}
							value={offer.offer.id}
							onChange={(e) => { setCheck(e.target.checked); oneCheck(e) }}
							checked={check}
						/>
					</div>
					{offer.offer.photo?.map((imgs, i) => {
						return <img key={i} src={imgs} />;
					})}
				</div>
				<div className="offerDescription">
					<div className="offerDescriptionTop">
						<div className="offerDTLeft thin">
							<div>{ToRubles(offer.offer.price)}</div>
							<div className="offerTitle">{offer.offer.title}</div>
							<div className="offerDatPub small light DatPub__mobile">
								<span className="offerDate"> Дата публикации </span>
								{ToFullDate(offer.offer.created_at)}
							</div>
							<div className="offerLastDays">Осталось 30 дней</div>
						</div>
						<div className="offerDTRight">
							<button type="submit" className="offerEdit thin editIcon offerSocialAction">
								Редактировать
							</button>

							<a href="javascript:void(0);">
								<button
									value={offer.offer.id}
									onClick={(e) => pushCheck(e)}
									className="offerUnpublish thin superLight"
								>
									Снять с публикации
								</button>
							</a>
							<div className="offerSocialCount offerSocialCountPos offerSocialCountPosActive">
								<div className="offerShowes showesIcon">0 +0</div>
								<div className="offerAddFavores likeIcon">0 +0</div>
							</div>

						</div>
					</div>
					<div className="offerDescriptionBottom">
						<button className="offerButtonViews button contained">Увеличить просмотры</button>
					</div>
				</div>
			</a>

			<Dialog open={openUnpublishForm || false} onClose={() => setOpenUnpublishForm(!openUnpublishForm)} fullWidth maxWidth='md'>
				<UnpublishForm Close={handleUnpublishFormDialog} />
			</Dialog>
		</UnpublishCTX.Provider>
	)
}
