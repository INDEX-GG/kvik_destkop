import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/Context/AuthCTX';
import { useFaverits } from '../lib/Context/FavoritesCTX';

export default function Favorits({ offer, isCard, isProduct, isAccountCard, favorites }) {

    const { userFav, setQuery } = useFaverits()
    const { id } = useAuth();
    const router = useRouter();

    // const [like, setLike]= useState(true)

    let comment = (userFav && JSON.parse(userFav).filter((item) => +item.post_id === offer.id).map((item) => item.comment))
    let condition = (userFav && JSON.parse(userFav).filter((item) => +item.post_id === offer.id).map((item) => item.condition))


    let like = condition?.length == 0 || condition?.join() == 'false' ? true : false

    // comment;
    //  condition;

    // const jsonFav = userFav && (userFav?.replace('[', ''))?.replace(']', '');
    // console.log(jsonFav)
    // console.log(userFav && JSON.parse(userFav).map((item) => item))
    // console.log(userFav && JSON.parse(userFav).map((item) => item.post_id))
    // console.log(userFav && JSON.parse(userFav).map((item) => item.comment))
    // console.log(userFav && JSON.parse(userFav).map((item) => item.condition))
    // const qwe = userFav && JSON.parse(userFav).filter((item) => +item.post_id === offer.id)
    // console.log(qwe.map((item) => item.comment))
    // let condition = (userFav && JSON.parse(userFav).map((item) => item.comment))
    // console.log(condition)





    // Запрос на api со страницы объявления
    // const openNote = e => {
    //     e.target.parentElement.childNodes[0].classList.toggle('note-active')
    // }

    // const getFavoritsPost = (e) => {
    //     condition = condition === true || condition === 'true' ? false : true
    //     let arrFavorits = { 'user_id': `${id}`, 'post_id': `${router.query.id}`, 'comment': `${note === undefined ? ((favorites?.replace('[', '')).replace(']', '')).split(':')[1] : note}`, 'condition': `${condition}` };
    //     axios.post("/api/favorites", arrFavorits)
    // }

    // const getNote = e => {
    //     note = e.target.value
    //     e.target.parentElement.childNodes[2].classList.toggle('like-active')
    //     getFavoritsPost(e)
    //     openNote(e)
    // }

    // const getLike = (e) => {
    //     e.target.classList.toggle('like-active')
    // }


    // Запрос на api с карточек
    const getFavorits = (e) => {
        // console.log('До====>', condition.join())
        // console.log('====>' + like)

        let arrFavorits = { 'user_id': `${id}`, 'post_id': `${offer.id}`, 'comment': comment.join(), 'condition': `${like}` }
        e.target.classList.toggle('like-active')
        axios.post("/api/favorites", arrFavorits)
            .then(r => r.data.user.favorites,)
            .catch(e => console.error(e))
            .finally(function () {
                setQuery(p => !p)
            })
        // console.log(arrFavorits)
    }



    if (isCard) {

        return (
            <div>
                <span onClick={(e) => getFavorits(e)} className={userFav && (JSON.parse(userFav).some((item) => +item.post_id === offer.id && item.condition === 'true')) ? "card_like like-active" : "card_like"}></span>
            </div>
        )
    }

    if (isAccountCard) {
        // console.log(((((favorites?.replace('[', '')).replace(']', '')).split(':')[0])))
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