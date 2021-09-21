import React from 'react';
import EmptyPlaceholder from '../../../EmptyPlaceholder';
import BlackListCard from '../card/BlackListCard';




function BlackList({data}) {
    const [check, setCheck] = React.useState(false);
    const [dataCardId, setCardId] = React.useState([])

    function getCardId ({id, isCheck}) {
        setCardId( isCheck ? prev => [...prev, id] : prev => prev.filter( item => item !== id) )
    }

    React.useEffect( () => {
        dataCardId.length === data.length ? check ? null : setCheck(true) : check===false ? null : setCheck(false);
    },[dataCardId])

    /* console.log("check=========>", check);
    console.log("data=========>", data);
    console.log("dataCardId=========>", dataCardId);
 */
    if (data.length === 0) {
        return (
			<EmptyPlaceholder
                title='В черном списке пока никого нет'
                img='/accountImage/blackList.png'
                customClass='blackList'
                imgAlt='search_placeholder'
            />
        )
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
                    <a className="small light underline" style={dataCardId.length > 0 ? {color: "black"} : null}>Разблокировать</a>
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
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default BlackList
