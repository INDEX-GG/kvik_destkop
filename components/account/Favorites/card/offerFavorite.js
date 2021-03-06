import { Checkbox, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Favorits from '../../../../UI/Favorits';
import { BASE_URL, STATIC_URL } from "../../../../lib/constants";
import { ToRubles, ToRusDate } from "../../../../lib/services";
import { useStore } from "../../../../lib/Context/Store";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import { InternalLink } from '../../../links/InternalLink';

InternalLink
const useStyles = makeStyles(() => ({
	check: {
		position: "absolute",
	},
	toolTip: {
		fontSize: "14px",
	},
	favImage: {
	},
	cardLink: {
		width: "100%",
		height: "100%"
	},
	cardImage: {
		userSelect: "none",
		maxHeight: "100%",
		minWidth: "100%",
		objectFit: "cover",
		objectPosition: "center",
		borderRadius: "10px",
	}
}));

/**
 * @param {object} props
 * @param {number} props.index
 * @param {import('../tabs/Offers').ItemPost} props.offer
 * @param {boolean} props.parentCheck
 * @param {import('../tabs/Offers').GetChildCheck} props.getChildCheck
 * @param {[]} props.dataCheck
 * @param {boolean} props.deleteButton
 */
const OfferFavorite = ({ index, offer, parentCheck, getChildCheck, dataCheck, deleteButton }) => {
	const [check, setCheck] = useState(false);
	const classes = useStyles();
	const { setLikeComment } = useStore();

	/**
	 * @param {Event} event
	 */
	function deleteNote(event) {
		event.target.innerHTML = '';
		let like = true;
		let comment = '';
		setLikeComment(+event.target.id, comment, like)
	}

	useEffect(() => {
		parentCheck
			? check
				? null
				: (
					getChildCheck({ isChecked: parentCheck, id: offer.id }),
					setCheck(parentCheck)
				)
			: check === false
				? null
				: dataCheck.length === 0
					? (
						getChildCheck({ isChecked: parentCheck, id: offer.id }), setCheck(parentCheck)
					)
					: null
	}, [parentCheck, deleteButton]);


	return (
		<a key={index} className="favoritesContainer boxWrapper">
			<div className="favoritesImage">
				<div className="favoritesPubCheck">
					<Checkbox
						className={classes.check}
						color="primary"
						onChange={(event) => { setCheck(!check); getChildCheck({ isChecked: event.target.checked, id: offer.id }) }}
						checked={check}
						icon={<FiberManualRecordOutlinedIcon />}
						checkedIcon={<FiberManualRecordSharpIcon />}
					/>
				</div>
				<InternalLink
					href={{
						pathname: "/productOld/[id]",
						query: { id: offer.id}
					}}
					className={classes.cardLink}
				>
					{/*<a className="favoritesCompare">*/}
					{/*</a>*/}
					<a href="javascript:void(0);">
						<Favorits idOffer={offer.id} isAccountCard />
					</a>
					<img
						key={index}
						className={classes.cardImage}
						src={`${STATIC_URL}/${JSON.parse(offer.photo)?.photos[0]}`}
						onError={e => e.target.src = `${BASE_URL}/icons/photocard_placeholder.svg`}
					/>
					{offer.user_blocked && <div className="favoritesCause megaLight">???????????????????????? ????????????????????????</div>}
				</InternalLink>
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
					<img className="favoritesUserpic" src={`${STATIC_URL}/${offer.userPhoto}`} onError={e => e.target.src = `${BASE_URL}/icons/photocard_placeholder.svg`} />
				</a>
				<div className="favoritesMiddle">
					<div>{ToRubles(offer.price)}</div>
					<div>{offer.title}</div>
					<div className="thin small light">{offer.address}</div>
				</div>
				<div id={offer.id} onClick={(e) => deleteNote(e)} className="favoritesNote" title={offer.comment}>
					{offer.comment}
				</div>
				<a className="favoritesButton buttonGrey small">???????????????? ???? ?????????????????? ????????</a>
			</div>
		</a>
	)
}

export default OfferFavorite;
