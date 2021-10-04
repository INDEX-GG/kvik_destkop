import React, {useState} from 'react'



function RejectModal({reject}) {

    const [id, setId] = useState([]);

    function getCause({id, isCheck}) {
        setId( isCheck ? prev => [...prev, id] : prev => prev.filter( item => item !== id))
    }

    // console.log(reject)
    // console.log(id)
    
    return (
        <div className="modal__wrapper_reject">
            <div className="modal__header">Причина отклонения</div>
            <div className="modal__middle">
                <div className="modal__middle__description_rejected">Выберете причину отклоления объявления</div>

                <label className="checkbox">
                    <input type="checkbox" onChange={(event) => getCause({id: 1, isCheck: event.target.checked})}/>
                    <div className="checkbox__text">Указана контактная информация в названии, тексте или на изображении</div>
                </label>
                <label className="checkbox">
                    <input type="checkbox" onChange={(event) => getCause({id: 2, isCheck: event.target.checked})} />
                    <div className="checkbox__text">В одном объявлении предложено несколько товаров или услуг</div>
                </label>
                <label className="checkbox">
                    <input type="checkbox" onChange={(event) => getCause({id: 1, isCheck: event.target.checked})} />
                    <div className="checkbox__text">Размещение запрещённых товаров или услуг на территории РФ</div>
                </label>
                <label className="checkbox">
                    <input type="checkbox" onChange={(event) => getCause({id: 1, isCheck: event.target.checked})} />
                    <div className="checkbox__text">Дискриминация других пользователей по каким - либо признакам</div>
                </label>
                <label className="checkbox">
                    <input type="checkbox" onChange={(event) => getCause({id: 1, isCheck: event.target.checked})} />
                    <div className="checkbox__text">Объявление размещено в неверной категории</div>
                </label>
                <label className="checkbox">
                    <input type="checkbox" onChange={(event) => getCause({id: 1, isCheck: event.target.checked})} />
                    <div className="checkbox__text">Указана не соответствующая цена</div>
                </label>
                <label className="checkbox">
                    <input type="checkbox" onChange={(event) => getCause({id: 1, isCheck: event.target.checked})} />
                    <div className="checkbox__text">Несоответствие фото, описания, заголовка</div>
                </label>
                <label className="checkbox">
                    <input type="checkbox" onChange={(event) => getCause({id: 1, isCheck: event.target.checked})} />
                    <div className="checkbox__text">Некорректное описание</div>
                </label>
                <label className="checkbox">
                    <input type="checkbox" onChange={(event) => getCause({id: 1, isCheck: event.target.checked})} />
                    <div className="checkbox__text">Некорректное название объявления</div>
                </label>
                <label className="checkbox">
                    <input type="checkbox" onChange={(event) => getCause({id: 1, isCheck: event.target.checked})} />
                    <div className="checkbox__text">Недопустимая информация в названии, тексте, на изображении</div>
                </label>
                <label className="checkbox">
                    <input type="checkbox" onChange={(event) => getCause({id: 1, isCheck: event.target.checked})} />
                    <div className="checkbox__text">Указаны неверные параметры</div>
                </label>
            </div>
            <div className="modal__footer">
                <button className="btn_submit" onClick={() => reject(id)}>Отправить</button>
            </div>
        </div>
    );
}

export default RejectModal
