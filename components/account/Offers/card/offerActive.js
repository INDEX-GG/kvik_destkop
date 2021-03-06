import React, { useState, useEffect } from "react";
import { Checkbox, Dialog, makeStyles } from "@material-ui/core";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import { ToRubles, ToFullDate } from "../../../../lib/services";
import OfferModal from "../../../OfferModal";
import Router from "next/router";

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
	},
	// [theme.breakpoints.down(960)]: {
	// 	''
	// }
}));

export default function offerActive({offer, parentCheck, getChildCheck, allDataCheck, parentUnpublishForm, offersLength}) {
	const classes = useStyles();
	const [openOfferModal, setOpenOfferModal] = useState(false);
	const [check, setCheck] = useState(false);
	const [offerId, setOfferId] = useState([]);
	const buttonId = "003";
	const offerData = offer;
	const offerID = offer.id;


	const cleanAll = () => {
		getChildCheck({id: offer.id, isChecked: false});
		setCheck(false)
	}

	useEffect(() => {
		parentCheck ? check
			? null
			: ( getChildCheck({id: offer.id, isChecked: parentCheck}), setCheck(parentCheck) )
		: check===false
			? null
			: allDataCheck.length === 0
				? (getChildCheck({id: offer.id, isChecked: parentCheck}), setCheck(parentCheck))
				: null;
	}, [parentCheck])

	useEffect(() => {
		parentUnpublishForm === false && allDataCheck.length === 0 ? setCheck(false) : null
	}, [parentUnpublishForm])

	function pushCheck(e) {
		if (e.target.value !== '') {
			setOfferId([+e.target.value])
		}
		setOpenOfferModal(!openOfferModal);
	}

	//  '[{"name": "???????????? ??????????????", "url": `/account/${router.query.id}?account=1&content=1`}, {"name": "?????? ????????????????????", "url": `/account/${router.query.id}/?account=1`}, {"name": "???????????????? ????????????????????", "url": `/account/${router.query.id}/?account=1&content=1`}]'
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
								setCheck(event.target.checked);
								getChildCheck({id: offer.id, isChecked: event.target.checked}); /* handleCheck(event.target.checked) */
							}}
							checked={check}
						/>
					</div>}
					{offer.photo?.map((imgs, i) => {
						return <img key={i} src={imgs} />;
					})}
				</div>
				<div className="offerDescription">
					<div className="offerDescriptionTop">
						<div className="offerDTLeft thin">
							<div className="offerPrice">{ToRubles(offer.price)}</div>
							<div className="offerTitle">{offer.title}</div>
							<div className="offerDatPub small light DatPub__mobile">
								<span className="offerDate"> ???????? ???????????????????? </span>
								{ToFullDate(offer.created_at)}
							</div>
							<div className="offerLastDays">???????????????? 30 ????????</div>
						</div>
						<div className="offerDTRight">
							<button type="submit" className="offerEdit offerEditActive thin editIcon offerSocialAction" onClick={() => Router.push(`/editPage/${offerID}`)}>
								??????????????????????????
							</button>
							<a>
								<button
									value={offer.id}
									onClick={(e) => pushCheck(e)}
									className="offerUnpublish thin superLight">
									?????????? ?? ????????????????????
								</button>
							</a>
							<div className="offerDescriptionBottomEnd" style={{justifyContent: 'end'}}>
								<div className="offerSocialCount offerSocialCountPos" style={{justifyContent: 'end'}}>
									<div style={{margin: '0'}} className="offerShowes showesIcon">{offer.last_day_viewing_count} +{offer.all_time_contact_count}</div><div className="showesIcon"></div>
									<div style={{margin: '0'}} className="offerAddFavores likeIcon">{offer.likes_count} +0</div>
								</div>
							</div>
						</div>
					</div>
					<div style={{justifyContent:'center'}} className="offerDescriptionBottom">
						<button style={{padding:'4px 37px'}} className="offerButtonViews button contained">?????????????????? ??????????????????</button>
					</div>
				</div>
			</div>

			<Dialog open={openOfferModal || false} onClose={() => setOpenOfferModal(!openOfferModal)} fullWidth maxWidth='xs'>
				<OfferModal
					offerId={offerId}
					offerData={offerData}
					setOpenOfferModal={setOpenOfferModal}
					openOfferModal={openOfferModal}
					buttonId={buttonId}
					cleanAll={cleanAll}
				/>
			</Dialog>
		</>
	)
}
