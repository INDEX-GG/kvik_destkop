import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { BASE_URL} from '../../../../lib/constants';
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import { DeleteCTX } from "../../../../lib/Context/DialogCTX";
// import { useOfferAccount } from '../../../../lib/Context/OfferAccountCTX';
import DeleteForm from "../../../DeleteForm";
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
	const [openDeleteForm, setOpenDeleteForm] = useState(false);
	const [check, setCheck] = useState(false)
	const [dataCheck, setDataCheck] = useState([])
	const [dataChecked, setDataChecked] = useState([])
	const [offerId, setOfferId] = useState([]);
	const [offerData, setOfferData] = useState([]);
	const [battonId, setBattonId] = useState('');
	// const [offerWithDeleteFormId, setOfferWithDeleteFormId] = useState([]);


	const handleDeleteFormDialog = () => setOpenDeleteForm(!openDeleteForm);

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
		openDeleteForm ? null : setOfferId([])
	}, [openDeleteForm])



	console.log('Что-то выделено ?');
	console.log("---------check-----------", check);
	console.log("---------dataCheck-----------", dataCheck);
	console.log("---------dataChecked--Нас-Чекнули--------", dataChecked);
	console.log("---------offer---Меня--чекнули-Первым-------", offerData[0]);
	console.log("---------offer---нас всех чекнули-------", offerData);
	console.log("---------offerId-----------", offerId);
	// console.log("---------OfferWithDeleteFormId-----------", offerWithDeleteFormId);


	if (data.offers.length == 0) {
		return (
			<EmptyPlaceholder
				title='Здесь будут ваши законченные объявления'
				subtitle='Текст'
			/>
		);
	}

	/* Модальное окно */


	// function PushBDVerify([offerWithDeleteFormId]) {
	// 	console.warn('приходит в запрос', [offerWithDeleteFormId]);
	// 	var arr = { 'id': [offerWithDeleteFormId], 'verify': '0' }
	// 	console.error('Archive-click-arr', arr);
	// 	axios.post(`${BASE_URL}/api/verifyActive`, arr)
	// 	.then(r => r.data)
	// 	.finally(function () {

	// 	})
	// }


	// достаем из чекнутых офферов id и кладем в массив offerId
	function pushCheck(e) {
		dataChecked.map((item) => {
			console.log(item)
			setOfferId(prev => [...prev, item.id])
		})
		setBattonId(e.target.id)
		console.error(e);
		console.error('ID - BATTON ====>',e.target.id);
		console.log(battonId)
		handleDeleteFormDialog()
	}


	// useEffect(()=>{},[])

	// function addOfferWithDeleteFormId() {
	// 	dataChecked.map((item) => {
	// 		console.log(item)
	// 		setOfferWithDeleteFormId(prev => [...prev, item.id])
	// 	})
	// 	PushBDVerify([offerWithDeleteFormId])
	// }

	return (

		<>
			<DeleteCTX.Provider
				value={{
					fetcher: fetch,
					onError: (err) => {
						console.error(err)
					},
					battonId,
					offerId,
					offerData,
					openDeleteForm,
					setOpenDeleteForm,
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

						<button id='001' className={classes.btn__publish}  onClick={(e) => { offerData.length > 0 ? pushCheck(e) : null }}>
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
									parentCheck={check} getChildCheck={getChildCheck}
									filterDataCheck={filterDataCheck} dataChecked={dataChecked}
								/>
							);
						})}
					</div>
				</div>
				{<Dialog open={openDeleteForm} onClose={() => setOpenDeleteForm(!openDeleteForm)} fullWidth maxWidth="md">
					<DeleteForm Close={handleDeleteFormDialog} />
				</Dialog>}
			</DeleteCTX.Provider>
		</>

	);
}
export default Archive;
