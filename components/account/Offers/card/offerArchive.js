import React, { useState, useEffect } from "react";
import { ToRubles } from "../../../../lib/services";
import Verify from "../../../json/verify.json";
import { useMedia } from "../../../../hooks/useMedia"
import { Checkbox, makeStyles, Dialog } from "@material-ui/core";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import { DeleteCTX } from "../../../../lib/Context/DialogCTX"
import DeleteForm from "../../../DeleteForm"



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

export default function offerArchive(offer) {

	const { matchesMobile, matchesTablet } = useMedia()

	const classes = useStyles();
	const [openDeleteForm, setOpenDeleteForm] = useState(false);
	const handleDeleteFormDialog = () => setOpenDeleteForm(!openDeleteForm);
	const [check, setCheck] = useState(false);
	const [offerId, setOfferId] = useState();
	const [battonId, setBattonId] = useState('');
	const offerData = offer.offer;

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

	useEffect(() => {
		offer.openDeleteForm===false&&offer.dataChecked.length===0 ? setCheck(false) : null
	}, [offer.openDeleteForm])

	const handleCheck = (changeCheck) => {
		setCheck(changeCheck);
		offer.getChildCheck({
			id: offer.offer.id,
			check: changeCheck,
		},offer.offer);
	}
	
	console.log(offer,`offer ${offer.offer.id} maunt`)

	/* Модальное окно */

	function pushCheck(e) {
		if (e.target.value !== '') {
			setOfferId([+e.target.value])
		}
		setOpenDeleteForm(!openDeleteForm)
		setBattonId(e.target.id)
		handleDeleteFormDialog()
	}
	
	// console.log(openDeleteForm, "deleteForm open/close")

	return (
		<DeleteCTX.Provider value={{ offerId, offerData, openDeleteForm, battonId, setOpenDeleteForm }}>
			<div key={offer.offer.id} className="offerContainer boxWrapper">
				<div className="offerImage">
					<div className="offerPubCheck">

						<Checkbox
							className={classes.check}
							color='primary'
							icon={<FiberManualRecordOutlinedIcon />}
							checkedIcon={<FiberManualRecordSharpIcon />}
							value={offer.offer.id}
							onChange={(event) => { handleCheck(event.target.checked)}}
							checked={check}
						/>
					</div>

					{offer.offer.photo?.slice(0, 1).map((imgs, i) => {
							return (
								<img key={i} src={imgs} />
							)
						})}

					{<img src={offer.offer.img} />}
					{offer.verify === 7 ? "" : <div className="offerWaitCause megaLight">{Verify[offer.offer.verify]}</div>}
				</div>
				<div className="offerDescription">
					<div className="offerDescriptionTop">
						<div className="offerDTLeft thin">
							<>{ToRubles(offer.offer.price)}</>
							<div className="offerTitle">{offer.offer.title}</div>
						</div>


						<div className="offerDTRight">

							{/* <a className="offerActivate thin superLight ">Активировать</a> */}
							{/* <a className="offerEdit thin superLight editIcon">Редактировать</a> */}
							{/* <a className="offerDelete thin superLight binIcon">Удалить</a> */}
							{/* зарефакторил ниже  */}

							{/* <button type="submit" className="offerActivate thin superLight checkMarkIcon offerSocialAction">
								Активировать
							</button> */}

							<a href="javascript:void(0);">
								<button
									id='001'
									value={offer.offer.id}
									onClick={(e) => pushCheck(e)}
									className="offerActivate thin superLight checkMarkIcon offerSocialAction">
									Активировать
								</button>
							</a>
							
							<button id='002' type="submit" className="offerEdit thin editIcon offerSocialAction">
								Редактировать
							</button>


							<a href="javascript:void(0);">
								<button
									value={offer.offer.id}
									onClick={(e) => pushCheck(e)}
									className="offerEdit thin superLight offerSocialAction binIcon">
									Удалить
								</button>
							</a>

						</div>


					</div>
					<div className="offerDescriptionBottom">
						<div className="thin light small DatPub__mobile">
							<span> {matchesTablet || matchesMobile ? null : "Дата последнего редактирования: "}{offer.offer.date}</span>
							<div className="offerSocialCount offerSocialCountPos">
								<div className="offerShowes showesIcon">0 +0</div>
								<div className="offerAddFavores likeIcon">0 +0</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Dialog open={openDeleteForm || false} onClose={() => setOpenDeleteForm(!openDeleteForm)} fullWidth maxWidth='md'>
				<DeleteForm Close={handleDeleteFormDialog} />
			</Dialog>
		</DeleteCTX.Provider>
	)
}