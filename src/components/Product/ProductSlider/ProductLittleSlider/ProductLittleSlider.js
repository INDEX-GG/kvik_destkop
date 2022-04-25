import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useProductSliderStyles } from "../styles";
import Image from "next/image";
const ProductLittleSlider = ({ swiperAction, isMobile, photos }) => {
  const classes = useProductSliderStyles();
  const { setThumbsSwiper, littleSwiperClass, slidesPrevPhoto } = swiperAction;

  return (
    slidesPrevPhoto && (
      <Swiper
        onSwiper={setThumbsSwiper}
        watchSlidesProgress={true}
        slidesPerView={6}
        spaceBetween={1}
        className={littleSwiperClass}
      >
        {!isMobile &&
          photos.map((img) => (
            <SwiperSlide key={img}>
              <div
                className={classes.swiperLittleSlideImg}
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image src={img} alt="" layout="fill" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    )
  );
};

export default React.memo(ProductLittleSlider);
