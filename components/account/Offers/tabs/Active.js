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

function Active({offers}) {
	const classes = useStyles();

	const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
	const [check, setCheck] = useState(false);
	const [dataCheck, setDataCheck] = useState([]);
	const [offerData, setOfferData] = useState([]);
	
	const cleanAll = () =>  {
		setCheck(false);
		setDataCheck([]);
		setOfferData([]);
	}
	
	function getChildCheck ({id, isChecked}) {
		setDataCheck( isChecked ? prev => [...prev, id] : prev => prev.filter( item => item !== id) );
		setOfferData( isChecked ? prev => [...prev, offers.filter( item => item.id === id )[0]] : prev => prev.filter( item => item.id !== id) );
	}

	useEffect(() => {
		dataCheck.length > 0 ? dataCheck.length===offers.length ? setCheck(true) : setCheck(false) : null;
	}, [dataCheck])

	console.log("---------check-----------",check);
	console.log("---------dataCheck-----------",dataCheck);
	console.log("---------offerData-----------", offerData);
	console.log("---------openUnpublishForm-----------", openUnpublishForm);
	console.log("---------offers-----------", offers); 

	if (offers.length == 0) {
		return (
			<Placeholder />
		);
	}
	
	return (
		<UnpublishCTX.Provider
			value={{
				fetcher: fetch,
				onError: (err) => {
					console.error(err)
				},
				dataCheck,
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
							e.target.checked===false ? cleanAll() : setCheck(e.target.checked);
						}}
						checked={check}
					/>
					<button className={classes.btn__unpublish} onClick={() => {offerData.length > 0 ? setOpenUnpublishForm(!openUnpublishForm) : null}}>
						Снять с публикации
					</button>
				</div>
				<div className="clientPage__container_content">
					{offers?.map((offer, i) => {
						return (
							<OfferActive key={i} offer={offer} i={i}
								parentCheck={check} getChildCheck={getChildCheck} openUnpublishForm={openUnpublishForm}
								dataCheck={dataCheck} cleanAll={cleanAll}
							/>
						);
					})}
				</div>
			</div>
			{<Dialog open={openUnpublishForm} onClose={() => setOpenUnpublishForm(!openUnpublishForm)} fullWidth maxWidth="md">
				<UnpublishForm /* Close={handleUnpublishFormDialog} для чего это? */ />
			</Dialog> }
		</UnpublishCTX.Provider>
	);
}
export default Active;