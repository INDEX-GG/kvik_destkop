import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs, Pagination } from "swiper/core";

SwiperCore.use([Navigation, Thumbs, Pagination]);

export default function ProductCarousel(objP) {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    let picData = objP.offerImg.map(pic => {
        return (
            <SwiperSlide> <img src={`${pic.offerpic}?${pic.id}`} /></SwiperSlide>
        )
    })
    return (
        <>
            <Swiper
                loop={true}
                spaceBetween={1}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                className="mySwiper2"
                pagination={{ "type": "fraction" }}
            >
                <div className='seen__ad'>Просмотрено</div>
                {picData}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={1}
                slidesPerView={6}
                freeMode={true}
                watchSlidesVisibility={true}
                watchSlidesProgress={true}
                className="mySwiper"
            >
                {picData}
            </Swiper>
        </>
    );
}