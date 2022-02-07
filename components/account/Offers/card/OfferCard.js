import React, { useState, useEffect } from "react";
import { Checkbox, Dialog, makeStyles } from "@material-ui/core";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import { ToRubles, ToFullDate } from "../../../../lib/services";
import OfferModal from "../../../OfferModal";
import Router from "next/router";
import LikeDark from "#UI/icons/LikeDark";
import Showes from "#UI/icons/Showes";
import Edit from "#UI/icons/Edit";

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
	description:{
		padding: '8px 24px',
		justifyContent: 'space-between',
	},
	column:{
		display: 'flex',
		flexDirection: 'column',
	},
	row:{
		display: 'flex',
		flexDirection: 'row',
	},
	end:{
		justifyContent: 'end',
		alignItems: 'end',
	},
	main__text:{
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '14px',
		lineHeight: '16px',
		paddingBottom: '8px',
	},
	lignt__text:{
		fontSize: '12px',
		lineHeight: '14px',
		color: '#8F8F8F',
		padding: '12px 0',
	},
	height:{
		height: '24px',
	},
	showes:{
		width: '30px',
		marginRight: '15px',
		textAlign: 'end',
	},
	likes:{
		width: '30px',
		textAlign: 'end',
	},
	paddingIcon:{
		padding: '24px 34px',
		paddingRight: '0',
	},
	paddingIconWait:{
		padding: '24px 34px',
		paddingRight: '0',
	},
	btn__upViews:{
		display:'none',
		position: 'absolute',
		bottom: '8px',
		alignSelf: 'center',
		cursor: 'pointer',
		padding: '4px 35px',
		borderRadius: '8px',
		fontSize: '14px',
		fontWeight: '500',
		transition: 'all 500ms ease',
		border: '1px solid transparent',
		// display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00a0ab',
		color: '#f7f7f7',
	},
	top:{
		position: 'relative',
		flexGrow: '1',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	bottom:{
		width: '100%',
		paddingBottom: '8px', 
		marginTop: '8px',
		display: 'flex',
		justifyContent: 'center',

	},
	btn__unpublish:{
		background: 'none',
		marginTop: '12px',
		transition: 'all 200ms ease-in-out',
		cursor: 'pointer',
		fontWeight: '400',
		color: '#c7c7c7',

		"&:hover": {
			transition: 'all 200ms ease-in-out',
			color: '#52b9c5',
			textDecoration: 'underline',
		}
	},
	btn__edit:{
		width: 'auto',
		backgroundColor: '#fff',
		fontWeight: '400',
		color: '#52b9c5',
		cursor: 'pointer',

		"&:hover": {
			textDecoration: 'underline',
		}
	},
	info__text:{
		paddingTop: '4px',
		color: '#5A5A5A',
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: '14px',
		lineHeight: '16px',
	},
	edit:{
		display: 'flex',
		justifyContent: 'end'
	},
	btn__wait:{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		marginBottom: '14px',
	},
	text__wait:{
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: '8px',
		width: 'auto',
 		textAlign: 'right',
		backgroundColor: '#fff',
		color: '#52b9c5',
	},
	pos_abs:{
		position: 'absolute',
		width: '232px',
		minWidth: '60px',
		height: '28px',
		background: 'rgba(44, 44, 44, 0.74)',
		borderRadius: '8px',
		color: 'white',
		top: '150px',
		alignItems: 'center',
		textAlign:'center',
		display: 'flex',
		justifyContent: 'center',
	},

	[theme.breakpoints.down(1080)]: {
		paddingIcon:{
			paddingTop: '91px',
		},
		paddingIconWait:{
			position: 'absolute',
			bottom: 0,
			right: 0,
			padding: '0px'
		},
		bottom:{
			justifyContent: 'start',
		},
		left__date__wait:{
			paddingTop: '47px',
		},
	},
	
	[theme.breakpoints.down(960)]: {
		paddingIcon:{
			position: 'absolute',
			left: '0',
			top: '0',
			padding: '0'
		},
		paddingIconWait:{
			left:0,
			top: 0,
		},
		left__info: {
			paddingTop: '60px',
		},
		icon__column: {
			flexDirection: 'column',
			alignItems: 'start',
		},
		left__date:{
			display: 'flex',
			justifyContent: 'space-betweeen',
		},
		lignt__text: {
			padding: '0',
			alignItems: 'end'
		},
		bottom:{
			justifyContent: 'center',
		},
		position__absolute:{
			position: 'absolute',
			right: '0',
			padding: '0',
		},
		pos_abs:{
			width: '150px',
		}
	},
	[theme.breakpoints.down(580)]: {
		btn__unpublish: {
			textAlign: 'end',
		},
		lignt__text: {
			paddingRight: '5px'
		},
		description:{
			padding: '8px'
		},
		left__date__wait:{
			paddingTop: '40px',
		},
		pos_abs:{
			width: '120px',
		}
	},
	[theme.breakpoints.down(451)]: {
		left__date__wait:{
			paddingTop: '20px',
		},
		mobile__font:{	
		fontSize: '18px',
		lineHeight: '21px',
		},
		pos_abs:{
			position: 'absolute',
			width: '60%',
			minWidth: '60px',
			height: '28px',
			background: 'rgba(44, 44, 44, 0.74)',
			borderRadius: '8px',
			color: 'white',
			top: '150px',
			alignItems: 'center',
			textAlign:'center',
			display: 'flex',
			justifyContent: 'center',
		},
	}
}));

