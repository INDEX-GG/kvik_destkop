import React, { useState } from "react";
import { Checkbox, makeStyles } from "@material-ui/core";
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

	// function setCheck(e) {
	//   if (e.target.value === '' && mainArr.length === 0) {
	//     console.log('добавляет все')
	//     mainArr = qwe
	//   } else if (e.target.value === '' && mainArr.length !== 0) {
	//     console.log('удаляет все')
	//     mainArr = []
	//   } else if (mainArr.includes(+e.target.value)) {
	//     mainArr = mainArr.filter((item) => { return item !== +e.target.value })
	//   } else {
	//     mainArr.push(+e.target.b)
	//   }

	//   setMainArr()
	// }

	// function setMainArr() {
	//   console.log('после ==============>', mainArr)
	// }


	const [check, setCheck] = useState(false)
	const [checkValue, setcheckValue] = useState()
	const [checkAll, setCheckAll] = useState(false)

	const handleCheckAll = e => {
		setCheck(e.target.checked)
		setcheckValue(e.target.value)
		setCheckAll(e.target.checked)
	}

	if (data.offers.length == 0) {
		return (
			<Placeholder/>
		);
	}

	return (
		<>
			<UnpublishCTX.Provider >
				<div className="clientPage__container_bottom">
					<div className="clientPage__container_nav__radio">
						<Checkbox
							className={classes.check}
							color="primary"
							value=""
							icon={<FiberManualRecordOutlinedIcon />}
							checkedIcon={<FiberManualRecordSharpIcon />}

							onChange={(e) => handleCheckAll(e)}
							checked={check}

						/>
						<button className={classes.btn__unpublish} onClick={(e) => console.log(e)}>
							Снять с публикации
						</button>
					</div>
					<div className="clientPage__container_content">
						{data.offers?.map((offer, i) => {
							return (
								<OfferActive key={i} offer={offer} data={data} i={i} checkAll={checkAll} checkValue={checkValue} />
							);
						})}
					</div>
				</div>


				{/* <Dialog open={openUnpublishForm} onClose={() => setOpenUnpublishForm(!openUnpublishForm)} fullWidth maxWidth="md">
        <UnpublishForm Close={handleUnpublishFormDialog} />
      </Dialog>  */}
			</UnpublishCTX.Provider>
		</>
	);
}
export default Active;