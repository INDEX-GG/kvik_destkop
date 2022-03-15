import React from 'react';
import {Box} from '@material-ui/core'
import {Swiper, SwiperSlide} from "swiper/react";

// import ProductCommentary from '../../ProductOptions/ProductCommentary/ProductCommentary'
import ProductLike from '../../ProductOptions/ProductLike/ProductLike'
import {useProductSliderStyles} from "../styles";

const ProductMainSlider = ({swiperAction, photos, productID, isMyAd, handleChangeModal}) => {

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
            <Box className={classes.options}>
                {/* <ProductCommentary
                    isMyAd={isMyAd}
                /> */}
                <ProductLike
                    productID={productID}
                    isMyAd={isMyAd}
                />
            </Box>
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
