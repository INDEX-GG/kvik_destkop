import { Box } from "@material-ui/core";
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
              <Box className={classes.swiperLittleSlideImg}>
                <Image src={img} alt="" layout="fill" objectFit="cover" />
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    )
  );
};

export default React.memo(ProductLittleSlider);
