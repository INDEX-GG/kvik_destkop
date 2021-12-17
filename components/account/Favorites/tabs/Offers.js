import { useState, useEffect } from "react";
import { Checkbox, makeStyles } from "@material-ui/core";
import { FiberManualRecordOutlined, FiberManualRecordSharp } from "@material-ui/icons";
import { useStore } from "#lib/Context/Store";
import { checkArray } from "#lib/services";
import OfferFavorite from "#components/account/Favorites/card/offerFavorite"
import EmptyPlaceholder from "#components/EmptyPlaceholder"
import FavoritesOffersPlaceHolder from "#components/placeHolders/FavoritesPlaceHolder/FavoritesActiveOfffer/FavoritesOffersPlaceHolder";


const useStyles = makeStyles(() => ({
	delete: {
		fontSize: "16px !important",
	},
	deleteActiv: {
		color: "black",
	}
}));

/**
 * @typedef OfferData
 * @property {[]} itemsPost
 */

/**
 * @param {OfferData} data 
 */
const Offers = (data) => {
	const classes = useStyles();
	const [check, setCheck] = useState(false);
	const [deleteButton, setDeleteButton] = useState(false);
	const [dataCheck, setDataCheck] = useState([]);
	const { userInfo, setLikeCommentArray } = useStore();

	/**
	 * @param {{ isChecked: boolean, id: string }} childCheck 
	 */
	const getChildCheck = (childCheck) => {
		const someData = childCheck.isChecked
			? (prev) => [...prev, childCheck.id]
			: dataCheck => dataCheck.filter(item => item !== childCheck.id)
		setDataCheck(someData);
	}

	/**
	 * @param {[]} likeId 
	 */
	const getFavoritsUser = (likeId) => {
		let favoritesArray = [];
		likeId.map((items) => {
			let comment = checkArray(userInfo?.favorites) && (userInfo.favorites.filter(item => item.post_id === +items)[0])?.comment !== undefined ? (userInfo?.favorites.filter(item => item.post_id === +items)[0])?.comment : ''
			let like = checkArray(userInfo?.favorites) && userInfo.favorites.filter(item => item.post_id === +items).map(item => item.condition).join() === 'false'
			favoritesArray.push({
				post_id: `${items}`,
				comment: `${comment}`,
				condition: `${like}`,
			})
		})
		setLikeCommentArray(favoritesArray)
	}

	useEffect(() => {
		dataCheck.length > 0 
			? data.itemsPost.length === dataCheck.length 
				? setCheck(true) 
				: setCheck(false) 
			: null;
	}, [dataCheck])

	if (data.itemsPost?.length === 0 || data.itemsPost?.length === undefined) {
		return (
			<>
				{!userInfo 
					? <FavoritesOffersPlaceHolder />
					: <EmptyPlaceholder
						title='Здесь будут ваши избранные объявления'
						subtitle='Нажмите на  сердечко 💙️, чтобы добавить объявление в избранное'
						img='/accountImage/OffersNone.png'
						imgAlt='offers_placholder' />}
			</>
		);
	}

	return (

		<>
			{!userInfo 
				? <FavoritesOffersPlaceHolder />
				: <div className="clientPage__container_bottom">
					<div className="clientPage__container_nav__radio">
						<Checkbox
							color="primary"
							onChange={(event) => {
								setCheck(!check);
								event.target.checked ? null : setDataCheck([])
							}}
							checked={check}
							icon={<FiberManualRecordOutlined />}
							checkedIcon={<FiberManualRecordSharp />}
						/>
						<a
							onClick={() => dataCheck.length > 0 ? (getFavoritsUser(dataCheck), setDataCheck([]), setCheck(false), setDeleteButton(!deleteButton)) : null}
							style={dataCheck.length > 0 ? { color: "black" } : null}
							className={classes.delete}
						>
							Удалить
						</a>
					</div>
					<div className="clientPage__container_content">
						<div className="favoritesContainerWrapper">
							{data.itemsPost?.map((offer, index) =>
								<OfferFavorite
									offer={offer}
									key={index}
									i={index}
									parentCheck={check}
									getChildCheck={getChildCheck}
									dataCheck={dataCheck}
									deleteButton={deleteButton}
								/>
							)}
						</div>
					</div>
				</div>}
		</>

	);
}

export default Offers;