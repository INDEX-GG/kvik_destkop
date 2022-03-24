import React, {useMemo} from "react";

// import { STATIC_URL } from '#lib/constants'
// import { photos2arr } from '#lib/services'

const Image = (props) => {

    const offerLabelByType = {
        banned: 'Отклонено',
        time_limit: 'Истек срок размещения',
    }

    const labelImage = Object.prototype.hasOwnProperty.call(offerLabelByType, props.offer?.status) ? offerLabelByType[props.offer?.status] : '';

    const photos = useMemo(
        // () => Array.isArray(props.offer.photo) ? props.offer.photo || photos2arr(props.offer.photo)?.map( img => `${STATIC_URL}/${img}`)
        () => props?.offer?.photo
    )

    return (
        <div className={props.classes.offer__image}>
            {photos && photos?.slice(0, 1)?.map((imgs, i) => {
                return <img className={props.classes.image} key={i} src={imgs} />;
            })}
            {props.isWaith && (
                <p className={props.classes.pos_abs}>{labelImage}</p>
            )}
        </div>
    )
}

export default React.memo(Image)
