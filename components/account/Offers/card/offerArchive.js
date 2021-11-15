import React, { useState, useEffect } from "react";
import Router from "next/router";
import { ToRubles } from "../../../../lib/services";
import Verify from "../../../json/verify.json";
import { useMedia } from "../../../../hooks/useMedia";
import { Checkbox, makeStyles, Dialog } from "@material-ui/core";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import OfferModal from "../../../OfferModal";


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
	btn__publish: {
		marginLeft: '12px',
		background: 'none',
		color: theme.palette.grey[200],
		cursor: 'pointer',
		transition: 'all 200ms ease-in-out',

		'&:hover': {
			transition: 'all 200ms ease-in-out',
			textDecoration: 'underline',
		},
	},
	btn__edit: {
		marginLeft: '12px',
		background: 'none',
		color: theme.palette.grey[200],
		cursor: 'pointer',
		transition: 'all 200ms ease-in-out',

		'&:hover': {
			transition: 'all 200ms ease-in-out',
			textDecoration: 'underline',
		},
	},
	btn__delete: {
		marginLeft: '12px',
		background: 'none',
		color: theme.palette.grey[200],
		cursor: 'pointer',
		transition: 'all 200ms ease-in-out',

		'&:hover': {
			transition: 'all 200ms ease-in-out',
			textDecoration: 'underline',
		},
	},
}));


export default function offerArchive({offer, parentCheck, getChildCheck, allOfferId, parentOpenDelActiveForm, offersLength}) {
	const { matchesMobile, matchesTablet } = useMedia()
	const classes = useStyles();

	const [openOfferModal, setOpenOfferModal] = useState(false);
	const [check, setCheck] = useState(false);
	const [offerId, setOfferId] = useState();
	const [buttonId, setButtonId] = useState('');
	const offerData = offer;
	const offerID = offer.id;

	const cleanAll = () => {
		getChildCheck({id: offer.id, isChecked: false});
		setCheck(false)
	}

	useEffect(() => {
		parentCheck ? check ? null : ( getChildCheck({id: offer.id, isCheck: parentCheck}), setCheck(parentCheck) )
			:
			check===false ? null : allOfferId.length===0 ? (getChildCheck({id: offer.id, isCheck: parentCheck}), setCheck(parentCheck)) : null;
	}, [parentCheck])

	useEffect(() => {
		parentOpenDelActiveForm === false && allOfferId.length === 0 ? setCheck(false) : null
	}, [parentOpenDelActiveForm])

	function pushCheck(e) {
		if (e.target.value !== '') {
			setOfferId([+e.target.value])
		}
		setOpenOfferModal(!openOfferModal)
		setButtonId(e.target.id)
	}

	return (
		<>
			<div key={offer.id} className="offerContainer boxWrapper" 
				onClick={	(event) => { 
					if(event.target.localName !== "button" && event.target.localName !== "input") {
						Router.push(`/product/${offer.id}`) 
					}
				}}
			>
				<div className="offerImage">
					{offersLength > 1 && <div className="offerPubCheck">
						<Checkbox
							className={classes.check}
							color='primary'
							icon={<FiberManualRecordOutlinedIcon/>}
							checkedIcon={<FiberManualRecordSharpIcon/>}
							value={offer.id}
							onChange={(event) => {
								getChildCheck({
									id: offer.id,
									isCheck: event.target.checked
								}), setCheck(event.target.checked)
							}}
							checked={check}
						/>
					</div>}

					{offer.photo?.slice(0, 1).map((imgs, i) => {
						return (
							<img key={i} src={imgs} alt={"Изображение обьявления"} />
						)
					})}

					{<img src={offer.img} alt={"Изображение обьявления"}/>}
					{offer.verify === 7 ? "" : <div className="offerWaitCause megaLight">{Verify[offer.active]}</div>}
				</div>
				<div className="offerDescription">
					<div className="offerDescriptionTop">
						<div className="offerDTLeft thin">
							<>{ToRubles(offer.price)}</>
							<div className="offerTitle">{offer.title}</div>
						</div>

						<div className="offerDTRight">

							<a href="#">
								<button
									id='001'
									value={offer.id}
									onClick={(e) => pushCheck(e)}
									className="offerActivate thin superLight checkMarkIcon offerSocialAction">
									Активировать
								</button>
							</a>

							<button className="offerEdit thin editIcon offerSocialAction" onClick={() => Router.push(`/editPage/${offerID}`)} >
								Редактировать
							</button>

							<a href="#">
								<button
									id='002'
									value={offer.id}
									onClick={(e) => pushCheck(e)}
									className="offerEdit thin superLight offerSocialAction binIcon"
								>
									Удалить
								</button>
							</a>

						</div>

					</div>
					<div className="offerDescriptionBottom">
						<div className="thin light small DatPub__mobile">
							<span> {matchesTablet || matchesMobile ? null : "Дата последнего редактирования: "}{offer.date}</span>
							<div className="offerSocialCount offerSocialCountPos">
								<div className="offerShowes showesIcon">0 +0</div>
								<div className="offerAddFavores likeIcon">0 +0</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Dialog open={openOfferModal || false} onClose={() => setOpenOfferModal(!openOfferModal)} fullWidth maxWidth='md'>
				<OfferModal
					offerId={offerId}
					offerData={offerData}
					openOfferModal={openOfferModal}
					setOpenOfferModal={setOpenOfferModal}
					buttonId={buttonId}
					cleanAll={cleanAll}
				/>
			</Dialog>
		</>
	)
}