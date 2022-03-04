import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {useProductSliderStyles} from "../styles";

const ProductMainSlider = ({swiperAction, photos, handleChangeModal}) => {

    const {setFirstSwiper, setActiveIndex, sliderClass,  thumbsSwiper} = swiperAction;
    const classes = useProductSliderStyles();

    return (
        <Swiper
            onSwiper={setFirstSwiper}
            onActiveIndexChange={(swiper) => {setActiveIndex(swiper.activeIndex)}}
            spaceBetween={10}
            pagination={{clickable: true, type: 'fraction'}}
            navigation={true}
            slidesPerView='auto'
            className={sliderClass}
            followFinger={!!(photos && photos.length > 1)}
            thumbs={{swiper: thumbsSwiper}}
        >
            {photos?.map((img) => {
                return (
                    <SwiperSlide
                        key={img}
                        className={classes.swiperNormalSlide}
                        onClick={handleChangeModal(true)}
                    >
                        <img className={classes.swiperNormalSlideImg} src={img} alt='img'/>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    );
};

export default React.memo(ProductMainSlider);
