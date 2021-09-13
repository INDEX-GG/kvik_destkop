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
	const [check, setCheck] = useState(false)
	const [dataCheck, setDataCheck] = useState([])
	const [dataChecked, setDataChecked] = useState([])

	function filterDataCheck(data) {
		dataCheck.find
		setDataCheck(prev => [ ...prev, {
			id: data.offer.id,
			check: check,
		}])
	}
	function getChildCheck (newCheck) {
		newCheck.check ? setDataChecked(dataChecked => [...dataChecked, newCheck]) 
		:	
		setDataChecked(dataChecked => dataChecked.filter( item => item.id !== newCheck.id ));
	}
	useEffect(() => {
		console.log("---------dataCheck-----------",dataCheck.length);
		console.log("---------dataCheck-----------",dataCheck.length);
		/* dataCheck.length===dataChecked.length ? setCheck(true) : setCheck(false); */
		if(dataCheck.length > 0){
			dataCheck.length===dataChecked.length ? setCheck(true) : setCheck(false);
		}
	}, [dataChecked])

	console.log("---------check-----------",check);
	console.log("---------dataCheck-----------",dataCheck);
	console.log("---------dataChecked-----------",dataChecked);


	if (data.offers.length == 0) {
		return (
			<Placeholder />
		);
	}
	/* Модальное окно */
	function pushCheck() {
		setOpenUnpublishForm(!openUnpublishForm)
		handleUnpublishFormDialog()
	}

	
	
	

	return (
		<>
			<UnpublishCTX.Provider
				value={{
					fetcher: fetch,
					onError: (err) => {
						console.error(err)
					},
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
							onChange={(e) => { setCheck(e.target.checked)}}
							checked={check}
						/>
						<button className={classes.btn__unpublish} onClick={() => {pushCheck()}}>
							Снять с публикации
						</button>
					</div>
					<div className="clientPage__container_content">
						{data.offers?.map((offer, i) => {
							return (
								<OfferActive key={i} offer={offer} data={data} i={i}
									parentCheck={check} getChildCheck={getChildCheck}
									filterDataCheck={filterDataCheck} 
									
								/>
							);
						})}
					</div>
				</div>


				{<Dialog open={openUnpublishForm} onClose={() => setOpenUnpublishForm(!openUnpublishForm)} fullWidth maxWidth="md">
        <UnpublishForm Close={handleUnpublishFormDialog} />
      </Dialog> }
			</UnpublishCTX.Provider>
		</>
	);
}
export default Active;