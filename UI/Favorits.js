
import React from 'react';
import { useAuth } from '../lib/Context/AuthCTX';
import { useStore } from '../lib/Context/Store';

export default function Favorits({ offer, isCard, isProduct, isAccountCard, favId, idOffer }) {

    const { id } = useAuth();
    const { setLikeComment } = useStore()
    const { userInfo } = useStore()
    let comment;

    if (isCard) {
        const getFavorits = (e) => {
            comment = userInfo?.favorites && (userInfo?.favorites.filter(item => item.post_id === offer.id)[0])?.comment !== undefined ? (userInfo?.favorites.filter(item => item.post_id === offer.id)[0])?.comment : ''
            // comment = userInfo !== undefined && typeof userInfo.favorites !== 'string' && userInfo.favorites.length > 0 && userInfo.favorites?.filter(item => item.post_id === offer.id).map((item) => item.comment).join() === false ? null : userInfo !== undefined && typeof userInfo.favorites !== 'string' && userInfo.favorites.length > 0 && userInfo.favorites?.filter(item => item.post_id === offer.id).map((item) => item.comment).join()
            console.log(comment)
            setLikeComment(offer.id, comment, e)
        }
        if (userInfo !== undefined && typeof userInfo.favorites !== 'string' && userInfo.favorites.length > 0 && userInfo?.favorites.some(item => item.post_id === offer.id && item.condition === true) && userInfo.favorites.length !== 0) {
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
    }



    if (isAccountCard) {
        const getFavoritsUser = e => {
            comment = userInfo?.favorites && (userInfo?.favorites.filter(item => item.post_id === +e.target.id)[0])?.comment !== undefined ? (userInfo?.favorites.filter(item => item.post_id === +e.target.id)[0])?.comment : ''
            // comment = userInfo !== undefined && typeof userInfo.favorites !== 'string' && userInfo.favorites.length > 0 && userInfo.favorites?.filter(item => item.post_id === +e.target.id).map(item => item.comment).join() === false ? null : userInfo !== undefined && typeof userInfo.favorites !== 'string' && userInfo.favorites.length > 0 && userInfo.favorites?.filter(item => item.post_id === +e.target.id).map(item => item.comment).join()
            let like = userInfo?.favorites && userInfo.favorites?.filter(item => item.post_id === +e.target.id).map(item => item.condition).join() === 'false' ? true : false
            setLikeComment(+e.target.id, comment, like)
        }
        console.log(userInfo?.favorites)
        console.log(userInfo?.favorites.filter(item => item.post_id == favId)[0].condition)
        if (userInfo.favorites?.filter(item => item.post_id == favId)[0]?.condition === 'true' || userInfo?.favorites.filter(item => item.post_id == favId)[0]?.condition === true ) {

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
        comment = userInfo?.favorites && (userInfo?.favorites.filter(item => item.post_id === idOffer)[0])?.comment !== undefined ? (userInfo?.favorites.filter(item => item.post_id === idOffer)[0])?.comment : ''
        let like = userInfo && userInfo.favorites?.filter(item => item.post_id === idOffer).map(item => item.condition).join() === 'true' ? false : true
        let note;
        console.log(comment)
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

        const getFavoritsPost = e => {
            comment;
            like;
            setLikeComment(idOffer, comment, like)
        }


        if (userInfo !== undefined && typeof userInfo.favorites !== 'string' && userInfo.favorites.length > 0 && userInfo?.favorites.length != 0 && userInfo?.favorites.some(item => item.post_id === idOffer && item.condition === true) && userInfo.favorites.length !== 0) {
            return (
                <>
                    <div className='main__input_note'>
                        <input title onBlur={e => getNote(e)} title={`${comment}` !== '' ? comment : 'Ваша заметка'} className="SellerInfoNoteInput" placeholder={`${comment}` !== '' ? comment : 'Заметка к объявлению'} />
                    </div>
                    <a className="SellerInfoNote" onClick={(e) => openNote(e)}></a>
                    <div>
                        <span onClick={(e) => getFavoritsPost(e)} className="SellerInfoFavorite like-active"></span>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className='main__input_note'>
                        <input title onBlur={e => getNote(e)} title={`${comment}` !== '' ? comment : 'Ваша заметка'} className="SellerInfoNoteInput" placeholder={`${comment}` !== '' ? comment : 'Заметка к объявлению'} />
                    </div>
                    <a className="SellerInfoNote" onClick={(e) => openNote(e)}></a>
                    <div>
                        <span onClick={(e) => getFavoritsPost(e)} className="SellerInfoFavorite"></span>
                    </div>
                </>
            )
        }
    }
}