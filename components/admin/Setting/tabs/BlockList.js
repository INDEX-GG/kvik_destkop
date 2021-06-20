// Чёрный список
const blackListBox = [
    { id: 1, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00', adminname: 'Кулумбаев А.С' },
    { id: 2, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жанна', date: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 3, userPic: 'https://source.unsplash.com/random?portrait', username: 'Евгений', date: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 4, userPic: 'https://source.unsplash.com/random?portrait', username: 'Марина', date: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 5, userPic: 'https://source.unsplash.com/random?portrait', username: 'Андрей', date: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 6, userPic: 'https://source.unsplash.com/random?portrait', username: 'Василий', date: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 7, userPic: 'https://source.unsplash.com/random?portrait', username: 'Длинное имя', date: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 8, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00', adminname: 'Кулумбаев А.С' },
    { id: 9, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 10, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00', adminname: 'Кулумбаев А.С' },
    { id: 11, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00', adminname: 'Кулумбаев А.С' },
    { id: 12, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 13, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00', adminname: 'Супредко Я.А' },
    { id: 14, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00', adminname: 'Кулумбаев А.С' },
    { id: 15, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00', adminname: 'Кулумбаев А.С' },
    { id: 16, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00', adminname: 'Супредко Я.А' },
];

function BlackList() {
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

                    {blackListBox.map(item => {
                        return (
                            <div key={item.id}>
                                <div>
                                    <img src={`${item.userPic}?${item.id}`} />
                                    <div>
                                        <div>{item.username}</div>
                                        <div className="light">Заблокирован {item.date}, Заблокировал - <a className="href__admin_page">{item.adminname}</a></div>
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
