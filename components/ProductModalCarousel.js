import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";

SwiperCore.use([Navigation, Thumbs]);

export default function App({ photo }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  let arrImg = ["https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png", "https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300", "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"];


  return (
    <>
      <Swiper className="productSliderWrapper" loop={true} pagination={{ type: "fraction" }} autoHeight={true} thumbs={{ swiper: thumbsSwiper }}>
        {arrImg.map((img, i) => (
          <SwiperSlide key={i} className="productSliderItem">
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} slidesPerView={4} freeMode={true} watchSlidesVisibility={true} watchSlidesProgress={true} className="mySwiper productSliderNav">
        {arrImg.map((img, i) => (
          <SwiperSlide key={i} className="productSliderNavItem">
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
