import React from 'react'
import { useUser } from '../hooks/useUser';

export default function Favorits({ offer }) {

    const { id } = useUser();

    const getFavorits = (e) => {

        e.target.classList.toggle('like-active')

        let arrFavorits = Array({ user_id: id, post_id: offer.id });
        console.log(arrFavorits)

        /* axios.post('', arrFavorits){
            
        } */




    }

    return (
        <div>
            <span onClick={(e) => getFavorits(e)} className="card_like"></span>
        </div>
    )
}
