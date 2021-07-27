import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/Context/AuthCTX';
import { useFavorits } from '../lib/Context/FavoritesCTX';
import { ContactsOutlined } from '@material-ui/icons';

export default function Favorits({ offer, isCard, isProduct, isAccountCard, favorites }) {

    const { userFav, setQuery } = useFavorits()
    const { id } = useAuth();
    const router = useRouter();


    // console.log(router.query.id)


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
    //    
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






    if (isCard) {
        let comment = (userFav && JSON.parse(userFav).filter((item) => +item.post_id === offer.id).map((item) => item.comment))
        let condition = (userFav && JSON.parse(userFav).filter((item) => +item.post_id === offer.id).map((item) => item.condition))
        let like = condition?.length == 0 || condition?.join() == 'false' ? true : false

        const getFavorits = (e) => {
            let arrFavorits = { 'user_id': `${id}`, 'post_id': `${offer.id}`, 'comment': comment.join(), 'condition': `${like}` }
            e.target.classList.toggle('like-active')
            axios.post("/api/favorites", arrFavorits)
                .then(r => r.data)
                .finally(function () {
                    setQuery(p => !p)
                })
        }

        return (
            <div>
                <span onClick={(e) => getFavorits(e)} className={userFav && (JSON?.parse(userFav).some((item) => +item.post_id === offer.id && item.condition === 'true')) ? "card_like like-active" : "card_like"}></span>
            </div>
        )
    }


    if (isAccountCard) {
        return (
            <span onClick={(e) => getFavorits(e)} className={"favoritesFavorite" /* "favoritesFavorite like-active" */}></span>
        )
    }


    if (isProduct) {
        let comment = (userFav && JSON.parse(userFav).filter((item) => +item.post_id === +router.query.id).map((item) => item.comment));
        let condition = (userFav && JSON.parse(userFav).filter((item) => +item.post_id === +router.query.id).map((item) => item.condition));
        let like = condition?.length == 0 || condition?.join() == 'false' ? true : false;
        let note;


        
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
            let arrFavorits = { 'user_id': `${id}`, 'post_id': `${router.query.id}`, 'comment': `${comment}`, 'condition': `${like}` };
            axios.post("/api/favorites", arrFavorits)
                .then(r => r.data)
                .finally(function () {
                    setQuery(p => !p)
                })
        }

        return (
            <>
                <div className='main__input_note'>
                    <input title onBlur={e => getNote(e)} title={`${comment}` !== '' ? comment : 'Ваша заметка'} className="SellerInfoNoteInput" placeholder={`${comment}` !== '' ? comment : 'Заметка к объявлению'} />
                </div>
                {/* {<span className='delete__note'></span>} */}
                <a className="SellerInfoNote" onClick={(e) => openNote(e)}></a>
                <span onClick={(e) => { getFavoritsPost(e) }} className={userFav && (JSON?.parse(userFav).some((item) => +item.post_id === +router.query.id && item.condition === 'true')) ? "SellerInfoFavorite like-active" : "SellerInfoFavorite"}></span>
            </>
        )
    }
}