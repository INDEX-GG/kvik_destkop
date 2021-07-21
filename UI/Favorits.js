import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import axios from 'axios';

export default function Favorits({ offer, isCard, isProduct, isAccountCard }) {

    const { id, favorites } = useUser();

    const getFavorits = (e) => {
        e.target.classList.toggle('like-active')
        let arrFavorits = { 'user_id': `${id}`, 'post_id': `${offer.id}`, 'post_id': `${comment}`, 'post_id': `${condition}` };
        axios.post("/api/favorites", arrFavorits);
    }




    // const [note, setNote] = useState();
    const getNote = e => {
        // setNote(e.target.value)
        let note = e.target.value
        document.addEventListener('click', e => {
            console.log(note)
        });
    }


    if (isCard) {
        return (
            <div>
                <span onClick={(e) => getFavorits(e)} className={favorites && (JSON.parse(favorites).some((item) => item === offer.id) === true) ? "card_like like-active" : "card_like"}></span>
            </div>
        )
    }

    if (isAccountCard) {
        return (
            <span onClick={(e) => getFavorits(e)} className={favorites && (JSON.parse(favorites).some((item) => item == true) !== true) ? "favoritesFavorite" : "favoritesFavorite like-active"}></span>
        )
    }

    if (isProduct) {
        return (
            <>
                <input onChange={e => getNote(e)} className="SellerInfoNoteInput" placeholder="Заметка к объявлению" />
                <a className="SellerInfoNote"></a>

                <span onClick={(e) => getFavorits(e)} className={favorites && (JSON.parse(favorites).some((item) => item == true) !== true) ? "SellerInfoFavorite" : "SellerInfoFavorite like-active"}></span>
            </>
        )
    }
}
