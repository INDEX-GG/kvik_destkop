import React from "react";

const BtnWite = (props) => {
    // в "ждут действия" показываем Активировать только у карточек с "истек срок размещения" и всех в "архиве"
	const isWaithTimeLimit = props.isWaithTimeLimit

    return (
        <div>
            <div className={props.classes.btn__wait}>
                {isWaithTimeLimit &&
                    <button
                        id='001'
                        value={props.offer.id}
                        onClick={(e) => props.pushCheck(e, '001', props.offer.id)}
                        className="offerActivate thin superLight offerSocialAction"
                    >
                        <span className="offerIcon checkMarkIcon"></span>
                        Активировать
                    </button>
                }
                <button className={props.classes.text__wait}
                    onClick={() => props.Router.push(`/editPage/${props.offerID}`)}>
                    <span className="offerIcon editIcon"></span>
                    Редактировать
                </button>

                <button
                    id='002'
                    value={props.offer.id}
                    onClick={(e) => props.pushCheck(e, '002', props.offer.id)}
                    className="offerEdit thin superLight offerSocialAction"
                >
                    <span className="offerIcon binIcon"></span>
                    Удалить
                </button>
            </div>
        </div>
    )
}
export default BtnWite
