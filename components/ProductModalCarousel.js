import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";

SwiperCore.use([Navigation, Thumbs]);

export default function ProductModalCarousel({ photo }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper className="productSliderWrapper" loop={true} pagination={{ type: "fraction" }} autoHeight={true} thumbs={{ swiper: thumbsSwiper }}>
        {photo == undefined
          ? ""
          : JSON.parse(photo).photos.map((img, i) => (
            <SwiperSlide key={i} className="productSliderItem">
              <img src={img} />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} slidesPerView={4} freeMode={true} watchSlidesVisibility={true} watchSlidesProgress={true} className="mySwiper productSliderNav">
        {photo == undefined
          ? ""
          : JSON.parse(photo).photos.map((img, i) => (
            <SwiperSlide key={i} className="productSliderNavItem">
              <img src={img} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
