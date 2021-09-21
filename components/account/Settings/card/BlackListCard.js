import React from 'react'





function BlackListCard({data, parentCheck, getCardId, dataCardId}) {
    const [check, setCheck] = React.useState(false)

    React.useEffect( () => {
        parentCheck ? check ? null :  (setCheck(parentCheck), getCardId({id: data.id, isCheck: parentCheck})) : check===false ? null : dataCardId.length==0 ? (setCheck(parentCheck), getCardId({id: data.id, isCheck: parentCheck})) : null;
    },[parentCheck])

    return (

        <div key={data.id}>
            <div>
                <img src={`${data.userPic}?${data.id}`} />
                <div>
                    <div>{data.username}</div>
                    <div className="light blockItem">Заблокирован {data.date}</div>
                </div>
            </div>
            <a className="highlight underline" >Разблокировать</a>
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
