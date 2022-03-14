import React, { useState, useEffect } from "react";
import SwiperCore, { Navigation, Thumbs, Pagination } from "swiper/core";
// import { useRouter } from "next/dist/client/router"
import clsx from "clsx";

import {useProductContext} from "../../../context/ProductContext";
import {Box, Modal} from "@material-ui/core";
import ProductModalSlider from "./ProductModalSlider/ProductModalSlider";
import {useProductSliderStyles} from "./styles";
import ProductMainSlider from "./ProductMainSlider/ProductMainSlider";
import ProductLittleSlider from './ProductLittleSlider/ProductLittleSlider'
import {usePlugImages} from '#hooks/usePlugImages'
import AdCardPng from '#components/AdCardPng'

SwiperCore.use([Navigation, Thumbs, Pagination,]);

const ProductSlider = ({ mobile = false }) => {

    // const router = useRouter()
    const {productData: {photo, status, category_id}, isMobile} = useProductContext();
    const classes = useProductSliderStyles(mobile);

    const {arr} = usePlugImages(photo, category_id)

    const [modalOpen, setModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [sliderProps, setSliderProps] = useState({
        slidesPrevPhoto: false,
        sliderDot: false,
        sliderNavigation: true
    });

    const {slidesPrevPhoto, sliderDot, sliderNavigation} = sliderProps;
    const sliderClass = `${classes.mySwiper2}
    ${sliderDot || photo?.length > 1 && isMobile ? '' : classes.dotNone} ${sliderNavigation ? '' : classes.navigationNone}`
    const littleSwiperClass = [`mySwiper2 ${classes.swiperLittleSlide} ${isMobile && classes.swiperNone} ${slidesPrevPhoto > 1 ? '' : classes.swiperNone}`];

    const handleChangeModal = (state) => {
        return () => {
            setModalOpen(state);
        }
    }

    useEffect(() => {
        if (photo) {
            const photoLength = photo.length
            firstSwiper?.slideTo(0, 1)
            if (photoLength > 6) {
                setSliderProps({slidesPrevPhoto: 6, sliderDot: true, sliderNavigation: true})
                return;
            }
            if (photoLength >  1 && photoLength <= 6) {
                setSliderProps({slidesPrevPhoto : 3, sliderDot: true, sliderNavigation: true})
                return;
            }
            setSliderProps({slidesPrevPhoto : 1, sliderDot: false, sliderNavigation: false})
        }
    }, [photo])

    // useEffect(() => {
    //     firstSwiper?.slideTo(0, 1)
    // }, [router])

    useEffect(() => {
        firstSwiper?.slideTo(activeIndex, 0)
    }, [activeIndex])

    return (
        <Box component='section' className={clsx(
            classes.swiperContainer, {
                [classes.opacityImage]: status === 'no_active',
            }
        )} >
            {photo ?
                <Box>
                    <ProductMainSlider
                        photos={photo}
                        handleChangeModal={handleChangeModal}
                        swiperAction={{
                            setFirstSwiper,
                            setActiveIndex,
                            sliderClass,
                            thumbsSwiper,
                        }}
                    />
                    <ProductLittleSlider
                        photos={photo}
                        isMobile={isMobile}
                        swiperAction={{
                            setThumbsSwiper,
                            littleSwiperClass,
                            slidesPrevPhoto
                        }}
                    />
                    <Modal
                        open={modalOpen}
                        className={classes.sliderModal}
                        onClose={handleChangeModal(false)}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description">
                        <>
                            <Box
                                className={classes.sliderModalPosition}
                                onClick={handleChangeModal(false)}
                            >
                                <Box className={classes.modalSliderClose}/>
                            </Box>
                            <ProductModalSlider
                                activeSlideIndex={activeIndex}
                                setActiveSlideIndex={setActiveIndex}
                                photos={photo}
                            />
                        </>
                    </Modal>
                </Box>
                // :<Box className="placeholder_animation product__placeholder_swipers"/>
                : <AdCardPng title={arr[0].title} height='400px' bigImage={true} />
            }
        </Box>
    );
}

export default React.memo(ProductSlider);
