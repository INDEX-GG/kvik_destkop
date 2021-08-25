import React from 'react';
function BlackList(data) {



    if (data.data.length === 0) {
        return (
            <div className="clientPage__container_bottom">
                <div className="clientPage__container_content">
                <div className="notInfContainer">
                    <div className="notInf__title">В черном списке пока никого нет</div>
                    <img className="notInf__img-blackList" src="/accountImage/blackList.png" alt='search_placeholder'/>
                </div>
                </div>
            </div>
        )
    }


    return (
    <div className="clientPage__container_bottom">
        <div className="clientPage__container_nav__radio">
                <label className="checkbox">
                <input type="checkbox" />
                <div className="checkbox__text"></div>
                </label>
                <a className="small light underline">Разблокировать</a>
        </div>
        <div className="clientPage__container_content">
            <div className="settingsBlackList">
                {data.data.map(item => {
                return (
                    <div key={item.id}>
                        <div>
                            <img src={`${item.userPic}?${item.id}`} />
                            <div>
                            <div>{item.username}</div>
                            <div className="light blockItem">Заблокирован {item.date}</div>
                            </div>
                        </div>
                        <a className="highlight underline">Разблокировать</a>
                        <div className="settingsBLCheck">
                            <label className="checkbox">
                            <input type="checkbox" />
                            <div className="checkbox__text"></div>
                            </label>
                        </div>
                    </div>
                )
                })}
            </div>
        </div>
    </div>
    )
}

export default BlackList
