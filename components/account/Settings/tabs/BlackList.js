import { useState } from 'react';
import EmptyPlaceholder from '../../../EmptyPlaceholder';
import BlackListCard from '../card/BlackListCard';
import SettingsBlackListPlaceHolder
    from "../../../placeHolders/SettingsPlaceHolder/SettingsBlackListPlaceHolder/SettingsBlackListPlaceHolder";




function BlackList({data, unblockUser}) {
    const [check, setCheck] = useState(false);
    const [dataCardId, setCardId] = useState([])

    function getCardId ({id, isCheck}) {
        setCardId( isCheck ? prev => [...prev, id] : prev => prev.filter( item => item !== id) )
    }

    // useEffect( () => {
    //     dataCardId.length === data.length ? check ? null : setCheck(true) : check===false ? null : setCheck(false);
    // },[dataCardId])


    if (data.length === 0) {
        return (
            <>
                {!data ? <SettingsBlackListPlaceHolder/>
                    :<EmptyPlaceholder
                    title='Здесь будут заблокированные вами пользователи'
                    subtitle='Нажмите пожаловаться в открывшемся меню выберете "Заблокировать пользователя"'
                    img='/accountImage/BigBlackList.png'
                    customClass='blackList'
                    imgAlt='search_placeholder'
                />}
            </>
        )
    }

    return (
        <>
            {!data ?  <SettingsBlackListPlaceHolder/>
                :<div className="clientPage__container_bottom">
                <div className="clientPage__container_nav__radio">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            onChange={(event) => {
                                setCheck(event.target.checked);
                                event.target.checked ? null : setCardId([])
                            }}
                            checked={check}
                        />
                        <div className="checkbox__text"/>
                    </label>
                    <a className="small light underline" style={dataCardId.length > 0 ? {color: "black"} : null}
                       onClick={() => {
                           if (dataCardId.length > 0) {
                               unblockUser(dataCardId)
                           }
                       }}>Разблокировать</a>
                </div>
                <div className="clientPage__container_content">
                    <div className="settingsBlackList">
                        {data.map((item, i) =>
                            <BlackListCard
                                key={i}
                                data={item}
                                parentCheck={check}
                                getCardId={getCardId}
                                dataCardId={dataCardId}
                                unblockUser={unblockUser}
                            />
                        )}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default BlackList
