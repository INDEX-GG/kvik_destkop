import { Checkbox, makeStyles,  Dialog } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import { ToRubles } from "../../../../lib/services";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import FeedbackModal from "../../../feedbackModal";


const useStyles = makeStyles( () => ({
    check: {
		position: "absolute",
	}
}))

function ReviewWait({offer, parentCheck, getChildData, dataCheck}) {
    const classes = useStyles();
    const [check, setCheck] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        parentCheck ? check ? null : ( getChildData({id: offer.id, isCheck: parentCheck}), setCheck(parentCheck) ) : check===false ? null : dataCheck.length===0 ? (getChildData({id: offer.id, isCheck: parentCheck}), setCheck(parentCheck)) : null;
    },[parentCheck])

   
    return (
        <div className="reviewsContainer boxWrapper">
            <div className="reviewsImage">
                <div className="reviewsPubCheck">
                <Checkbox
                    className={classes.check}
                    color='primary'
                    icon={<FiberManualRecordOutlinedIcon />}
                    checkedIcon={<FiberManualRecordSharpIcon />}
                    onChange={(e) => {setCheck(e.target.checked), getChildData({id: offer.id, isCheck: e.target.checked})}}
                    checked={check}
                />
            </div>
            <img src={`${offer.img}?${offer.id}`} />
            </div>
            <div className="reviewsDescription">
            <div className="reviewsUserBlock small">
                <div>
                <div>{offer.username}</div>
                <div className="light DatPub__mobile">
                    {" "}
                    <span> Дата публикации </span>
                    {offer.date}
                </div>
                </div>
                <img className="reviewsUserpic" loading={"lazy"} src={`${offer.userpic}?${offer.id}`} />
            </div>
            <div className="reviewsMiddle">
                <div>{ToRubles(offer.price)}</div>
                <div>{offer.title}</div>
                <div className="thin small light">{offer.locality}</div>
            </div>
            <a 
                className="buttonGrey small reviewsButton"
                onClick={ () => setOpen(true)}
            >   
                Оставить отзыв
            </a>
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(!open)}
            >
                <FeedbackModal offer={offer}/>
            </Dialog>
        </div>
    );
}

export default ReviewWait;
