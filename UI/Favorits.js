import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/Context/AuthCTX';
import { useFavorits } from '../lib/Context/FavoritesCTX';
import { ContactsOutlined } from '@material-ui/icons';


export default function Favorits({ offer, isCard, isProduct, isAccountCard, favId }) {

    const { userFav, setQuery } = useFavorits()
    const { id } = useAuth();
    const router = useRouter();



    if (isCard) {
        let comment = (userFav && JSON.parse(userFav).filter((item) => +item.post_id === offer.id).map((item) => item.comment))
        let condition = (userFav && JSON.parse(userFav).filter((item) => +item.post_id === offer.id).map((item) => item.condition))
        let like = condition?.length == 0 || condition?.join() == 'false' ? true : false
        
        const getFavorits = (e) => {
            let arrFavorits = { 'user_id': `${id}`, 'post_id': `${offer.id}`, 'comment': comment?.join(), 'condition': `${like}` }
            console.log(arrFavorits)
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
        let comment = (userFav && JSON.parse(userFav).filter((item) => +item.post_id === favId).map((item) => item.comment));
        let condition = (userFav && JSON.parse(userFav).filter((item) => +item.post_id === favId).map((item) => item.condition))
        let like = condition?.length == 0 || condition?.join() == 'false' ? true : false;
        // console.log(comment)
        // console.log(condition)
        // console.log(like)







        const getFavoritsUser = e => {
            comment;
            like;
            let arrFavorits = { 'user_id': `${id}`, 'post_id': `${favId}`, 'comment': comment.join(), 'condition': `${like}` }
            console.log(arrFavorits)

            axios.post("/api/favorites", arrFavorits)
                .then(r => r.data)
                .finally(function () {
                    setQuery(p => !p)
                })
        }

        return (
            <span onClick={(e) => getFavoritsUser(e)} className={JSON?.parse(userFav).some((item) => +item.post_id === favId && item.condition === 'true') ? "favoritesFavorite like-active" : "favoritesFavorite"}></span>
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
            console.log(arrFavorits)
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