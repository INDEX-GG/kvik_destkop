import React from "react";

import ImageLabel from './LabelImage/imgLabel'

const Image = (props) => {

    return (
        <div className={props.classes.offer__image}>
            {props.offer.photo?.map((imgs, i) => {
                return <img className={props.classes.image} key={i} src={imgs} />;
            })}
            {props.isWaith && (
                <ImageLabel status={props.offer.status} />
            )}
        </div>
    )
}
export default React.memo(Image)
