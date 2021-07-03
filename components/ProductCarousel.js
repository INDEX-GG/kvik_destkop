import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs, Pagination } from "swiper/core";

SwiperCore.use([Navigation, Thumbs, Pagination]);

export default function ProductCarousel({photo}) {
    

   
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
/*   console.log(photo.photo.map((img, i) => {img}))   */

    /* const picData = JSON.parse(photo.photo).photos.map((img, i) => {
        return (
            
        )
    }) */
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
                {/* {picData} */}
                 {/* {JSON.parse(photo).photos.map((img, i) =><SwiperSlide> <img src={img} /></SwiperSlide>)} */}
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
              {/*   {picData} */}
                 {/* {JSON.parse(photo).photos.map((img, i) =><SwiperSlide> <img src={img} /></SwiperSlide>)} */}
            </Swiper>
        </>
    );
}