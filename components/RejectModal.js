import React, {useState} from 'react';
import verifyModerator from './json/verifyModerator.json'


function RejectModal({reject, setOpenWaitForm}) {

    const [id, setId] = useState([]);

    function getCause({id, isCheck}) {
        setId( isCheck ? prev => [...prev, id] : prev => prev.filter( item => item !== id))
    }
    
    return (
        <div className="modal__wrapper_reject">
            <div className="modal__header">Причина отклонения</div>
            <div className="modal__middle">
                <div className="modal__middle__description_rejected">Выберите причину отклонения объявления</div>
                {Object.keys(verifyModerator).map( (item) => (
                    <label className="checkbox" key={item}>
                        <input type="checkbox" onChange={(event) => getCause({id: +item, isCheck: event.target.checked})}/>
                        <div className="checkbox__text">{verifyModerator[item]}</div>
                    </label>
                 ))}
            </div>
            <div className="modal__footer">
                <button 
                    className="btn_submit" 
                    onClick={() => {id.length > 0 ? (reject(id), setOpenWaitForm(prev => !prev)) : null}}
                >
                    Отправить
                </button>
            </div>
        </div>
    );
}

export default RejectModal
