import React, { useState, useEffect } from "react";
import { Checkbox, Dialog, makeStyles } from "@material-ui/core";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import { ToRubles, ToFullDate } from "../../../../lib/services";
import OfferModal from "../../../OfferModal";
import Router from "next/router";
import BtnActive from "./OfferCardPart/btnActive";
import BtnWite from "./OfferCardPart/btnWite";
import Image from "./OfferCardPart/imgCard";
import ImgStatistic from "./OfferCardPart/imgStatistic";
import PayPromotion from "../../../../src/components/PayPromotion/PayPromotion/PayPromotion";
import CustomModalUI from "../../../../src/UI/UIcomponent/CustomModal/CustomModalUI";

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
	description: {
		padding: '8px 24px 8px 0',
		justifyContent: 'space-between',
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
	},
	end: {
		justifyContent: 'end',
		alignItems: 'end',
	},
	main__text: {
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '14px',
		lineHeight: '16px',
		paddingBottom: '8px',
	},
	lignt__text: {
		fontSize: '12px',
		lineHeight: '14px',
		color: '#8F8F8F',
		padding: '12px 0',
	},

	height: {
		height: '24px',
	},
	showes: {
		width: '30px',
		marginRight: '15px',
		textAlign: 'end',
	},
	likes: {
		width: '30px',
		textAlign: 'end',
	},
	paddingIcon: {
		padding: '24px 0 0 34px',
		paddingRight: '0',
	},
	paddingIconWait: {
		padding: '24px 0 0 34px',
		paddingRight: '0',
	},
	btn__upViews: {
		// display: 'none',
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
	top: {
		position: 'relative',
		flexGrow: '1',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	bottom: {
		width: '100%',
		paddingBottom: '8px',
		marginTop: '8px',
		display: 'flex',
		justifyContent: 'center',

	},
	btn__unpublish: {
		textDecorationLine: 'underline',
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
	btn__edit: {
		width: 'auto',
		backgroundColor: '#fff',
		fontWeight: '400',
		color: '#52b9c5',
		cursor: 'pointer',

		"&:hover": {
			textDecoration: 'underline',
		}
	},
	info__text: {
		paddingTop: '4px',
		color: '#5A5A5A',
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: '14px',
		lineHeight: '16px',
	},
	edit: {
		display: 'flex',
		justifyContent: 'end'
	},
	btn__wait: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		marginBottom: '14px',
	},
	text__wait: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		paddingBottom: '8px',
		width: 'auto',
		textAlign: 'right',
		backgroundColor: '#fff',
		color: '#52b9c5',
		"&:hover":{
			textDecorationLine: 'underline',
		},
	},
	pos_abs: {
		position: 'absolute',
		width: '232px',
		minWidth: '60px',
		height: '28px',
		background: 'rgba(44, 44, 44, 0.74)',
		borderRadius: '8px',
		color: 'white',
		top: '150px',
		alignItems: 'center',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
	},
	image: {
		userSelect: 'none',
		minWidth: '100%',
		maxHeight: '100%',
		objectFit: 'cover',
		objectPosition: 'center',
		borderRadius: '10px',
	},
	offer__image: {
		background: 'no-repeat center center url(../../../icons/photocard_placeholder.svg)',
		backgroundSize: 'cover',
		maxWidth: '300px',
		minWidth: '300px',
		height: '184px',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		overflow: 'hidden',
	},
	offer__pub__check:{
		alignSelf: 'start',
		position: 'absolute',
		top: '4px',
		left: '4px',
	},
	[theme.breakpoints.down(1281)]: {
		description: {
			padding: '8px 24px',
		},
	},
	[theme.breakpoints.down(1080)]: {
		paddingIconWait: {
			paddingTop: '35px',
		},
		bottom: {
			justifyContent: 'start',
		},
		left__date: {
			paddingTop: '8px',
			paddingRight: '10px'
		},
	},

	[theme.breakpoints.down(1025)]: {
		offer__image:{
			width: '350px',
			maxWidth: '350px',
			minWidth: '100px',
		},
		btn__unpublish: {
			textAlign: 'end',
		},
	},
	[theme.breakpoints.down(668)]: {
		btn__unpublish:{
			textAlign: 'end',
		},
	},
	[theme.breakpoints.down(960)]: {
		paddingIcon: {
			position: 'absolute',
			left: '0',
			top: '0',
			padding: '0'
		},
		paddingIconWait: {
			position: 'absolute',
			left: '0',
			top: '0',
			padding: '0'
		},
		left__info: {
			paddingTop: '60px',
		},
		icon__column: {
			flexDirection: 'column',
			alignItems: 'start',
		},
		left__date: {
			display: 'flex',
			paddingTop: '40px',

			justifyContent: 'space-betweeen',
			alignItems: 'center',
		},
		lignt__text: {
			padding: '0',
			alignItems: 'end'
		},
		bottom: {
			justifyContent: 'center',
		},
		position__absolute: {
			position: 'absolute',
			right: '0',
			padding: '0',
		},
	},
	[theme.breakpoints.down(750)]: {
		left__date__wait:{
			paddingTop: '14px',
		},
		offer__image:{
			width: '280px'
		}
	},
	[theme.breakpoints.down(546)]: {
		left__date__wait:{
			paddingTop: '25px',
		},
		offer__image:{
			width: '240px'
		}
	},
	[theme.breakpoints.down(508)]: {
		left__date__wait:{
			paddingTop: '0',
		},
		left_date:{
			paddingTop: '0',
		},
		offer__image:{
			width: '200px'
		}
	},
	[theme.breakpoints.down(580)]: {
		btn__unpublish: {
			textAlign: 'end',
		},
		lignt__text: {
			paddingRight: '5px'
		},
		description: {
			padding: '8px'
		},
		pos_abs: {
			width: '120px',
		}
	},
	[theme.breakpoints.down(350)]: {
		offer__image:{
			minWidth: '100%',
			maxHeight: '100%',
			objectFit: 'cover',
			userSelect: 'none',
			borderRadius: '10px',
			objectPosition: 'center',
		},
		left__date:{
			paddingTop: '0p'
		}
	},
	[theme.breakpoints.down(600)]: {
		offer__image:{
			minWidth: '100%'
		},
		main__text:{
			paddingBottom: '0',
		},
		mobile__width:{
			width: '132px',
			textAlign: 'end',
		},
		left__date:{
			paddingTop : '16px',
		},
		mobile__font: {
			fontSize: '18px',
			lineHeight: '21px',
			padding: '12px',
			paddingLeft: '0',
		},
		pos_abs: {
			position: 'absolute',
			width: '60%',
			minWidth: '60px',
			height: '28px',
			background: 'rgba(44, 44, 44, 0.74)',
			borderRadius: '8px',
			color: 'white',
			top: '150px',
			alignItems: 'center',
			textAlign: 'center',
			display: 'flex',
			justifyContent: 'center',
		},
	},
	promotionModal: {
		maxWidth: '865px'
	}
}));

