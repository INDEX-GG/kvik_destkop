import React from 'react';
import ActiveIcon from '../../UI/icons/ActiveIcon';

const items = ["Категория", "Параметры", "Описание", "Цена", "Фотографии", "Местоположение", "Контакты"]

const Verify = ({Verify = 0}) => {

    return (
        <div className="placeaa__verify__block">
            {items.map((item, i) => {
                return (<>
                <div key={i} className={`placeaa__verify__item ${(i + 1 <= Verify) ? 'verifyHL' : ''}`}>
                    {item}
                    <ActiveIcon Size={24} 
                    Color={(i + 1 <= Verify) ? '#00a0ab' : '#c7c7c7'}/>
                </div>
                {(items.length !== i + 1) ? <div className={`placeaa__verify__connector ${(i + 2 <= Verify) ? 'verifyC' : ''}`}></div> : ''}
                </>)
            })}
        </div>
    )
}

export default Verify;