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

export default function offerActive({offer, parentCheck, getChildCheck, allDataCheck, parentUnpublishForm, i}) {
	const classes = useStyles();
	const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
	const handleUnpublishFormDialog = () => setOpenUnpublishForm(!openUnpublishForm);
	const [check, setCheck] = useState(false);
	const [dataCheck, setDataCheck] = useState();
	const offerData = offer;
	

	useEffect(() => {
		parentCheck ? check ? null : ( getChildCheck({id: offer.id, isChecked: parentCheck}), setCheck(parentCheck) ) : check===false ? null : allDataCheck.length===0 ? (getChildCheck({id: offer.id, isChecked: parentCheck}), setCheck(parentCheck)) : null;
	}, [parentCheck])

	useEffect(() => {
		parentUnpublishForm === false && allDataCheck.length === 0 ? setCheck(false) : null
	}, [parentUnpublishForm]) 
	
	/* Модальное окно */
	
	function pushCheck(e) {
		if (e.target.value !== '') {
			setDataCheck([+e.target.value])
		}
		setOpenUnpublishForm(!openUnpublishForm)
		handleUnpublishFormDialog()
	}

	//  '[{"name": "Личный кабинет", "url": `/account/${router.query.id}?account=1&content=1`}, {"name": "Мои объявления", "url": `/account/${router.query.id}/?account=1`}, {"name": "Активные объявления", "url": `/account/${router.query.id}/?account=1&content=1`}]'
	return (
		<UnpublishCTX.Provider value={{ dataCheck, offerData, openUnpublishForm, setOpenUnpublishForm, /* cleanAll  */}}>
			<a href={`/product/${offer.id}`} key={i}
				className="offerContainer boxWrapper">
				<div className="offerImage">
					<div className="offerPubCheck">
						<Checkbox
							className={classes.check}
							color='primary'
							icon={<FiberManualRecordOutlinedIcon />}
							checkedIcon={<FiberManualRecordSharpIcon />}
							value={offer.id}
							onChange={(event) => {setCheck(event.target.checked); getChildCheck({id: offer.id, isChecked: event.target.checked}); /* handleCheck(event.target.checked) */}}
							checked={check}
						/>
					</div>
					{offer.photo?.map((imgs, i) => {
						return <img key={i} src={imgs} />;
					})}
				</div>
				<div className="offerDescription">
					<div className="offerDescriptionTop">
						<div className="offerDTLeft thin">
							<div>{ToRubles(offer.price)}</div>
							<div className="offerTitle">{offer.title}</div>
							<div className="offerDatPub small light DatPub__mobile">
								<span className="offerDate"> Дата публикации </span>
								{ToFullDate(offer.created_at)}
							</div>
							<div className="offerLastDays">Осталось 30 дней</div>
						</div>
						<div className="offerDTRight">
							<button type="submit" className="offerEdit thin editIcon offerSocialAction">
								Редактировать
							</button>

							<a href="javascript:void(0);">
								<button
									value={offer.id}
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
					<div style={{visibility: 'hidden'}} className="offerDescriptionBottom">
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