// функция возвращает корректный день
function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

export default function OfferCard({ offer, parentCheck, getChildCheck, allDataCheck, parentUnpublishForm, offersLength, typeTab, typeButton }) {
	const classes = useStyles();
	const [openOfferModal, setOpenOfferModal] = useState(false);
	const [promotionModal, setPromotionModal] = useState(false);
	const [check, setCheck] = useState(false);
	const [offerId, setOfferId] = useState([]);
	const buttonId = typeButton;
	const offerData = offer;
	const offerID = offer.id;
	const isArchive = typeTab === 'archiveTab';
	const isActive = typeTab === 'activeTab';
	const isWaith = typeTab === 'waitTab';
	// console.log(isArchive, isActive, isWaith);
	// корректное склоенение для слова
	const correctDays = getNoun(offer.best_before, 'день', 'дня', 'дней')

	const cleanAll = () => {
		getChildCheck({ id: offer.id, isChecked: false });
		setCheck(false)
	}


	useEffect(() => {
		parentCheck ? check
			? null
			: (getChildCheck({ id: offer.id, isChecked: parentCheck }), setCheck(parentCheck))
			: check === false
				? null
				: allDataCheck?.length === 0
					? (getChildCheck({ id: offer.id, isChecked: parentCheck }), setCheck(parentCheck))
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
				onClick={(event) => {
					if (event.target.localName !== "button" && event.target.localName !== "input") {
						Router.push(`/product/${offer.id}`)
					}
				}}
			>
				<div>
					{offersLength > 1 && <div className={classes.offer__pub__check}>
						<Checkbox
							className={classes.check}
							color='primary'
							icon={<FiberManualRecordOutlinedIcon />}
							checkedIcon={<FiberManualRecordSharpIcon />}
							value={offer.id}
							onChange={(event) => {
								setCheck(event.target.checked);
								getChildCheck({ id: offer.id, isChecked: event.target.checked }); /* handleCheck(event.target.checked) */
							}}
							checked={check}
						/>
					</div>}
					<Image
						isWaith={isWaith}
						classes={classes}
						Router={Router}
						offer={offer}
						pushCheck={pushCheck}
					/>
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
								{isActive &&
								<p className={`${classes.main__text} ${classes.position__absolute}`}>
									Осталось {offer.best_before} {correctDays}
								</p>}
							</div>
						</div>
						<div className={classes.column}>
							<div className={`${classes.column} ${classes.end} ${classes.mobile__width} `}>
								<BtnActive
									isActive={isActive}
									classes={classes}
									Router={Router}
									offer={offer}
									pushCheck={pushCheck}
									offerID={offerID}
								/>
								{(isArchive || isWaith) && (
									<div>
										<BtnWite
											classes={classes}
											offer={offer}
											pushCheck={pushCheck}
											Router={Router}
											offerID={offerID}
										/>
									</div>
								)}
							</div>
							<ImgStatistic
								classes={classes}
								isActive={isActive}
								offer={offer}
							/>
						</div>
					</div>
					<div className={classes.bottom}>
						{isActive && (
							<button onClick={() => setPromotionModal(true)} className={classes.btn__upViews}>Увеличить просмотры</button>
						)}
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
			{/*<Dialog open={promotionModal} maxWidth='md' classes={{paper: classes.promotionModal}} onClose={() => setPromotionModal(false)}>*/}
			{/*	<PayPromotion postId={offer?.id} handleContinue={() => setPromotionModal(false)}/>*/}
			{/*</Dialog>*/}
			<CustomModalUI
				title='Новое объявление'
				open={promotionModal}
				maxWidth='md'
				customMobile='960'
				handleCloseModal={() => setPromotionModal(false)}
				classes={{paper: classes.promotionModal}}
			>
				<PayPromotion
					postId={offer?.id}
					handleContinue={() => setPromotionModal(false)}
				/>
			</CustomModalUI>
		</>
	)
}
