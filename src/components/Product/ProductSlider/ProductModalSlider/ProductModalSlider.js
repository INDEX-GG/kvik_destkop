import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Keyboard } from "swiper/core";
import clsx from 'clsx'
import {useProductModalStyles} from './style'

SwiperCore.use([Navigation, Keyboard]);

const ProductModalSlider = ({ photos, activeSlideIndex, setActiveSlideIndex }) => {

    const classes = useProductModalStyles()

    const [activeSlide, setActiveSlide] = useState([]);
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);
    const [wrapperClassName, changeWrapperClassName] = useState(`${classes.productSliderWrapper}`)
    const hasPhotos = !!photos?.length;
    let CarouselPagination = { type: "fraction" };
    let CarouselNav = true;
    let hasSecondCarousel = true;

    useEffect(() => {
        const arr = [];
        if (hasPhotos) {
            for (let inner = 0; inner < photos.length; inner++) {
                if (inner == 0) {
                    arr.push(true);
                } else {
                    arr.push(false);
                }
            }
            setActiveSlide(arr);
        }
    }, []);

    function changeSlide(sliderIndex) {
        const newArr = activeSlide.map((item, index) => (sliderIndex === index));
        setActiveSlide(newArr);
    }

    useEffect(() => {
        if (firstSwiper) firstSwiper?.slideTo(activeSlideIndex, 0)
    }, [firstSwiper, activeSlideIndex])

    if (hasPhotos) {
        if (photos.length == 1) {
            CarouselPagination = false;
            CarouselNav = false;
            hasSecondCarousel = false;
        }
    }

    const firstSwiperInit = (swiper) => {
        setFirstSwiper(swiper)
        if (firstSwiper) firstSwiper.slideTo(activeSlideIndex, 0)
    }

    const changeSwiperOne = (swiper) => {
        if (firstSwiper && secondSwiper) {
            secondSwiper.slideTo(swiper.activeIndex, 500)
            setActiveSlideIndex(swiper.activeIndex)
            changeSlide(swiper.activeIndex)
        }
    }

    const changeSwiperTwo = (event) => {
        if (firstSwiper && secondSwiper) {
            const slide = event.target.getAttribute('id')
            firstSwiper.slideTo(slide, 500)
            secondSwiper.slideTo(slide, 500)
            setActiveSlideIndex(slide)
            changeSlide(slide)
        }
    }

    const handlerSwiperButtonVisibility = (event) => {
        event.stopPropagation();
        const wrapper = event.currentTarget;

        if (event.clientX <= wrapper.clientWidth / 2) {
            // changeWrapperClassName("productSliderWrapper productSliderWrapper--prev")
            changeWrapperClassName(`${classes.productSliderWrapper} ${classes.productSlideWrapperPrev}`)
        } else if (event.clientX > wrapper.clientWidth / 2) {
            // changeWrapperClassName("productSliderWrapper productSliderWrapper--next")
            changeWrapperClassName(`${classes.productSliderWrapper} ${classes.productSlideWrapperNext}`)
        } else {
            changeWrapperClassName(`${classes.productSliderWrapper}`)
        }
    }

    return (
        <>
            <Swiper
                className={wrapperClassName}
                onSwiper={firstSwiperInit}
                onActiveIndexChange={changeSwiperOne}
                pagination={CarouselPagination}
                navigation={CarouselNav}
                keyboard={{ enabled: true }}
                centeredSlides={true}
                hideOnClick={false}
            >
                {hasPhotos && photos.map((img, index) => (
                    <SwiperSlide
                        key={index}
                        className={classes.productSliderItem}
                        onMouseMove={handlerSwiperButtonVisibility}
                    >
                        <div
                            className={classes.fullWidthHeight}
                        >
                            <img
                                className={clsx(classes.fullWidthHeight, classes.objectFitContain)}
                                src={img}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {hasSecondCarousel && (
                <Swiper
                    className={clsx(classes.mySwiper, classes.productSliderNav)}
                    onSwiper={setSecondSwiper}
                    slideToClickedSlide={true}
                    slidesPerView='9'
                    centerInsufficientSlides={true}
                    // watchSlidesVisibility={true}
                >
                    {hasPhotos && photos.map((img, index) => (
                        // onClick={() => changeSlide(i, activeSlide, setActiveSlide)}
                        <SwiperSlide
                            key={index}
                            id={index}
                            className={classes.productSliderNavItem}
                            onClick={changeSwiperTwo}
                        >
                            <img
                                className={classes.productSliderNavItemImg}
                                src={img}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </>
    );
}

export default React.memo(ProductModalSlider);
