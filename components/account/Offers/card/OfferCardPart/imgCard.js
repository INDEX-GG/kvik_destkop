import React from "react";

const Image = (props) => {

    const offerLabelByType = {
        banned: 'Отклонено',
        time_limit: 'Истек срок размещения',
    }

    const labelImage = Object.prototype.hasOwnProperty.call(offerLabelByType, props.offer?.status) ? offerLabelByType[props.offer?.status] : '';

    return (
        <div className={props.classes.offer__image}>
            {props.offer.photo?.map((imgs, i) => {
                return <img className={props.classes.image} key={i} src={imgs} />;
            })}
            {props.isWaith && (
                <p className={props.classes.pos_abs}>{labelImage}</p>
            )}
        </div>
    )
}

export default React.memo(Image)
