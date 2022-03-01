import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {useProductSliderStyles} from "../styles";

const ProductLittleSlider = ({swiperAction, isMobile, photos}) => {

    const classes = useProductSliderStyles();
    const {setThumbsSwiper, littleSwiperClass, slidesPrevPhoto} = swiperAction

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
                    photos.map(img => (
                        <SwiperSlide key={img}>
                            <img className={classes.swiperLittleSlideImg} src={img} alt=''/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        )
    );
};

export default React.memo(ProductLittleSlider);
