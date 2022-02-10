import React from "react";
import LikeDark from "#UI/icons/LikeDark";
import Showes from "#UI/icons/Showes";

const ImgStatistic = (props) => {
    return (
        <div className={`${props.classes.column} ${props.isActive ? props.classes.paddingIcon : props.classes.paddingIconWait}`}>
            <div className={`${props.classes.end} ${props.classes.row} ${props.classes.icon__column}`}>
                <div className={props.classes.row}>
                    <div className={`${props.classes.height} ${props.classes.info__text} ${props.classes.padding__icon}`}><p>{props.offer.all_time_viewing_count} +{props.offer.last_day_viewing_count}</p></div>
                    <div className={props.classes.showes}><Showes /></div>
                </div>
                <div className={props.classes.row}>
                    <div className={`${props.classes.height} ${props.classes.info__text} ${props.classes.padding__icon}`}>{props.offer.likes_count}</div>
                    <div className={props.classes.likes}><LikeDark /></div>
                </div>
            </div>
        </div>
    )
}
export default React.memo(ImgStatistic)