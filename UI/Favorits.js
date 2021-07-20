import React from 'react'
import { useUser } from '../hooks/useUser';
import axios from 'axios';

export default function Favorits({ offer, isCard, isProduct, isAccountCard }) {

    const { id, favorites } = useUser();

    const getFavorits = (e) => {
        e.target.classList.toggle('like-active')
        let arrFavorits = { 'user_id': `${id}`, 'post_id': `${offer.id}` };
        axios.post("/api/favorites", arrFavorits);
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
                <span onClick={(e) => getFavorits(e)} className={favorites && (JSON.parse(favorites).some((item) => item === offer.id) !== true) ? "favoritesFavorite" : "favoritesFavorite like-active"}></span>
        )
    }
}
