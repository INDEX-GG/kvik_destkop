import React from 'react';
import { useStore } from '../lib/Context/Store';
import { checkArray } from '../lib/services';

export default function Favorits({ /* offer, isCard, */ isProduct, isAccountCard, favId, idOffer }) {
	const { setLikeComment } = useStore()
	const { userInfo } = useStore()
	//console.log(isProduct, isAccountCard, favId, idOffer)
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
		let like = checkArray(userInfo?.favorites) && userInfo.favorites?.filter(item => item.post_id === idOffer).map(item => item.condition).join() === 'true' ? false : true
		let note;
		const openNote = e => {
			e.target.parentElement.childNodes[0].childNodes[0].classList.toggle('note-active')
		}

		const getNote = e => {
			note = e.target.value
			e.target.parentElement.childNodes[0].classList.toggle('note-active')
			comment = comment === undefined ? comment : note
			like = true
			getFavoritsPost(e)
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
						<input onBlur={e => getNote(e)} title={`${comment}` !== '' ? comment : 'Ваша заметка'} className="SellerInfoNoteInput" placeholder={`${comment}` !== '' ? comment : 'Заметка к объявлению'} />
					</div>
					<a className="SellerInfoNote" onClick={(e) => openNote(e)}></a>
					<div>
						<span onClick={(e) => getFavoritsPost(e) } className="SellerInfoFavorite like-active"></span>
					</div>
				</>
			)
		} else {
			return (
				<>
					<div className='main__input_note'>
						<input onBlur={e =>  getNote(e)} title={`${comment}` !== '' ? comment : 'Ваша заметка'} className="SellerInfoNoteInput" placeholder={`${comment}` !== '' ? comment : 'Заметка к объявлению'} />
					</div>
					<a className="SellerInfoNote" onClick={(e) => userInfo ? openNote(e) : null}></a>
					<div>
						<span onClick={(e) => userInfo ? getFavoritsPost(e) : null } className="SellerInfoFavorite"></span>
					</div>
				</>
			)
		}
	}
}