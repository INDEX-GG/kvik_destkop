import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Keyboard } from "swiper/core";

SwiperCore.use([Navigation, Keyboard]);

/**
 * @typedef ProductModalCarousel
 * @property {[]} photos
 * @property {number} activeSlideIndex
 * @property {number} setActiveSlideIndex
 */

/**
 * 
 * @param {ProductModalCarousel} props
 * @returns 
 */
export default function ProductModalCarousel({ photos, activeSlideIndex, setActiveSlideIndex }) {
	const [activeSlide, setActiveSlide] = useState([]);
	const [firstSwiper, setFirstSwiper] = useState(null);
	const [secondSwiper, setSecondSwiper] = useState(null);
	const hasPhotos = Boolean(photos?.length);
	let CarouselPag = { type: "fraction" };
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

	/**
	 * @param {number} sliderIndex 
	 */
	function changeSlide(sliderIndex) {
		const newArr = activeSlide.map((item, index) => (sliderIndex == index ? true : false));
		setActiveSlide(newArr);
	}

	useEffect(() => {
		if (firstSwiper) firstSwiper?.slideTo(activeSlideIndex, 0)
	}, [firstSwiper, activeSlideIndex])

	if (hasPhotos) {
		if (photos.length == 1) {
			CarouselPag = false;
			CarouselNav = false;
			hasSecondCarousel = false;
		}
	}

	/**
	 * @param {SwiperCore} swiper 
	 */
	const firstSwiperInit = (swiper) => {
		setFirstSwiper(swiper)
		if (firstSwiper) firstSwiper.slideTo(activeSlideIndex, 0)
	}


	const changeSwiperOne = (swiper) => {
		if (firstSwiper && secondSwiper) {
			secondSwiper.slideTo(swiper.activeIndex, 1000)
			setActiveSlideIndex(swiper.activeIndex)
			changeSlide(swiper.activeIndex)
		}
	}

	const changeSwiperTwo = (e) => {
		if (firstSwiper && secondSwiper) {
			const slide = e.target.getAttribute('id')
			firstSwiper.slideTo(slide, 1000)
			secondSwiper.slideTo(slide, 1000)
			setActiveSlideIndex(slide)
			changeSlide(slide)
		}
	}

	return (
		<>
			<Swiper
				className="productSliderWrapper"
				onSwiper={firstSwiperInit}
				onActiveIndexChange={changeSwiperOne}
				pagination={CarouselPag}
				navigation={CarouselNav}
				keyboard={{ enabled: true }}
				centeredSlides={true}
			>
				{hasPhotos && photos.map((img, i) => (
					<SwiperSlide key={i} className="productSliderItem">
						<div style={{ width: "100%", height: "100%" }}>
							<img style={{ objectFit: "contain", width: "100%", height: "100%" }} src={img} />
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			{hasSecondCarousel && (
				<Swiper className="mySwiper productSliderNav"
					onSwiper={setSecondSwiper}
					slidesPerView={"auto"}
					slideToClickedSlide={true}
				// watchSlidesVisibility={true}
				>
					{hasPhotos && photos.map((img, i) => (
						// onClick={() => changeSlide(i, activeSlide, setActiveSlide)}
						<SwiperSlide key={i} id={i} className="productSliderNavItem" onClick={changeSwiperTwo}>
							<img src={img} style={{ border: activeSlide[i] ? "6px solid #52b9c5" : "none", borderRadius: "5px" }} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</>
	);
}
