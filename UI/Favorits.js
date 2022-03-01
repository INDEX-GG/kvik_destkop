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

		const isFavorite = userInfo.favorites.includes(idOffer)
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
}
