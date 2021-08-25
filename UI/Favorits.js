
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/Context/AuthCTX';
import { useStore } from '../lib/Context/Store';

export default function Favorits({ offer, isCard, isProduct, isAccountCard, favId }) {

    const { id } = useAuth();
    const router = useRouter();
    const { setLikeComment } = useStore()
    const { userInfo } = useStore()
    let comment;

    if (isCard) {
        const getFavorits = (e) => {
            comment = userInfo && userInfo?.favorites.length != 0 && userInfo.favorites?.filter((item, i) => item.post_id === offer.id).map((item) => item.comment).join()
            setLikeComment(offer.id, comment, e)
        }

        if (userInfo && userInfo?.favorites.length != 0 && userInfo?.favorites.some((item, i) => item.post_id === offer.id && item.condition === true) && userInfo.favorites.length !== 0) {
            return (
                <div>
                    <span onClick={(e) => getFavorits(false)} className="card_like like-active"></span>
                </div>
            )
        } else {
            return (
                <div>
                    <span onClick={(e) => getFavorits(true)} className="card_like"></span>
                </div>
            )
        }
    }



    if (isAccountCard) {
        const getFavoritsUser = e => {
            comment = userInfo && userInfo.favorites?.filter((item, i) => item.post_id === +e.target.id).map(item => item.comment).join()
            let like = userInfo && userInfo.favorites?.filter((item, i) => item.post_id === +e.target.id).map(item => item.condition).join() === 'true' ? false : true
            setLikeComment(+e.target.id, comment, like)
        }

        if (userInfo && userInfo?.favorites.length != 0 && userInfo?.favorites.some((item, i) => item.post_id === favId && item.condition === true) && userInfo.favorites.length !== 0) {
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
        // let comment = (userFav && JSON.parse(userFav).filter((item) => +item.post_id === +router.query.id).map((item) => item.comment));
        // let condition = (userFav && JSON.parse(userFav).filter((item) => +item.post_id === +router.query.id).map((item) => item.condition));
        // let like = condition?.length == 0 || condition?.join() == 'false' ? true : false;
        // let note;

        // const openNote = e => {
        //     e.target.parentElement.childNodes[0].childNodes[0].classList.toggle('note-active')
        // }

        // const getNote = e => {
        //     note = e.target.value
        //     e.target.parentElement.childNodes[0].classList.toggle('note-active')
        //     comment = comment === undefined ? comment : note
        //     like = true
        //     getFavoritsPost(e)
        // }

        // const getFavoritsPost = e => {
        //     comment;
        //     like;
        //     let arrFavorits = { 'user_id': `${id}`, 'post_id': `${router.query.id}`, 'comment': `${comment}`, 'condition': `${like}` };
        //     axios.post("/api/favorites", arrFavorits)
        //         .then(r => r.data)
        //         .finally(function () {
        //             setQuery(p => !p)
        //         })
        //    console.log(arrFavorits)
        // }

        return (
            <>
                {/* <div className='main__input_note'>
                    <input title onBlur={e => getNote(e)} title={`${comment}` !== '' ? comment : 'Ваша заметка'} className="SellerInfoNoteInput" placeholder={`${comment}` !== '' ? comment : 'Заметка к объявлению'} />
                </div>
                
                <a className="SellerInfoNote" onClick={(e) => openNote(e)}></a>
                <span onClick={(e) => { getFavoritsPost(e) }} className={userFav && (JSON?.parse(userFav).some((item) => +item.post_id === +router.query.id && item.condition === 'true')) ? "SellerInfoFavorite like-active" : "SellerInfoFavorite"}></span> */}
            </>
        )
    }
}