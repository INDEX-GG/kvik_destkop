function Error500() {
    return (
        <div className="error__page">
            <div className="error__page_wrapper">
                <h5 className="error__title">500</h5>
                <p className="error__sub_title">Ошибка сервера</p>
                <p className="error__description">На сервере произошла непредвиденная ошибка.<br />Пожалуйста, подождите, она вскоре будет исправлена.</p>
            </div>
        </div>
    )
}

export default Error500
