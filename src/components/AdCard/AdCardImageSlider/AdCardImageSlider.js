import React, {useRef, useEffect, useCallback} from 'react'
import {Box} from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Lazy } from 'swiper';
import clsx from 'clsx'

import {useStatistics} from '../../../../lib/Context/StatisticsCTX'

import {AdCardImageSliderStyles} from "./style";

SwiperCore.use([Pagination, Lazy]);

const AdCardImageSlider = ({offer_id, offer_photo, screenIsMobile}) => {
	const classes = AdCardImageSliderStyles()
	const {addSlideView} = useStatistics()

  const currentSwiper = useRef();
	const currentSlide = useRef(); // для слайдов в swiper

  console.log('offer_photo: ', offer_photo)

  	// перемещение слайдов по движению мыши
	useEffect(() => {
		// если фото более 2 и не мобилка
		if (offer_photo?.length >= 2 && !screenIsMobile && typeof currentSlide.current !== 'undefined' ) {
			const sections = [...currentSlide.current.children]
			sections.forEach(element => {
				element.addEventListener('mouseenter', mouseEnter)
				element.addEventListener('mouseleave', mouseLeave)
			})

			return () => sections.forEach(e => {
				e.removeEventListener('mouseenter', mouseEnter)
				e.removeEventListener('mouseleave', mouseLeave)
			})
		}
	}, [currentSwiper])

	const mouseEnter = useCallback((e) => {
		const target = +e.target.dataset.for
		if (currentSwiper.current !== null && currentSwiper.current.swiper !== null && typeof currentSwiper.current.swiper !== 'undefined') {
			currentSwiper.current.swiper.slideTo(target, 0)
		}
	})

	// eslint-disable-next-line
	const mouseLeave = useCallback((_) => {
		if (currentSwiper.current !== null && currentSwiper.current.swiper !== null && typeof currentSwiper.current.swiper !== 'undefined') {
			currentSwiper.current.swiper.slideTo(0, 0)
		}
	})

  return (
    <>
      {!screenIsMobile &&
        <Box
          ref={currentSlide}
          className={classes.mov_area}
          onMouseEnter={addSlideView(offer_id)}
        >
          {/* eslint-disable-next-line */}
          {Array.isArray(offer_photo) && offer_photo && (offer_photo?.slice(0, 5))?.map((_, i) => {
            <Box
              key={i}
              data-for={i}
              className={classes.mov_area__item}
              style={{
                width: `${Math.round(100 / (offer_photo.length > 5 ? 5 : offer_photo.length))}%`
              }}
            ></Box>
          })}
        </Box>
      }
      <Swiper
        // Enable lazy loading
        lazy={{
          //  tell swiper to load images before they appear
          loadPrevNext: true,
          // amount of images to load
          loadPrevNextAmount: 1,
        }}
        // Disable preloading of all images
        // preloadImages={false}
        ref={currentSwiper}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            if (index >= 5) return '';
            return '<span class="' + className + '">' + "</span>"
          }
        }}
        slidesPerView={1}
        style={{width: '100%', height: '100%',}}
        // onSlideChange={handlerSlideChange}
      >
        {Array.isArray(offer_photo) && offer_photo && (offer_photo?.slice(0, 5))?.map((img, i) => {
          return (
            <SwiperSlide key={i} style={{position: 'relative',}}>
              {/* после оптимизации приложения, див переписать на тег img */}
              <div
                style={{
                  // display: 'block',
                  // width: '100%',
                  // height: '100%',
                  // minHeight: '100%',
                  // objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  // border: '0'
                }}
                // alt="фото объявления"
                // src={`${img}`}
                // srt={true}
                // className={(i === 4 && (offer_photo.length - 5 > 0) ? classes.blur : null)}
                className={clsx((i === 4 && (offer_photo.length - 5 > 0) ? classes.blur : null), 'swiper-lazy')}
                onError={e => e.target.src = `${BASE_URL}/icons/photocard_placeholder.svg`}
              />
              {/* <img
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              /> */}

              {/* <div
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  filter: 'blur(20px)'
                }}
                className="imageBlur"
              >
              </div> */}
              {
                i === 4 && (offer_photo.length - 5 > 0) ?
                <div className={classes.morePhoto}>
                  <span className="morePhotoImage"></span>
                  <span className={classes.morePhotoText}>
                    Еще {offer_photo.length - 5} фото
                  </span>
                </div>
                : null
              }
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default React.memo(AdCardImageSlider)
