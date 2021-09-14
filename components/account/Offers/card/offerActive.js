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
	const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
	const handleUnpublishFormDialog = () => setOpenUnpublishForm(!openUnpublishForm);
	const [check, setCheck] = useState(false);
	const [offerId, setOfferId] = useState();

	useEffect(() => {
		offer.filterDataCheck({
			id: offer.offer.id,
			check: check,
		})
	}, [])

	useEffect(() => {
		if ( offer.parentCheck && check===false ) { handleCheck(offer.parentCheck) }
		else if ( offer.parentCheck && typeof offer.dataChecked.find((item) => item.check === false)==="undefined" ) { null }
		else {
			if ( offer.parentCheck===false && check && offer.dataChecked.length > 0 ) { null }
			else if( offer.parentCheck===false && offer.dataChecked.length===0 ) { handleCheck(offer.parentCheck) }
			else { handleCheck(offer.parentCheck) }
		}				
	}, [offer.parentCheck])

	const handleCheck = (changeCheck) => {
		setCheck(changeCheck);
		offer.getChildCheck({
			id: offer.offer.id,
			check: changeCheck,
			cardInfo: offer.offer,
		});
	}

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
							onChange={(event) => {handleCheck(event.target.checked)}}
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