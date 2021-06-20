import { useRef, useState } from 'react';

let userInfo = {};
if (typeof userAuth !== 'undefined') {
    userInfo = {
        userId: 1,
        userPic: '',
        userName: userAuth.name,
        userDateReg: standartDate(userAuth.created_at),
        userRate: 3.5,
        userReviews: 0,
        userSubscribers: 0,
        userSubscriptions: 0
    };
} else {
    userInfo = {
        userId: 1,
        userPic: '',
        userName: 'Имя пользователя',
        userDateReg: '21.56.7676',
        userRate: 3.2,
        userReviews: 0,
        userSubscribers: 0,
        userSubscriptions: 0
    };
}


function Comments() {
    const string = 'Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв Отзыв';
    const setref = useRef(null);
    const [menuItem, readMore] = useState("Читать дальше");
    const listRef = () => {
        readMore((menuItem == "Читать дальше") ? "Скрыть" : 'Читать дальше')
    }
    return (
        <div className="comments">
            <div className="comment">
                <div className="comment__wrapper">
                    <div className="comment__block_top">
                        <div className="comment__block_top_main">
                            <div className="comment__user_avatar">
                                <img src="https://source.unsplash.com/random?interior" alt="avatar" />
                            </div>
                            <div className="comment__user_info">
                                <p className="comment__user_name">Имя Пользователя</p>
                                <p className="comment__date">Дата публикации 00.00.00 </p>
                            </div>
                        </div>
                        <div className="rating">
                            <div className="stars">
                                <div className="on" style={{ width: `${userInfo.userRate * 20}%` }}></div>
                                <div className="live">
                                    <span data-rate="1"></span>
                                    <span data-rate="2"></span>
                                    <span data-rate="3"></span>
                                    <span data-rate="4"></span>
                                    <span data-rate="5"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="comment__block_middle">
                        Название объявления, на который составлен отзыв
                    </div>
                    <p ref={setref} className={"comment__block_bottom" + ((menuItem == "Читать дальше") ? " comment__block_bottom-close" : '')}>
                        {string}
                    </p>
                    <button className="btn-lore_more" onClick={listRef} >{menuItem}</button>
                </div>
            </div>
        </div>
    )
}

export default Comments;

