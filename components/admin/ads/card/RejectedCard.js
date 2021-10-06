import React from 'react'
import { ToRubles } from '../../../../lib/services';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Thumbs } from "swiper/core";
import { Modal } from '@material-ui/core';
import { STATIC_URL } from "../../../../lib/constants";

SwiperCore.use( [ Pagination, Navigation, Thumbs ] );

function RejectedCard({offer}) {
    const {photos} = JSON.parse(offer.photo)
    const [cardSwiper, setCardSwiper] = React.useState(null);
    const [modalSwiper, setModalSwiper] = React.useState(null);
    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
    const [activeSlide, setActiveSlide] = React.useState(0);

    const [openModal, setOpenModal] = React.useState(false);

    const listRef = (e) => {
        const adInformation = document.querySelectorAll(".ad__information__description")[e.target.value]
        const loerMore = document.querySelectorAll(".btn__loer_more")[e.target.value]
        loerMore.classList.toggle("btn__loer_more-open");
        adInformation.classList.toggle("ad_close");
        if (adInformation.classList.contains('ad_close')) {
           loerMore.innerHTML = 'Развернуть';
        }
        else {
           loerMore.innerHTML = "Скрыть";
        }
    }

    if (modalSwiper) {
        modalSwiper.slideTo(activeSlide, 0);
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
                <p /* value={index} */ className={"ad__information__description ad_close"}>
                    {offer.description}
                </p>
                <button className="btn__loer_more" /* value={index} */ onClick={(e) => listRef(e)}  >Развернуть</button>
                <p className="description__rejected">Отклонено по причине: <span>Указана контактная информация в названии, тексте или на изображени, еще причина и еще причина</span> </p>
            </div>
            <Modal
                open={openModal}
                onClose={() => {
                    setOpenModal(!openModal); 
                    setThumbsSwiper(null); 
                    cardSwiper.slideTo(activeSlide, 0);
                }}
                className="productModal"
            >
                <>
                    <Swiper
                        className="productSliderWrapper"
                        navigation={true}
                        slidesPerView={1}
                        onSwiper={setModalSwiper}
                        onActiveIndexChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                        thumbs={{swiper: thumbsSwiper}}
                    >
                        {photos.map( (item, index) => (
                            <SwiperSlide key={index} >
                                <img src={`${STATIC_URL}/${item}`} alt="" style={{objectFit: "contain", width: "100%", height: "100%"}}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        className="mySwiper productSliderNav admin-page_modal-swiper"
                        style={{ height: '88px', display: "block"}}
                        spaceBetween={1}
                        slideToClickedSlide={true}
                        slidesPerView={'auto'}
                        watchSlidesProgress={true}
                    >
                        {photos.map( (item, index) => (
                            <SwiperSlide key={index} className="productSliderNavItem">
                                <img src={`${STATIC_URL}/${item}`} alt="" style={{ height: "88px"}}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            </Modal>
        </div>
    )
}

export default RejectedCard
