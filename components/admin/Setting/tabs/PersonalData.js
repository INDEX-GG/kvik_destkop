function PersonalData(userInfo) {
    return (
        <div className="setting__peronal">
            <div className="setting__peronal_wrapper">
                <div className="setting__peronal_block">
                    <div className="setting__peronal_title">Профиль</div>
                    <input className="setting__peronal_purpose" placeholder={userInfo.userName} />
                    <a className="btn__functional">Редактировать</a>
                </div>
                <div className="setting__peronal_block">
                    <div className="setting__peronal_title">Выход</div>
                    <a className="setting__peronal_purpose">Выйти</a>
                    <a className="btn__functional">Выйти со всех устройств</a>
                </div>
            </div>
            {
            }
        </div>
    )
}

export default PersonalData