export default function OfferCard({offer, parentCheck, getChildCheck, allDataCheck, parentUnpublishForm, offersLength, typeTab}) {
	const classes = useStyles();
	const [openOfferModal, setOpenOfferModal] = useState(false);
	const [check, setCheck] = useState(false);
	const [offerId, setOfferId] = useState([]);
	const buttonId = "003";
	const offerData = offer;
	const offerID = offer.id;
	const isArchive = typeTab === 'archiveTab';
	const isActive = typeTab === 'activeTab';
	const isWaith = typeTab === 'waitTab';
	// console.log(isArchive, isActive, isWaith);
	

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
			: allDataCheck?.length === 0
				? (getChildCheck({id: offer.id, isChecked: parentCheck}), setCheck(parentCheck))
				: null;
	}, [parentCheck])

	useEffect(() => {
		parentUnpublishForm === false && allDataCheck?.length === 0 ? setCheck(false) : null
	}, [parentUnpublishForm])

	function pushCheck(e) {
		if (e.target.value !== '') {
			setOfferId([+e.target.value])
		}
		setOpenOfferModal(!openOfferModal);
	}

	//  '[{"name": "Личный кабинет", "url": `/account/${router.query.id}?account=1&content=1`}, {"name": "Мои объявления", "url": `/account/${router.query.id}/?account=1`}, {"name": "Активные объявления", "url": `/account/${router.query.id}/?account=1&content=1`}]'
	return (
		<>	
			<h1>{offer.parentCheck}</h1>
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
					})}{isWaith && (
						<p className={classes.pos_abs}>Отклонено/Заблокировано</p>
					)}
				</div>
				<div className={classes.description}>
					<div className={classes.top}>
						<div className={classes.column}>
							<div className={classes.left__info}>
								<p className={`${classes.main__text} ${classes.mobile__font}`}>{ToRubles(offer.price)}</p>
								<p className={classes.main__text}>{offer.title}</p>
							</div>
							<div className={`${classes.left__date} ${(isWaith || isArchive) ? classes.left__date__wait : ''}`}>
								<p className={`${classes.main__text} ${classes.lignt__text} ${(isWaith || isArchive) ? classes.bottom__wait : ''}`}>Дата публикации {ToFullDate(offer.created_at)}</p>
								<p className={`${classes.main__text} ${classes.position__absolute}`}>Осталось 30 дней</p>
							</div>
						</div>
						<div className={classes.column}>
							<div className={`${classes.column} ${classes.end}`}>
								{isActive && (
									<div>
										<div className={classes.edit}>
									<Edit></Edit>
									<button type="submit" className={`${classes.btn__edit}`} onClick={() => Router.push(`/editPage/${offerID}`)}>
									Редактировать
									</button>
									</div>
									<button
										value={offer.id}
										onClick={(e) => pushCheck(e)}
										className={classes.btn__unpublish}>
										Снять с публикации
									</button>
									</div>		
								)}
								{/* taaaab */}
								{(isArchive || isWaith) && (
								<div>
										<div  className={classes.btn__wait}>
											<a href="#" className={classes.text__wait}>
											<span className="offerIcon checkMarkIcon"></span>
											<button
												id='001'
												value={offer.id}
												onClick={(e) => pushCheck(e)}
												className="offerActivate thin superLight offerSocialAction">
												Активировать
											</button>
											</a>
											<button className={classes.text__wait}
													onClick={() => Router.push(`/editPage/${offerID}`)}>
												<span className="offerIcon editIcon"></span>
												Редактировать
											</button>
											<a href="#" className={classes.text__wait}>
											<span className="offerIcon binIcon"></span>

											<button
												id='002'
												value={offer.id}
												onClick={(e) => pushCheck(e)}
												className="offerEdit thin superLight offerSocialAction">
												Удалить
											</button>
											</a>
										</div>
								</div>
								)}
								
							</div>
							<div className={`${classes.column} ${isActive ? classes.paddingIcon : classes.paddingIconWait}`}>
								<div className={`${classes.end} ${classes.row} ${classes.icon__column}`}>
									<div className={classes.row}>
										<div className={`${classes.height} ${classes.info__text} ${classes.padding__icon}`}><p>{offer.last_day_viewing_count} +{offer.all_time_contact_count}</p></div>
										<div className={classes.showes}>
											<Showes></Showes>
										</div>
									</div>
									<div className={classes.row}>
										<div className={`${classes.height} ${classes.info__text} ${classes.padding__icon}`}>{offer.likes_count} +0</div>
										<div className={classes.likes}>
											<LikeDark></LikeDark>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={classes.bottom}>
						{isActive && (
						<button  className={classes.btn__upViews}>Увеличить просмотры</button>
						)}
					</div>
					

					{/* <div className="offerDescriptionTop">
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
							<button type="submit" className="offerEdit offerEditActive thin editIcon offerSocialAction" onClick={() => Router.push(`/editPage/${offerID}`)}>
								Редактировать
							</button>
							<a>
								<button
									value={offer.id}
									onClick={(e) => pushCheck(e)}
									className="offerUnpublish thin superLight">
									Снять с публикации
								</button>
							</a>
							<div class="offerDescriptionBottomEnd" style={{justifyContent: 'end'}}>
								<div class="offerSocialCount offerSocialCountPos" style={{justifyContent: 'end'}}>
									<div style={{margin: '0'}} class="offerShowes showesIcon">{offer.last_day_viewing_count} +{offer.all_time_contact_count}</div><div className="showesIcon"></div>
									<div style={{margin: '0'}} class="offerAddFavores likeIcon">{offer.likes_count} +0</div>
								</div>
							</div>
						</div>
					</div> */}
					
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