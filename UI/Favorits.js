import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/Context/AuthCTX';


export default function Favorits({ offer, isCard, isProduct, isAccountCard }) {

    const {id} = useAuth();
console.log()

    const {favorites } = useUser();
    const router = useRouter();

    let note
    let condition = (favorites && ((favorites?.replace('[', '')).replace(']', '')).split(':')[2])


    // Запрос на api со страницы объявления
    const openNote = e => {
        e.target.parentElement.childNodes[0].classList.toggle('note-active')
    }

    const getFavoritsPost = (e) => {
        condition = condition === true || condition === 'true' ? false : true
        let arrFavorits = { 'user_id': `${id}`, 'post_id': `${router.query.id}`, 'comment': `${note === undefined ? ((favorites?.replace('[', '')).replace(']', '')).split(':')[1] : note}`, 'condition': `${condition}` };
        axios.post("/api/favorites", arrFavorits)
    }

    const getNote = e => {
        note = e.target.value
        e.target.parentElement.childNodes[2].classList.toggle('like-active')
        getFavoritsPost(e)
        openNote(e)
    }

    const getLike = (e) => {
        e.target.classList.toggle('like-active')
    }


    // Запрос на api с карточек
    const getFavorits = (e) => {
        e.target.classList.toggle('like-active')
        let arrFavorits = { 'user_id': `${id}`, 'post_id': `${offer.id}`, 'comment': `${note === undefined ? ((favorites?.replace('[', '')).replace(']', '')).split(':')[1] : note}`, 'condition': `${condition}` };
        axios.post("/api/favorites", arrFavorits);
        console.log(arrFavorits)
    }



    if (isCard) {
        return (
            <div>
                <span onClick={(e) => getFavorits(e)} className={favorites && ((((favorites?.replace('[', '')).replace(']', '')).split(':')[2]) === true) || favorites && ((((favorites?.replace('[', '')).replace(']', '')).split(':')[2]) === 'true') ? "card_like like-active" : "card_like"}></span>
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
                <input title={favorites && (((favorites?.replace('[', '')).replace(']', '')).split(':')[1])} onBlur={e => getNote(e)} className="SellerInfoNoteInput" placeholder={favorites && (((favorites?.replace('[', '')).replace(']', '')).split(':') === '') || favorites && ((((favorites?.replace('[', '')).replace(']', '')).split(':')[1]) === '') || (favorites && ((((favorites?.replace('[', '')).replace(']', '')).split(':')[1]) === undefined)) ? 'Заметка к объявлению' : favorites && (((favorites?.replace('[', '')).replace(']', '')).split(':')[1])} /> 
                <a className="SellerInfoNote" onClick={(e) => openNote(e)}></a>
                <span onClick={(e) => { getFavoritsPost(e); getLike(e) }} className={favorites && (((favorites?.replace('[', '')).replace(']', '')).split(':')[2]) === 'true' ? "SellerInfoFavorite like-active" : "SellerInfoFavorite"}></span>
            </>
        )
    }
}