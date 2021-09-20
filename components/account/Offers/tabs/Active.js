import React, { useState, useEffect } from "react";
import { Checkbox, makeStyles, Dialog } from "@material-ui/core";
import UnpublishForm from "../../../UnpublishForm";
// import AddRounded from "@material-ui/icons/AddRounded";
// import Router from "next/router";
import { UnpublishCTX } from "../../../../lib/Context/DialogCTX";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import OfferActive from "../card/offerActive";
import Placeholder from "./Placeholder";

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
	btn__unpublish: {
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
}));

function Active(data) {
	const classes = useStyles();

	const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
	const handleUnpublishFormDialog = () => setOpenUnpublishForm(!openUnpublishForm);
	const [check, setCheck] = useState(false);
	const [dataCheck, setDataCheck] = useState([]);
	const [dataChecked, setDataChecked] = useState([]);
	const [offerId, setOfferId] = useState([]);
	const [offerData, setOfferData] = useState([]);

	function cleanAll() {
		setCheck(false);
		setDataCheck([]);
		setDataChecked([]);
		setOfferId([]);
		setOfferData([]);
	}
	function filterDataCheck(data) {
		dataCheck.length > 0 ?
			dataCheck.filter((item) => {
				item.id === data.id
			}) ? null : setDataCheck(prev => [...prev, {
				id: data.id,
				check: check,
			}])
			:
			setDataCheck(prev => [...prev, {
				id: data.id,
				check: check,
			}])
	}
	function getChildCheck(newCheck, newOffer) {
		newCheck.check ? (
			setDataChecked(dataChecked => [...dataChecked, newCheck]),
			setOfferData(offer => [...offer, newOffer])
		)
			:
			(
				setDataChecked(dataChecked => dataChecked.filter(item => item.id !== newCheck.id)),
				setOfferData(offer => offer.filter(item => item.id !== newCheck.id))
			)
	}
	useEffect(() => {
		if (dataCheck.length > 0) {
			dataCheck.length === dataChecked.length ? setCheck(true) : setCheck(false);
		}
	}, [dataChecked])

	useEffect(() => {
		openUnpublishForm ? null : setOfferId([])
	}, [openUnpublishForm])

	console.log('Что-то выделено ?');
	// console.log("---------dataCheck-----------", dataCheck);
	console.log("---------dataChecked--Нас-Чекнули--------", dataChecked);
	console.log("---------offer---Меня--чекнули-Первым-------", offerData[0]);
	console.log("---------offerId--- Unpablish--------", offerId);


	if (data.offers.length == 0) {
		return (
			<Placeholder />
		);
	}
	/* Модальное окно */

	function pushCheck() {
		dataChecked.map((item) => {
			setOfferId(prev => [...prev, item.id])
		})
		handleUnpublishFormDialog()
	}

	// console.log(openUnpublishForm, "UnpublishForm open/close")


	return (
		<>
			<UnpublishCTX.Provider
				value={{
					fetcher: fetch,
					onError: (err) => {
						console.error(err)
					},
					offerId,
					offerData,
					openUnpublishForm,
					setOpenUnpublishForm,
					cleanAll
				}}
			>
				<div className="clientPage__container_bottom">
					<div className="clientPage__container_nav__radio">
						<Checkbox
							className={classes.check}
							color="primary"
							value=""
							icon={<FiberManualRecordOutlinedIcon />}
							checkedIcon={<FiberManualRecordSharpIcon />}
							onChange={(e) => {
								setCheck(e.target.checked);
								e.target.checked === false ? setDataChecked([]) : null;
							}}
							checked={check}
						/>
						<button className={classes.btn__unpublish} onClick={() => { offerData.length > 0 ? pushCheck() : null }}>
							Снять с публикации
						</button>
					</div>
					<div className="clientPage__container_content">
						{data.offers?.map((offer, i) => {
							return (
								<OfferActive key={i} offer={offer} i={i}
									parentCheck={check} getChildCheck={getChildCheck} openUnpublishForm={openUnpublishForm}
									filterDataCheck={filterDataCheck} dataChecked={dataChecked}
								/>
							);
						})}
					</div>
				</div>
				{<Dialog open={openUnpublishForm} onClose={() => setOpenUnpublishForm(!openUnpublishForm)} fullWidth maxWidth="md">
					<UnpublishForm Close={handleUnpublishFormDialog} />
				</Dialog>}
			</UnpublishCTX.Provider>
		</>
	);
}
export default Active;