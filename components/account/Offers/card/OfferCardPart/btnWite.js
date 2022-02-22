import React from "react";

const BtnWite = (props) => {
    // в "ждут действия" показываем Активировать только у карточек с "истек срок размещения" и всех в "архиве"
	const isWaithTimeLimit = props.isWaithTimeLimit

    return (
        <div>
            <div className={props.classes.btn__wait}>
                {isWaithTimeLimit &&
                    <a href="#" className={props.classes.text__wait}>
                        <span className="offerIcon checkMarkIcon"></span>
                        <button
                            id='001'
                            value={props.offer.id}
                            onClick={(e) => props.pushCheck(e)}
                            className="offerActivate thin superLight offerSocialAction">
                            Активировать
                        </button>
                    </a>
                }
                <button className={props.classes.text__wait}
                    onClick={() => props.Router.push(`/editPage/${props.offerID}`)}>
                    <span className="offerIcon editIcon"></span>
                    Редактировать
                </button>
                <a href="#" className={props.classes.text__wait}>
                    <span className="offerIcon binIcon"></span>

                    <button
                        id='002'
                        value={props.offer.id}
                        onClick={(e) => props.pushCheck(e)}
                        className="offerEdit thin superLight offerSocialAction">
                        Удалить
                    </button>
                </a>
            </div>
        </div>
    )
}
export default BtnWite
