import React, { useState, useEffect} from "react";
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
	const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
	const handleUnpublishFormDialog = () => setOpenUnpublishForm(!openUnpublishForm);
	const [offerId, setOfferId] = useState();
	const [offerData, setOfferData] = useState()

	useEffect(() => {
		let cardInfo = offer.offer;
		setOfferData(cardInfo)
		
	}, [])


	
	const [check, setCheck] = useState(false);

	
	
	useEffect(() => {
		setCheck(offer.checkAll);
		onCheck(offer.checkAll)
	}, [offer.checkAll])

	console.log("offer.checkAll стал", offer.checkAll)
	
	/* Проверить меняется ли стейт кнопок при отжатии */
	

	const onCheck = e => {
	 	offer.getDataCheck({
	 		id: offer.offer.id,
	 		isCheck: e,
	 	})
	 	if(e==false && offer.setGetDataChild !== null){
	 		if(typeof offer.getDataChild !== "undefined"){
	 			let deteteData = offer.getDataChild.filter((item) => (
	 				item.id != offer.offer.id
	 			));
	 			offer.deleteDataChild(deteteData)
	 			console.log(deteteData, "вызывается при отжатии")
	 		}
	 	}
	 	if(e){
	 		offer.addDataChild(offerData)
	 		console.log(offer.offer.id, "вызывается при нажатии")
	  	}
	}
	console.log(offerData,"то что по итогу в стейте")






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
							onChange={(e) => { setCheck(e.target.checked); onCheck(e.target.checked)}}
							 
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