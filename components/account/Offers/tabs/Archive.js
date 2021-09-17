import React, { useState, useEffect } from "react";
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import { DelActiveCTX } from "../../../../lib/Context/DialogCTX";
import DelActiveForm from "../../../DelActiveForm";
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

function Archive(data) {
	const classes = useStyles();

	const [openDelActiveForm, setOpenDelActiveForm] = useState(false);
	const [check, setCheck] = useState(false)
	const [dataCheck, setDataCheck] = useState([])
	const [dataChecked, setDataChecked] = useState([])
	const [offerId, setOfferId] = useState([]);
	const [offerData, setOfferData] = useState([]);
	const [battonId, setBattonId] = useState('');

	const handleDelActiveFormDialog = () => setOpenDelActiveForm(!openDelActiveForm);

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

	// если модалка не открыта то затирать id выбранных оферров
	useEffect(() => {
		openDelActiveForm ? null : setOfferId([])
	}, [openDelActiveForm])

	console.log('Что-то выделено ?');
	console.log("---------check-----------", check);
	console.log("---------dataCheck-----------", dataCheck);
	console.log("---------dataChecked--Нас-Чекнули--------", dataChecked);
	console.log("---------offer---Меня--чекнули-Первым-------", offerData[0]);
	console.log("---------offer---нас всех чекнули-------", offerData);
	console.log("---------offerId-----------", offerId);

	if (data.offers.length == 0) {
		return (
			<EmptyPlaceholder
				title='Здесь будут ваши законченные объявления'
				subtitle='Текст'
			/>
		);
	}

	/* Модальное окно */

	// достаем из чекнутых офферов id и кладем в массив offerId
	function pushCheck(e) {
		dataChecked.map((item) => {
			console.log(item)
			setOfferId(prev => [...prev, item.id])
		})
		setBattonId(e.target.id)
		// console.error(e);
		// console.error('ID - BATTON ====>',e.target.id);
		handleDelActiveFormDialog()
	}

	return (

		<>
			<DelActiveCTX.Provider
				value={{
					fetcher: fetch,
					onError: (err) => {
						console.error(err)
					},
					battonId,
					offerId,
					offerData,
					openDelActiveForm,
					setOpenDelActiveForm,
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

						<button id='001' className={classes.btn__publish} onClick={(e) => { offerData.length > 0 ? pushCheck(e) : null }}>
							Активировать
						</button>
						<button id='002' className={classes.btn__delete} onClick={(e) => { offerData.length > 0 ? pushCheck(e) : null }}>
							Удалить
						</button>
					</div>
					<div className="clientPage__container_content">
						{data.offers?.map((offer, i) => {
							return (
								<OfferArchive key={i} offer={offer} data={data} i={i}
									parentCheck={check} getChildCheck={getChildCheck} openDelActiveForm={openDelActiveForm}
									filterDataCheck={filterDataCheck} dataChecked={dataChecked}
								/>
							);
						})}
					</div>
				</div>
				{<Dialog open={openDelActiveForm} onClose={() => setOpenDelActiveForm(!openDelActiveForm)} fullWidth maxWidth="md">
					<DelActiveForm Close={handleDelActiveFormDialog} />
				</Dialog>}
			</DelActiveCTX.Provider>
		</>

	);
}
export default Archive;
