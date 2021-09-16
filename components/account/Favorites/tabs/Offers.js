import React, { useState,useEffect} from "react";
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import { Checkbox } from "@material-ui/core";
import OfferFavorite from "../card/offerFavorite";
import { useStore } from "../../../../lib/Context/Store";
import {checkArray} from '../../../../lib/services'
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles ( () => ({
	delete: {
		fontSize: "16px !important",
	},
	deleteActiv: {
		color: "black",
	}
}));


function Offers(data) {
	const classes = useStyles();
	const [check, setCheck] = useState(false);
	const [deleteButton, setDeleteButton] = useState(false);
	const [dataCheck, setDataCheck] = useState([]);
	const { /* setLikeComment ,*/ userInfo, setLikeCommentArray } = useStore();

	function getChildCheck(childCheck) {
		setDataCheck(childCheck.isChecked ? prev => [...prev, childCheck.id] : dataCheck => dataCheck.filter( item => item !== childCheck.id ));
	}
	
	const getFavoritsUser = (likeId) => {
		let favoritesArray = [];
        likeId.map( (items) => {
			let comment = checkArray(userInfo?.favorites) && (userInfo.favorites.filter(item => item.post_id === +items)[0])?.comment !== undefined ? (userInfo?.favorites.filter(item => item.post_id === +items)[0])?.comment : ''
        	let like = checkArray(userInfo?.favorites) && userInfo.favorites.filter(item => item.post_id === +items).map(item => item.condition).join() === 'false' ? true : false
        	favoritesArray.push({
				id: items,
				comment: comment,
				like: like,
			})
			//setLikeComment(+items, comment, like)
		})
		setLikeCommentArray(favoritesArray)
		console.log("========favoritesArray========>", favoritesArray)
    }
	
	useEffect(() => {
		dataCheck.length > 0 ? data.itemsPost.length===dataCheck.length ? setCheck(true) : setCheck(false) : null;
	}, [dataCheck])

	if (data.itemsPost?.length === 0 || data.itemsPost?.length === undefined) {
		return (
			<EmptyPlaceholder
				title='Добавьте объявление в избранное, чтобы не потерять'
				subtitle='Нажмите на соответствующую кнопку (на кнопку добавления, на сердечко, на 💙️), чтобы добавить объявление в избранное'
			/>
		);
	}
	
	console.log("data=========>", data.itemsPost)
	console.log("dataCount=========>", data.itemsPost.length)
	console.log("checkboxCount=========>", dataCheck)
	console.log("checkboxCount=========>", check) 

	return (
		<div className="clientPage__container_bottom">
			<div className="clientPage__container_nav__radio">
				<Checkbox
					color="primary"
					onChange={(event) =>{ setCheck(!check); event.target.checked ? null : setDataCheck([])}}
					checked={check}
				/>
				<a 	
					onClick={ () =>	dataCheck.length > 0 ? (getFavoritsUser(dataCheck), setDataCheck([]), setCheck(false), setDeleteButton(!deleteButton)) : null } 
					style={dataCheck.length > 0 ? {color: "black"} : null } 
					className={classes.delete}
				>
					Удалить
				</a>
			</div>
			<div className="clientPage__container_content">
				<div className="favoritesContainerWrapper">
					{data.itemsPost?.map((offer, i) =>
						<OfferFavorite 
							offer={offer} 
							key={i} 
							i={i}
							parentCheck={check} 
							getChildCheck={getChildCheck} 
							dataCheck={dataCheck}
							deleteButton={deleteButton}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Offers;