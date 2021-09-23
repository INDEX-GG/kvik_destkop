import React from 'react';
import StarRating from "../../../StarRating";




function ReviewLeft({data, parentCheck, getCardId, dataId}) {
    const [check, setCheck] = React.useState(false);

    React.useEffect(() => {
        parentCheck ? check ? null : (getCardId({id: data.id, isCheck: parentCheck}), setCheck(parentCheck) ) : check===false ? null : dataId.length == 0 ? ( getCardId({id: data.id, isCheck: parentCheck}), setCheck(parentCheck) ) : null;
    },[parentCheck])
    console.log("renderNumber")
    return (
        <div key={data.id} className="reviewContainer reviewPadding">
            <div>
                <div className="reviewContainer_user">
                    <img src={`${data.userPic}?${data.id}`} />
                    <div className="small">
                        <div>{data.userName}</div>
                        <div className="light DatPub__mobile reviewsDate reviewsDateLeft">
                            <spam>Дата публикации</spam> {data.date}
                        </div>
                    </div>
                </div>
                <div className="reviewsLeftRaiting">
                    <div className="reviewsNumber reviesNumberNone">{data.rate}</div>
                    <StarRating {...{ rating: data.rate }} />
                </div>
            </div>
            <div>{data.offerTitle}</div>
            <div className="thin">{data.review}</div>

            <div className="reviewCheck">
                <label className="checkbox">        
                    <input 
                        type="checkbox" 
                        onChange={(event) => { setCheck(event.target.checked); getCardId({id: data.id, isCheck: event.target.checked}) }}
                        checked={check}
                    />
                    <div className="checkbox__text"></div>
                </label>
            </div>
        </div>
    )
}

export default ReviewLeft
