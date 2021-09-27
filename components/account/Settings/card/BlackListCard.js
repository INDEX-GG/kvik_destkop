import React from 'react'
import { STATIC_URL } from '../../../../lib/constants';





function BlackListCard({data, parentCheck, getCardId, dataCardId, unblockUser}) {
    const [check, setCheck] = React.useState(false)

    React.useEffect( () => {
        parentCheck ? check ? null :  (setCheck(parentCheck), getCardId({id: data.id, isCheck: parentCheck})) : check===false ? null : dataCardId.length==0 ? (setCheck(parentCheck), getCardId({id: data.id, isCheck: parentCheck})) : null;
    },[parentCheck])

    return (

        <div key={data.id}>
            <div>
                <img src={`${STATIC_URL}/${data.userPhoto}`} />
                <div>
                    <div>{data.name}</div>
                    <div className="light blockItem">Заблокирован {data.blocked_time}</div>
                </div>
            </div>
            <a className="highlight underline" onClick={() => unblockUser(data.id)} >Разблокировать</a>
            <div className="settingsBLCheck">
                <label className="checkbox">
                    <input 
                        type="checkbox"
                        onChange={(event) => {setCheck(event.target.checked); getCardId({id: data.id, isCheck: event.target.checked})}}
                        checked={check}
                    />
                    <div className="checkbox__text"></div>
                </label>
            </div>
        </div>
    )
}

export default BlackListCard
