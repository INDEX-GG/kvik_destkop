import React from "react";

const Image = (props) => {

    return(
            <div className={props.classes.offer__image}>
                {props.offer.photo?.map((imgs, i) => {
                    return <img className={props.classes.image} key={i} src={imgs}/>;
                })}{props.isWaith && (
                    <p className={props.classes.pos_abs}>Отклонено/Заблокировано</p>
                )}
            </div>
    )
}
export default Image