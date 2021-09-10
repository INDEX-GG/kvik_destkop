import React, { useState } from "react";
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
	const [checkAll, setCheckAll] = useState(false)
	const [getDataChild,setGetDataChild] = useState([])
	const [dataCheck, setDataCheck] = useState([])
	const [fixedData, setFixedData] = useState([])
	
	const handleCheckAll = (e) => {
		setFixedData(JSON.parse(JSON.stringify(dataCheck)));
	 	setCheckAll(e)
	 	 if(!e){
	 	 	setGetDataChild([]);
	 	 }
	 }
	
	const addDataChild =  (newData) => {
		/* проверяю если ли уже этот элемент в массиве, когда нажимается выбрать все после того, как несколько элементов уже отмечены */
		if(getDataChild.length>0){
			let finded = getDataChild.find((item) => item.id===newData.id)
			typeof finded !== "undefined"? null : setGetDataChild(getDataChild => [...getDataChild, newData]) 
			
		}else{
			setGetDataChild(getDataChild => [...getDataChild, newData])
		}
	}
	const deleteDataChild = (newData) => {
		setGetDataChild(newData)
	}
	const getDataCheck = (newData) => {
	
		if(dataCheck.length>0 ){
			let CheckData = JSON.parse(JSON.stringify(dataCheck));
			let dataItem = dataCheck.find((item) => item.id === newData.id)
			dataItem.isCheck = newData.isCheck;
			CheckData[dataCheck.indexOf(dataItem)] = dataItem;
			setDataCheck(CheckData)
			if(typeof dataCheck.find( (item) => item.isCheck === false ) === "undefined"){
				
				setCheck(true);
				
			}else{
				setCheck(false);
			}
		}else{
			setDataCheck(dataCheck => [...dataCheck, newData])
		}
	}
	console.log("получаю массив нажатых кнопок", dataCheck)
	console.log(getDataChild, "данные из выбранных чекбоксов")
	/* console.log(checkChild, "кнопка нажата") */
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
					getDataChild,
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

							onChange={(e) => { setCheck(e.target.checked)
								handleCheckAll(e.target.checked);
							}}
							checked={check}

						/>
						<button className={classes.btn__unpublish} onClick={() => {pushCheck()
							console.log(getDataChild, "из кнопки снять с публикации")
							console.log(openUnpublishForm, "clicked?")}}>
							Снять с публикации
						</button>
					</div>
					<div className="clientPage__container_content">
						{data.offers?.map((offer, i) => {
							return (
								<OfferActive key={i} offer={offer} data={data} i={i} checkAll={checkAll} addDataChild={addDataChild} fixedData={fixedData}
									dataCheck={dataCheck} getDataChild={getDataChild} deleteDataChild={deleteDataChild} getDataCheck={getDataCheck}
									
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