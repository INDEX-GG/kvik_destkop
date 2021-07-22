import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import axios from 'axios';
import { useRouter } from 'next/router';





export default function Favorits({ offer, isCard, isProduct, isAccountCard }) {

    const { id, favorites, mutateUser } = useUser();

    // console.log(favorites&& ((favorites?.replace('[', '')).replace(']', '')).split(':')[2])

    const router = useRouter();

    let note
    let condition = (favorites && ((favorites?.replace('[', '')).replace(']', '')).split(':')[2])

    const getLike = (e) => {
        e.target.classList.toggle('like-active')
    }


    const getFavorits = (e) => {
        e.target.classList.toggle('like-active')
        let arrFavorits = { 'user_id': `${id}`, 'post_id': `${offer.id}`, 'comment': `${note === undefined ? ((favorites?.replace('[', '')).replace(']', '')).split(':')[2] : note}`, 'condition': `${condition}` };
        console.log(arrFavorits)
        axios.post("/api/favorites", arrFavorits);
    }




    const getFavoritsPost = (e) => {
        console.log(id)
        console.log(note)
        console.log(router.query.id)

        console.log(((favorites?.replace('[', '')).replace(']', '')).split(':')[2])

        condition = condition === true || condition === 'true' ? false : true

        /* let condition = favorites && ((favorites?.replace('[', '')).replace(']', '')).split(':')[2] === 'true' || ((favorites?.replace('[', '')).replace(']', '')).split(':')[2] === true ? false : true */
        let arrFavorits = { 'user_id': `${id}`, 'post_id': `${router.query.id}`, 'comment': `${note === undefined ? ((favorites?.replace('[', '')).replace(']', '')).split(':')[1] : note}`, 'condition': `${condition}` };
        console.log(arrFavorits)
        axios.post("/api/favorites", arrFavorits)
            .then(() => mutateUser())


    }




    const getNote = e => {
        note = e.target.value
        e.target.parentElement.childNodes[2].classList.toggle('like-active')
        document.addEventListener('click', e => {
            getFavoritsPost(e)
        });



    }


    if (isCard) {
        return (
            <div>
                <span onClick={(e) => getFavorits(e)} className={favorites && ((((favorites?.replace('[', '')).replace(']', '')).split(':')[0]) === true) ? "card_like like-active" : "card_like"}></span>
            </div>
        )
    }

    if (isAccountCard) {
        return (
            <span onClick={(e) => getFavorits(e)} className={favorites && ((((favorites?.replace('[', '')).replace(']', '')).split(':')[0]) !== true) ? "favoritesFavorite" : "favoritesFavorite like-active"}></span>
        )
    }

    if (isProduct) {
        return (
            <>
                <input onBlur={e => getNote(e)} className="SellerInfoNoteInput" placeholder={favorites && ((((favorites?.replace('[', '')).replace(']', '')).split(':')[1]) === '') || (favorites && ((((favorites?.replace('[', '')).replace(']', '')).split(':')[1]) === undefined)) ? 'Заметка к объявлению' : favorites && (((favorites?.replace('[', '')).replace(']', '')).split(':')[1])} />
                <a className="SellerInfoNote"></a>

                <span onClick={(e) => { getFavoritsPost(e); getLike(e) }} className={favorites && (((favorites?.replace('[', '')).replace(']', '')).split(':')[2]) === 'true' ? "SellerInfoFavorite like-active" : "SellerInfoFavorite"}></span>
            </>
        )
    }
}/* ((favorites?.replace('[', '')).replace(']', '')).split(':').some((item) => item) */