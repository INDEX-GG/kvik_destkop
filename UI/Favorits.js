import React, {useEffect, useState} from 'react';
import { useStore } from '../lib/Context/Store';
import { checkArray } from '../lib/services';
import { useStatistics } from "#lib/Context/StatisticsCTX";



export default function Favorits({ /* offer, isCard, */ isProduct, isAccountCard, favId, idOffer }) {
	const {addLike, addUnLike} = useStatistics()
	const { setLikeComment } = useStore()

	const { userInfo } = useStore()
	const [isLiked, setIsLiked] = useState(false)

	useEffect(() => {
		if(!userInfo) {return}
		const isFavorite = userInfo?.favorites.find((item) => item.post_id === idOffer)
		isFavorite ? setIsLiked(true) : setIsLiked(false)

	}, [idOffer])


	const likeClickHandler = () => {
		if(userInfo && isLiked) {
			addUnLike(idOffer)()
			setIsLiked(false)
			return
		}
		if(userInfo && !isLiked) {
			addLike(idOffer)()
			setIsLiked(true)
			return
		}
	}

	//console.log(userInfo)

	let comment;
/* 	if (isCard) {
		const getFavorits = (e) => {
			comment = checkArray(userInfo?.favorites) && (userInfo.favorites.filter(item => item.post_id === offer.id)[0])?.comment !== undefined ? (userInfo?.favorites.filter(item => item.post_id === offer.id)[0])?.comment : ''
			setLikeComment(offer.id, comment, e)
		}
		if (checkArray(userInfo?.favorites) && userInfo.favorites.some(item => item.post_id === offer.id && item.condition === true) && userInfo.favorites.length !== 0) {
			return (
				<div>
					<span onClick={() => getFavorits(false)} className="card_like like-active"></span>
				</div>
			)
		} else {
			return (
				<div>
					<span onClick={() => getFavorits(true)} className="card_like"></span>
				</div>
			)
		}
	} */

	if (isAccountCard) {
		const getFavoritsUser = e => {
			comment = checkArray(userInfo?.favorites) && (userInfo.favorites.filter(item => item.post_id === +e.target.id)[0])?.comment !== undefined ? (userInfo?.favorites.filter(item => item.post_id === +e.target.id)[0])?.comment : ''
			let like = checkArray(userInfo?.favorites) && userInfo.favorites.filter(item => item.post_id === +e.target.id).map(item => item.condition).join() === 'false' ? true : false
			setLikeComment(+e.target.id, comment, like)
		}

		if (checkArray(userInfo?.favorites) && userInfo.favorites.filter(item => item.post_id == favId)[0].condition) {
			return (
				<div>
					<span onClick={(e) => getFavoritsUser(e)} id={favId} className="favoritesFavorite like-active"></span>
				</div>
			)
		} else {
			return (
				<div>
					<span onClick={(e) => getFavoritsUser(e)} id={favId} className="favoritesFavorite"></span>
				</div>
			)
		}
	}

	if (isProduct) {
		comment = checkArray(userInfo?.favorites) && (userInfo.favorites.filter(item => item.post_id === idOffer)[0])?.comment !== undefined ? (userInfo.favorites.filter(item => item.post_id === idOffer)[0]).comment : ''
		let like = checkArray(userInfo?.favorites) && userInfo.favorites?.filter(item => item.post_id === idOffer).map(item => item.condition).join() === 'true' ? true : false

		let note;
		const openNote = e => {
			e.target.parentElement.childNodes[0].childNodes[0].classList.toggle('note-active')
		}

		const getNote = e => {
			note = e.target.value
			// комментим чтобы не поле не скрывалось после ввода
			// e.target.parentElement.childNodes[0].classList.toggle('note-active')
			comment = comment === undefined ? comment : note
			getFavoritsPost(e)
		}

		const setLike = () => {
			like = !like
			getFavoritsPost()
		}

		const getFavoritsPost = () => {
			comment;
			like;
			setLikeComment(idOffer, comment, like)
		}

		if (checkArray(userInfo?.favorites) && userInfo.favorites.some(item => item.post_id === idOffer && item.condition === true)) {
			return (
				<>
					<div className='main__input_note'>
						<input
							onBlur={e => getNote(e)}
							title={`${comment}` !== '' ? comment : 'Ваша заметка'}
							className={comment !== '' ? "SellerInfoNoteInput note-active" : "SellerInfoNoteInput"}
							// placeholder={`${comment}` !== '' ? comment : 'Заметка к объявлению'}
							placeholder='Заметка к объявлению'
							defaultValue={comment !== '' ? comment : ''}
						/>
					</div>
					<a className="SellerInfoNote" onClick={(e) => openNote(e)}></a>
					<div>
						<span 
							onClick={(e) => {
								setLike(e)
								likeClickHandler() 
							}} 
							className="SellerInfoFavorite like-active">
								

						</span>
					</div>
				</>
			)
		} else {
			return (
				<>
					<div className='main__input_note'>
						<input
							onBlur={e =>  getNote(e)}
							title={`${comment}` !== '' ? comment : 'Ваша заметка'}
							className={comment !== '' ? "SellerInfoNoteInput note-active" : "SellerInfoNoteInput"}
							// placeholder={`${comment}` !== '' ? comment : 'Заметка к объявлению'}
							placeholder='Заметка к объявлению'
							defaultValue={comment !== '' ? comment : ''}
						/>
					</div>
					<a className="SellerInfoNote" onClick={(e) => userInfo ? openNote(e) : null}></a>
					<div>
						<span 
							onClick={(e) => {
								userInfo ? setLike(e) : null
								// userInfo && !isLiked ? addLike(idOffer)() : null
								// userInfo && isLiked ? addUnLike(idOffer)() : null
								// userInfo ? setIsLiked(!isLiked) : null
								likeClickHandler()
							}}
							className="SellerInfoFavorite">

						 </span>
					</div>
				</>
			)
		}
	}
}
