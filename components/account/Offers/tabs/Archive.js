import React, { useState, useEffect } from "react";
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import { Checkbox, makeStyles } from "@material-ui/core";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import OfferArchive from "../card/offerArchive";


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

function Archive(data) {
	const classes = useStyles();
	
	if (data.offers.lenght == 0) {
		return (
			<EmptyPlaceholder
				title='Здесь будут ваши законченные объявления'
				subtitle='Текст'
			/>
		);
	}
	
	const [check, setCheck] = useState(false)
	const [dataCheck, setDataCheck] = useState([])
	const [dataChecked, setDataChecked] = useState([])

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

	function getChildCheck(newCheck) {
		newCheck.check ? setDataChecked(dataChecked => [...dataChecked, newCheck])
			:
			setDataChecked(dataChecked => dataChecked.filter(item => item.id !== newCheck.id));
	}

	

	useEffect(() => {
		if (dataCheck.length > 0) {
			dataCheck.length === dataChecked.length ? setCheck(true) : setCheck(false);
		}
	}, [dataChecked])

	

	console.log("---------check-----------", check);
	console.log("---------dataCheck-----------", dataCheck);
	console.log("---------dataChecked-----------", dataChecked);

	return (
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


				<a>Активировать</a>
				<a>Удалить</a>
			</div>
			<div className="clientPage__container_content">
				{data.offers?.map((offer, i) => {
					return (
						<OfferArchive  key={i} offer={offer} data={data} i={i}
						parentCheck={check} getChildCheck={getChildCheck}
						filterDataCheck={filterDataCheck} dataChecked={dataChecked}
						/>
					);
				})}
			</div>
		</div>
	);
}
export default Archive;
