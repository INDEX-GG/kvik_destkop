import React from 'react'
import { ToRubles } from '../../../../lib/services';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Thumbs } from "swiper/core";
import CardSliderModal from "./CardSliderModal";
import verifyModerator from "../../../json/verifyModerator.json";
import { STATIC_URL } from "../../../../lib/constants";

SwiperCore.use( [ Pagination, Navigation, Thumbs ] );

function RejectedCard({offer, index}) {

    const {photos} = JSON.parse(offer.photo)
    const [cardSwiper, setCardSwiper] = React.useState(null);
    
    const [activeSlide, setActiveSlide] = React.useState(0);

    const [openModal, setOpenModal] = React.useState(false);

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

    
    return (
        <div className="ad__wrapper">
            <a className="ad_slider">
                <Swiper
                    navigation={true}
                    pagination={{type: "fraction"}}
                    className="mySwiper2 admin-page-swiper"
                    onActiveIndexChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                    onSwiper={setCardSwiper}
                >
                    {photos.map( (item, index) => (
                        <SwiperSlide key={index} onClick={() => setOpenModal(!openModal)}>
                            <img src={`${STATIC_URL}/${item}`} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                
                {/* <div className="ad__photo_count">1/{(offer.imgs).length}</div> */}
            </a>
            <div className="ad__information">
                <div className="ad__information__blocks">
                    <div className="ad__information__left_block">
                        <div className="ad__information_price">{ToRubles(offer.price)}</div>
                        <div className="ad__information_title">{offer.title}</div>
                        <div className="ad__information_category">
                        {
                            offer.category_id.split(",").map((category, i) => {
                                return (
                                    <span key={i}>{category}</span>
                                );
                            })
                        }
                        </div>
                    </div>
                    <div className="ad__information__right_block">
                    </div>
                </div>
                <div className="ad__information__user">
                    <div className="ad__information__user_icon"><img src={`${STATIC_URL}/${offer.userPhoto}`} /></div>
                    <div className="ad__information__user_name">
                        {offer.name}
                    </div>
                </div>
                <p value={index} className={"ad__information__description ad_close"}>
                    {offer.description}
                </p>
                <button className="btn__loer_more" value={index} onClick={(e, index) => listRef(e, index)}  >Развернуть</button>
                <p className="description__rejected">
                    Отклонено по причине: 
                    <span>
                        {offer.verify_moderator.verify.map( (item, index) => (
                            ` ${verifyModerator[item]}${index < offer.verify_moderator.verify.length - 1 ? " / " : ""}`      
                        ))}
                    </span> 
                </p>
            </div>
            {openModal && < CardSliderModal 
                openModal={openModal} 
                setOpenModal={setOpenModal}
                photos={photos}
                setActiveSlide={setActiveSlide}
                cardSwiper={cardSwiper}
                activeSlide={activeSlide}
            />}
        </div>
    )
}

export default RejectedCard;
