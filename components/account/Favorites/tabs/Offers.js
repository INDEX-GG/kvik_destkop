import React, { useState, useRef } from "react";
import { ToRubles, ToRusDate } from "../../../../lib/services";
import { useStore } from "../../../../lib/Context/Store";
import Favorits from '../../../../UI/Favorits';
import { BASE_URL, STATIC_URL } from "../../../../lib/constants";
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import { makeStyles, Checkbox } from "@material-ui/core";

const useStyles = makeStyles ( () => ({
	check: {
		position: "absolute",
	},
}));

function Offers(data) {
	const classes = useStyles();
	const [check, setCheck] = useState(false);
	const { setLikeComment } = useStore()
	const ref = useRef()
	function deleteNote(e) {
		e.target.innerHTML = '';
		let like = true;
		let comment = '';
		setLikeComment(+e.target.id, comment, like)
	}
	if (data.itemsPost?.length === 0 || data.itemsPost?.length === undefined) {
		return (
			<EmptyPlaceholder
			title='Добавьте объявление в избранное, чтобы не потерять'
			subtitle='Нажмите на соответствующую кнопку (на кнопку добавления, на сердечко, на 💙️), чтобы добавить объявление в избранное'/>
		);
	}
	console.log("ref=========>", ref)
	return (
		<div className="clientPage__container_bottom">
			<div className="clientPage__container_nav__radio">
				<Checkbox
					color="primary"
					onChange={(e) =>{ setCheck(!check) 
						ref.current.checked = e.target.checked
					}}
					checked={check}
				/>
				<a>Удалить</a>
			</div>
			<div className="clientPage__container_content">
				<div className="favoritesContainerWrapper">
					{data.itemsPost?.map((offer, i) =>
						<a key={i} href={`/product/${offer.id}`}  className="favoritesContainer boxWrapper">
							<div className="favoritesImage">
								<div className="favoritesPubCheck">
								<Checkbox
									className={classes.check}
									color="primary"
									inputRef={ref}
								/>
								</div>
								<a className="favoritesCompare"></a>
								<a href="javascript:void(0);" ><Favorits favId={offer.id} isAccountCard /></a>
									 <img key={i} src={`${STATIC_URL}/${JSON.parse(offer.photo)?.photos[0]}`}onError={e => e.target.src = `${BASE_URL}/icons/photocard_placeholder.svg`} />
								{offer.user_blocked &&
									<div className="favoritesCause megaLight">Пользователь заблокирован</div>
								}
							</div>
							<div className="favoritesDescription">
								<a href={`/user/${offer.user_id}`} className="favoritesUserBlock small">
									<div>
										<div className='favoritesDescriptionUserName'>{offer.user_name}</div>
										<div className="favoritesDatPub light DatPub__mobile">
											{" "}
											{ToRusDate(offer.created_at)}
										</div>
									</div>
									<img className="favoritesUserpic" src={`${STATIC_URL}/${offer.user_photo}`} onError={e => e.target.src = `${BASE_URL}/icons/photocard_placeholder.svg`}/>
								</a>
								<div className="favoritesMiddle">
									<div>{ToRubles(offer.price)}</div>
									<div>{offer.title}</div>
									<div className="thin small light">{offer.address}</div>
								</div>
								<a  id={offer.id} onClick={(e) => deleteNote(e)} className="favoritesNote">{offer.comment}</a>
								<a className="favoritesButton buttonGrey small">Сообщить об изменении цены</a>
							</div>
						</a>
					)}
				</div>
			</div>
		</div>
	);
}

export default Offers;