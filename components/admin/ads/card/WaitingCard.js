import React from 'react';
import { ToRubles } from '../../../../lib/services';
import {Button, Dialog } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Thumbs } from "swiper/core";
import { STATIC_URL } from "../../../../lib/constants";
import {initials, stringToColor} from "../../../../lib/services";
import RejectModal from "../../../RejectModal";
import CardSliderModal from "./CardSliderModal";
import axios from 'axios';

SwiperCore.use( [ Pagination, Navigation, Thumbs ] );


function WaitingCard({index, offer, parentCheck, getDataChild, offerId, setWaitingBox, lessCount, fetchApprove}) {
    const [openWaitForm, setOpenWaitForm] = React.useState(false);
    const {photos} = JSON.parse(offer.photo);
    const [check, setCheck] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [cardSwiper, setCardSwiper] = React.useState(null);
    const [activeSlide, setActiveSlide] = React.useState(0);
    
    React.useEffect( () => {
        parentCheck ? check ? null : handleChange(parentCheck) : check === false ? null : offerId.length === 0 ? handleChange(parentCheck) : null;
    }, [parentCheck])
    
    const listRef = (e) => {
        const adInformation = document.querySelectorAll(".ad__information__description")[e.target.value]
        const loerMore = document.querySelectorAll(".btn__loer_more")[e.target.value]
        adInformation.classList.toggle("ad_close");
        loerMore.classList.toggle("btn__loer_more-open");
        if (adInformation.classList.contains('ad_close')) {
           loerMore.innerHTML = 'Развернуть';
        }
        else {
           loerMore.innerHTML = "Скрыть";
        }
    }

    function handleChange(event) {
        setCheck(event);
        getDataChild({id: offer.id, isCheck: event })
    }
    
    function reject (params) {
        axios.post("/api/verifyModerActive", {
            "id": offer.id,
            "verify": "2",
        })
        axios.post("/api/verifymoder", {
            "id": `${offer.id}`,
            "verify_moderator": params
        })
        .then( (responce) => {
            console.log(responce);
            setWaitingBox(prev => prev.filter( item => item.id !== offer.id));
            lessCount(1);
        })
    }
    /* <div className="clientPage__userinitials" style={{ backgroundColor: `${stringToColor(offer.name)}`, fontSize: "14px", fontWeight: "400" }}>{initials(offer.name)}</div> */
    
    return (
        <div /* key={offer.id} */ className="ad__wrapper">
            <div className="ad__check">
                <label className="checkbox">
                    <input 
                        type="checkbox" 
                        onChange={(event) => handleChange(event.target.checked) }
                        checked={check}
                    />
                    <div className="checkbox__text"></div>
                </label>
            </div>
            <a  className="ad_slider"  >
                <Swiper
                    navigation={true}
                    pagination={{type: "fraction"}}
                    onActiveIndexChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                    className="mySwiper2 admin-page-swiper"
                    onSwiper={setCardSwiper}
                >
                    {photos.map( (img, index) => (
                        <SwiperSlide key={index + offer.id} onClick={() =>{ setOpenModal(!openModal)}} >
                            <img src={`${STATIC_URL}/${img}`} alt="" style={{ width: "280px"}}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </a>
            <div className="ad__information">
                <div className="ad__information__blocks">
                    <div className="ad__information__left_block">
                        <div className="ad__information_price">{ToRubles(offer.price)}</div>
                        <div className="ad__information_title">{offer.title}</div>
                        <div className="ad__information_category">
                        {   
                            offer.category_id.split(',').map(category => {
                                return (
                                    <span key={category.id}>{category}</span>
                                );
                            })
                        }
                        </div>
                    </div>
                    <div className="ad__information__right_block">
                        <button onClick={() => setOpenWaitForm(!openWaitForm)} className="btn__reject">Отклонить</button>
                    </div>
                </div>
                <div className="ad__information__user">
                    { offer.userPhoto && <div className="ad__information__user_icon"> <img src={`${STATIC_URL}/${offer.userPhoto}`}/> </div> 
                      || <div className="ad__information__user_icon" style={{ backgroundColor: `${stringToColor(offer.name)}`}}> {initials(offer.name)} </div>
                    }
                    <div className="ad__information__user_name">
                        {offer.name}
                    </div>
                </div>
                <p value={index} className="ad__information__description ad_close">
                    {offer.description}
                </p>
                <button className="btn__loer_more" value={index} onClick={(e, index) => listRef(e, index)} >Развернуть</button>
                <Button className="btn__ad_add" onClick={() => fetchApprove([offer.id])}>Одобрить</Button>
            </div>
            {openModal && <CardSliderModal 
                            openModal={openModal} 
                            setOpenModal={setOpenModal}
                            photos={photos}
                            setActiveSlide={setActiveSlide}
                            cardSwiper={cardSwiper}
                            activeSlide={activeSlide}
                          />}
            <Dialog open={openWaitForm || false} onClose={() => setOpenWaitForm(!openWaitForm)} fullWidth maxWidth='md'>
                <RejectModal setOpenWaitForm={setOpenWaitForm}  reject={reject}/>
            </Dialog>
        </div>
    )
}

export default WaitingCard;