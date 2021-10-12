import React, { useState, useEffect } from "react";
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import OfferModal from "../../../OfferModal";
import OfferArchive from "../card/offerArchive";
import { Checkbox, makeStyles, Dialog } from "@material-ui/core";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';


const useStyles = makeStyles((theme) => ({
	check: {
		padding: "0px",
		background: theme.palette.secondary.main,
		width: "14px",
		height: "14px",

		"&:hover": {
			background: theme.palette.secondary.main,
		},
	},
	btn__delete: {
		marginLeft: "12px",
		background: "none",
		color: theme.palette.grey[200],
		cursor: "pointer",
		transition: "all 200ms ease-in-out",

		"&:hover": {
			transition: "all 200ms ease-in-out",
			textDecoration: "underline",
		},
	},
	btn__publish: {
		marginLeft: "12px",
		background: "none",
		color: theme.palette.grey[200],
		cursor: "pointer",
		transition: "all 200ms ease-in-out",

		"&:hover": {
			transition: "all 200ms ease-in-out",
			textDecoration: "underline",
		},
	}
}));

function Archive({offers}) {
	const classes = useStyles();

	const [openOfferModal, setOpenOfferModal] = useState(false);
	const [check, setCheck] = useState(false);
	const [offerId, setOfferId] = useState([]);
	const [offerData, setOfferData] = useState([]);
	const [buttonId, setButtonId] = useState('');
	const offersLength = offers.length

	const cleanAll = () => {
		setCheck(false);
		setOfferId([]);
		setOfferData([]);
	}

	function getChildCheck ({id, isCheck}) {
		setOfferId( isCheck ? prev => [...prev, id] : prev => prev.filter( item => item !== id) );
		setOfferData( isCheck ? prev => [...prev, offers.filter( item => item.id === id )[0]] : prev => prev.filter( item => item.id !== id) );
	}

	useEffect( () => {
		offerId.length === offers.length ? check ? null : setCheck(true) : check===false ? null : setCheck(false)
	}, [offerId]);

	if (offers.length == 0) {
		return (
			<EmptyPlaceholder
				title='Здесь будут ваши законченные объявления'
				subtitle='Текст'
			/>
		);
	}

	/* Модальное окно */
	function pushCheck(e) {
		setButtonId(e.target.id)
		setOpenOfferModal(!openOfferModal);
	}

	return (
		<>
			<div className="clientPage__container_bottom">
				{offers.length > 1 && <div className="clientPage__container_nav__radio">
					<Checkbox
						className={classes.check}
						color="primary"
						value=""
						icon={<FiberManualRecordOutlinedIcon/>}
						checkedIcon={<FiberManualRecordSharpIcon/>}
						onChange={(e) => {
							e.target.checked === false ? cleanAll() : setCheck(e.target.checked);
						}}
						checked={check}
					/>
					<button id='001' className={classes.btn__publish} onClick={(e) => {
						offerData.length > 0 ? pushCheck(e) : null
					}}>
						Активировать
					</button>
					<button id='002' className={classes.btn__delete} onClick={(e) => {
						offerData.length > 0 ? pushCheck(e) : null
					}}>
						Удалить
					</button>
				</div>}
				<div className="clientPage__container_content">
					{offers?.map((offer, i) => {
						return (
							<OfferArchive
								key={i}
								offer={offer}
								parentCheck={check}
								getChildCheck={getChildCheck}
								parentOpenDelActiveForm={openOfferModal}
								allOfferId={offerId}
								offersLength={offersLength}
							/>
						);
					})}
				</div>
			</div>
			<Dialog open={openOfferModal} onClose={() => setOpenOfferModal(!openOfferModal)} fullWidth maxWidth="md">
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
	);
}
export default Archive;
