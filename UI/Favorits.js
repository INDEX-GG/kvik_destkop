import React from 'react'
import { useUser } from '../hooks/useUser';
import axios from 'axios';

export default function Favorits({ offer }) {

    const { id, favorites } = useUser();

    const getFavorits = (e) => {
        e.target.classList.toggle('like-active')
        let arrFavorits = { 'user_id': `${id}`, 'post_id': `${offer.id}` };
        axios.post("/api/favorites", arrFavorits);
    }

    return (
        <div>
            <span onClick={(e) => getFavorits(e)} className={favorites && (JSON.parse(favorites).some((item) => item === offer.id) === true) ? "card_like like-active" : "card_like"}></span>
        </div>
    )
}
