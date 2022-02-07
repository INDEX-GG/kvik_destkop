import React from "react";

const Image = (props) => {

    return (
        <div className="offerImage">
            {props.offer.photo?.map((imgs, i) => {
                return <img key={i} src={imgs} />;
            })}{props.isWaith && (
                <p className={props.classes.pos_abs}>Отклонено/Заблокировано</p>
            )}
        </div>
    )
}
export default Image