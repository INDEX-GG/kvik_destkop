import React, { useState, useEffect } from "react";
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import OfferModal from "../../../OfferModal";
import OfferArchive from "../card/offerArchive";
import { useOfferAccount } from "../../../../lib/Context/OfferAccountCTX";
import { Checkbox, makeStyles, Dialog  } from "@material-ui/core";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import OfferWaitPlaceHolder from "../../../placeHolders/OfferPlaceHolder/OfferWaitPlaceHolder/OfferWaitPlaceHolder";
import {Box, Grid} from "@mui/material";
import ArchiveIco from "./ArchiveIco/ArchiveIco";

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
	},
	archive: {
		display: "flex",
		justifyContent: "center",
	},
	text: {
		fontSize: "18px"
	},
}));

/**
 * @typedef ArchiveProps
 * @property {any[]} offers
 */

/**
 * @param {ArchiveProps} props
 */
function Archive({offers}) {
	const classes = useStyles();
	const { page, setPage, totalPosts, page_limit } = useOfferAccount()
	const [isFirstRender, setIsFirstRender] = useState(true)
	const [openOfferModal, setOpenOfferModal] = useState(false);
	const [check, setCheck] = useState(false);
	const [offerId, setOfferId] = useState([]);
	const [offerData, setOfferData] = useState([]);
	const [buttonId, setButtonId] = useState('');
	const offersLength = offers.length


	useEffect(()=> {
		if(isFirstRender) {
			setIsFirstRender(false)
			return
		}
        document.addEventListener('scroll', scrollHandler )
        return ()=>{
            document.removeEventListener('scroll', scrollHandler )
        }
    }, [totalPosts, isFirstRender] )

  // pageNumber - переменная для сохранения значения. (сделана из-за того, что для функции scrollHandler page всегда равна первому значению)
	let pageNumber = page
	function scrollHandler (e) {
    // высчитываем высоту отступа между скролом и низом страницы
		const pixelsFromBottom = (e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop)-window.innerHeight;
		const maxPossiblePage = Math.ceil(totalPosts.archive / page_limit);
		if(maxPossiblePage <= pageNumber && !isFirstRender) {
			return
		}
		// если находится нужная нам высота, обновляем страницу для повторого запроса.
		if(pixelsFromBottom <= 200){
			setPage(pageNumber + 1)
			pageNumber += 1
		}
	}










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
		offerId.length === offers.length
			? check
				? null
				// : setCheck(true)
				: null
			: check===false
				? null
				: setCheck(false)
	}, [offerId]);

	if (offers.length === 0) {
		return (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						{!offers
							? <OfferWaitPlaceHolder/>
							: <EmptyPlaceholder
								title='Здесь будет ваш архив объявлений'
								subtitle=''
								className={classes.text}
							/>
						}
					</Grid>
					<Grid item xs={12}>
						<Box className={classes.archive}>
							<ArchiveIco />
						</Box>
					</Grid>
				</Grid>


			</>
		);
	}


	/* Модальное окно */
	function pushCheck(e) {
		setButtonId(e.target.id)
		setOpenOfferModal(!openOfferModal);
	}

	return (
		<>
			{!offers
			?
			<OfferWaitPlaceHolder/>
			:
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
					{/* пока что закоментировано так как активировать можно только по-одному объявлению */}
					{/* <button id='001' className={classes.btn__publish} onClick={(e) => {
						offerData.length > 0 ? pushCheck(e) : null
					}}>
						Активировать
					</button> */}
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
					{/* <button
						style={{width: '100px', height: '30px', backgroundColor: 'cyan', margin: '0 auto', display: 'block'}}
						onClick={()=> {
							const maxPossiblePage = Math.ceil(totalPosts.archive / page_limit);
							if(maxPossiblePage <= page) {
								return
							}
							setPage(page + 1)
						}}
						>
						test
					</button> */}
			</div>}
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
