import React, {useEffect, useState} from 'react';
import { useStore } from '../lib/Context/Store';
// import { checkArray } from '../lib/services';
import { useStatistics } from "#lib/Context/StatisticsCTX";



export default function Favorits({ /* offer, isCard, */ /* isProduct ,*/ isAccountCard, /* favId,*/ idOffer }) {
	// кастомные хуки
	const {addLike, addUnLike} = useStatistics()
	// const { setLikeComment } = useStore()
	const { userInfo } = useStore()

// реакт хуки
	const [isLiked, setIsLiked] = useState(false)
	const [note, setNote] = useState('')
	// const [noteIsOpen, setNoteIsOpen] = useState(false)

	

	// проверяем, находимся ли мы на избранном объявлении
	// после чего меняем isLiked на true/false
	useEffect(() => {
		if(!userInfo) return

		const isFavorite = userInfo?.favorites
		.filter((item) => item.post_id === idOffer)
		.length > 0 ? true : false

		setIsLiked(isFavorite)
		
	}, [idOffer])

// обработчики собатий
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

	const noteChangeHandler = (e) => {
		setNote(e.target.value)
	}


	// let comment;

	const favoritesOnPersonalMenu = () => {
		return (
					<div>
						<span /*onClick={(e) => getFavoritsUser(e)} id={favId}*/ 
							// className="favoritesFavorite like-active"
							className={isLiked ? 'favoritesFavorite like-active' : 'favoritesFavorite'}
							onClick={e => {
								e.stopPropagation()
								likeClickHandler()
							}}
						>
						</span>
					</div>
				)
	}

	const favoritesOnProductPage = () => {
		return (
			<>
			<div className='main__input_note'>
				<input
					// onBlur={e => getNote(e)}
					onChange={noteChangeHandler}
					title={note ? note : 'Ваша заметка'}
					className={note ? "SellerInfoNoteInput note-active" : "SellerInfoNoteInput"}
					// placeholder={`${comment}` !== '' ? comment : 'Заметка к объявлению'}
					placeholder='Заметка к объявлению'
					defaultValue={note ? note : ''}
				/>
			</div>
	
			<a 
				className="SellerInfoNote" 
				onClick={(e) => {
					e.target.parentElement.childNodes[0].childNodes[0]
					.classList.toggle('note-active')
				}}
			/>
	
			<div>
				<span 
					onClick={(/*e*/) => {
						// setLike(e)
						likeClickHandler() 
					}} 
					className={`${isLiked ? 'SellerInfoFavorite like-active' : 'SellerInfoFavorite'}`}>
				</span>
			</div>
			</>
		)
	}

	return (
		<>
			{/* рендер по условию вызывает на свое место JSX разметку */}
			{isAccountCard && favoritesOnPersonalMenu()}
			{!isAccountCard && favoritesOnProductPage()}
		</>
	)
	

	// if (isAccountCard) {
	// 	const getFavoritsUser = e => {
	// 		comment = checkArray(userInfo?.favorites) && (userInfo.favorites.filter(item => item.post_id === +e.target.id)[0])?.comment !== undefined ? (userInfo?.favorites.filter(item => item.post_id === +e.target.id)[0])?.comment : ''
	// 		let like = checkArray(userInfo?.favorites) && userInfo.favorites.filter(item => item.post_id === +e.target.id).map(item => item.condition).join() === 'false' ? true : false
	// 		setLikeComment(+e.target.id, comment, like)
	// 	}

	// 	if (checkArray(userInfo?.favorites) && userInfo.favorites.filter(item => item.post_id == favId)[0].condition) {
	// 		return (
	// 			<div>
	// 				<span onClick={(e) => getFavoritsUser(e)} id={favId} className="favoritesFavorite like-active"></span>
	// 			</div>
	// 		)
	// 	} else {
	// 		return (
	// 			<div>
	// 				<span onClick={(e) => getFavoritsUser(e)} id={favId} className="favoritesFavorite"></span>
	// 			</div>
	// 		)
	// 	}
	// }

	// if (isProduct) {
	// 	comment = checkArray(userInfo?.favorites) && (userInfo.favorites.filter(item => item.post_id === idOffer)[0])?.comment !== undefined ? (userInfo.favorites.filter(item => item.post_id === idOffer)[0]).comment : ''
	// 	let like = checkArray(userInfo?.favorites) && userInfo.favorites?.filter(item => item.post_id === idOffer).map(item => item.condition).join() === 'true' ? true : false

	// 	let note;
	// 	const openNote = e => {
	// 		e.target.parentElement.childNodes[0].childNodes[0].classList.toggle('note-active')
	// 	}

	// 	const getNote = e => {
	// 		note = e.target.value
	// 		// комментим чтобы не поле не скрывалось после ввода
	// 		// e.target.parentElement.childNodes[0].classList.toggle('note-active')
	// 		comment = comment === undefined ? comment : note
	// 		getFavoritsPost(e)
	// 	}

	// 	const setLike = () => {
	// 		like = !like
	// 		getFavoritsPost()
	// 	}

	// 	const getFavoritsPost = () => {
	// 		comment;
	// 		like;
	// 		setLikeComment(idOffer, comment, like)
	// 	}

	// 	if (checkArray(userInfo?.favorites) && userInfo.favorites.some(item => item.post_id === idOffer && item.condition === true)) {
	// 		return (
	// 			<>
	// 				<div className='main__input_note'>
	// 					<input
	// 						onBlur={e => getNote(e)}
	// 						title={`${comment}` !== '' ? comment : 'Ваша заметка'}
	// 						className={comment !== '' ? "SellerInfoNoteInput note-active" : "SellerInfoNoteInput"}
	// 						// placeholder={`${comment}` !== '' ? comment : 'Заметка к объявлению'}
	// 						placeholder='Заметка к объявлению'
	// 						defaultValue={comment !== '' ? comment : ''}
	// 					/>
	// 				</div>
	// 				<a className="SellerInfoNote" onClick={(e) => openNote(e)}></a>
	// 				<div>
	// 					<span 
	// 						onClick={(e) => {
	// 							setLike(e)
	// 							likeClickHandler() 
	// 						}} 
	// 						className="SellerInfoFavorite like-active">
	// 					</span>
	// 				</div>
	// 			</>
	// 		)
	// 	} else {
	// 		return (
	// 			<>
	// 				<div className='main__input_note'>
	// 					<input
	// 						onBlur={e =>  getNote(e)}
	// 						title={`${comment}` !== '' ? comment : 'Ваша заметка'}
	// 						className={comment !== '' ? "SellerInfoNoteInput note-active" : "SellerInfoNoteInput"}
	// 						// placeholder={`${comment}` !== '' ? comment : 'Заметка к объявлению'}
	// 						placeholder='Заметка к объявлению'
	// 						defaultValue={comment !== '' ? comment : ''}
	// 					/>
	// 				</div>
	// 				<a className="SellerInfoNote" onClick={(e) => userInfo ? openNote(e) : null}></a>
	// 				<div>
	// 					<span 
	// 						onClick={(e) => {
	// 							userInfo ? setLike(e) : null
	// 							likeClickHandler()
	// 						}}
	// 						className="SellerInfoFavorite">
	// 					 </span>
	// 				</div>
	// 			</>
	// 		)
	// 	}
	// }
}
