import { useState } from "react";
import BlockListCard from "../cards/BlockListCard";

// Чёрный список
const blackListBox = [
    { id: 1, userPic: 'https://source.unsplash.com/random?portrait', name: 'Жора', blocked_time: '00.00.00', adminname: 'Кулумбаев А.С' },
    { id: 2, userPic: 'https://source.unsplash.com/random?portrait', name: 'Жанна', blocked_time: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 3, userPic: 'https://source.unsplash.com/random?portrait', name: 'Евгений', blocked_time: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 4, userPic: 'https://source.unsplash.com/random?portrait', name: 'Марина', blocked_time: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 5, userPic: 'https://source.unsplash.com/random?portrait', name: 'Андрей', blocked_time: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 6, userPic: 'https://source.unsplash.com/random?portrait', name: 'Василий', blocked_time: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 7, userPic: 'https://source.unsplash.com/random?portrait', name: 'Длинное имя', blocked_time: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 8, userPic: 'https://source.unsplash.com/random?portrait', name: 'Жора', blocked_time: '00.00.00', adminname: 'Кулумбаев А.С' },
    { id: 9, userPic: 'https://source.unsplash.com/random?portrait', name: 'Жора', blocked_time: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 10, userPic: 'https://source.unsplash.com/random?portrait', name: 'Жора', blocked_time: '00.00.00', adminname: 'Кулумбаев А.С' },
    { id: 11, userPic: 'https://source.unsplash.com/random?portrait', name: 'Жора', blocked_time: '00.00.00', adminname: 'Кулумбаев А.С' },
    { id: 12, userPic: 'https://source.unsplash.com/random?portrait', name: 'Жора', blocked_time: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 13, userPic: 'https://source.unsplash.com/random?portrait', name: 'Жора', blocked_time: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 14, userPic: 'https://source.unsplash.com/random?portrait', name: 'Жора', blocked_time: '00.00.00', adminname: 'Кулумбаев А.С' },
    { id: 15, userPic: 'https://source.unsplash.com/random?portrait', name: 'Жора', blocked_time: '00.00.00', adminname: 'Кулумбаев А.С' },
    { id: 16, userPic: 'https://source.unsplash.com/random?portrait', name: 'Жора', blocked_time: '00.00.00', adminname: 'Супредко Я.А' },
];

function BlackList() {
    const [check, setCheck] = useState(false);
    const [dataCardId, setCardId] = useState([])

    function getCardId ({id, isCheck}) {
        setCardId( isCheck ? prev => [...prev, id] : prev => prev.filter( item => item !== id) )
    }

    return (
        <div className="clientPage__container_bottom">
            <div className="clientPage__container_nav__radio">
                <label className="checkbox">
                <input 
                            type="checkbox"
                            onChange={(event) => {setCheck(event.target.checked); event.target.checked ? null : setCardId([])}}
                            checked={check}
                        />
                        <div className="checkbox__text"></div>
                </label>
                <a className="small light underline" style={dataCardId.length > 0 ? {color: "black"} : null} onClick={() => {
                        if (dataCardId.length > 0){
                            // unblockUser(dataCardId)
                        }
                    }}>Разблокировать</a>
            </div>
            <div className="clientPage__container_content">
                <div className="settingsBlackList">

                {blackListBox.map((item, i) => 
                        <BlockListCard 
                            key={i} 
                            data={item}
                            parentCheck={check}
                            getCardId={getCardId}
                            dataCardId={dataCardId}
                            adminname={item.adminname}
                            // unblockUser={unblockUser}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default BlackList
