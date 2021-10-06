import React from 'react'
import { Modal } from '@material-ui/core';
import { Swiper, SwiperSlide } from "swiper/react";
import { STATIC_URL } from "../../../../lib/constants";




function CardSliderModal({openModal, setOpenModal, photos, setActiveSlide, cardSwiper, activeSlide}) {
    
    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
    const [modalSwiper, setModalSwiper] = React.useState(null);

    if (modalSwiper) {
        modalSwiper.slideTo(activeSlide, 0);
    }

    return (
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
    )
}

export default CardSliderModal
