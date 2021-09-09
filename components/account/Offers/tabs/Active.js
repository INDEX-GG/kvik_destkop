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
	const [checkValue, setcheckValue] = useState()
	const [checkAll, setCheckAll] = useState(false)
	const [getDataChild,setGetDataChild] = useState([])
	/* const [checkChild, setCheckChild] = useState(false) Убрать этот сдеать общий */
	const [dataCheck, setDataCheck] = useState([])
	
	const handleCheckAll = (e) => {
		setCheck(e)
		/*setcheckValue(e.target.value)*/
		setCheckAll(e)
		if(!e){
			setGetDataChild([]) 
		}
		/* if(dataCheck.length>0){
			let allCheck = [];
			dataCheck.map( (item) => {
				
					allCheck.push(
						{
							id: item.id,
							isCheck: true,
						}
					);
			});
			setDataCheck(JSON.parse(JSON.stringify(allCheck)))
			console.log(allCheck, "sdfdshjfhdsjkfhdjkshfdksjhfk")
		} */
		
		console.log("проверка как меняется стейт ", dataCheck)
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
			let CheckData = [];
			CheckData = JSON.parse(JSON.stringify(dataCheck));
			let dataItem = dataCheck.find((item) => item.id === newData.id)
			newData.isCheck===true? dataItem.isCheck=true : dataItem.isCheck=false;
			let index = dataCheck.indexOf(dataItem);
			CheckData[index] = dataItem;
			setDataCheck(CheckData)
			if(typeof dataCheck.find( (item) => item.isCheck === false ) === "undefined"){
				setCheck(true)
			}else{
				setCheck(false)
			}
		}else/*(check || childCheck)*/{
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

							onChange={(e) => {
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
								<OfferActive key={i} offer={offer} data={data} i={i} checkAll={checkAll} checkValue={checkValue} 
								addDataChild={addDataChild}
								getDataChild={getDataChild}
								/* setCheckChild={setCheckChild} */
								deleteDataChild={deleteDataChild}
								getDataCheck={getDataCheck}
								/>
							);
						})}
					</div>
				</div>


				{<Dialog open={openUnpublishForm} onClose={() => 	setOpenUnpublishForm(!openUnpublishForm)} fullWidth maxWidth="md">
        <UnpublishForm Close={handleUnpublishFormDialog} />
      </Dialog> }
			</UnpublishCTX.Provider>
		</>
	);
}
export default Active;