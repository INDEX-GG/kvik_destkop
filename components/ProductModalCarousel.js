import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Keyboard } from "swiper/core";

SwiperCore.use([Navigation, Keyboard]);

/**
 * @typedef ProductModalCarousel
 * @property {string[]} photos
 * @property {number} activeSlideIndex
 * @property {number} setActiveSlideIndex
 */

/**
 * @param {ProductModalCarousel} props
 */
export default function ProductModalCarousel({ photos, activeSlideIndex, setActiveSlideIndex }) {
	 
	/**
	 * @type { [number, React.Dispatch < React.SetStateAction < number[] >>] }
	 */
	const [activeSlide, setActiveSlide] = useState([]);

	/**
	 * @type { [SwiperCore, Dispatch < SwiperCore>] }
	 */
	const [firstSwiper, setFirstSwiper] = useState(null);
	/**
	 * @type {[SwiperCore, Dispatch < SwiperCore>]}
	 */
	const [secondSwiper, setSecondSwiper] = useState(null);
	const [wrapperClassName, changeWrapperClassName] = useState("productSliderWrapper")
	const hasPhotos = Boolean(photos?.length);
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
			CarouselPagination = false;
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

	/**
	 * @param {SwiperCore} swiper 
	 */
	const changeSwiperOne = (swiper) => {
		if (firstSwiper && secondSwiper) {
			secondSwiper.slideTo(swiper.activeIndex, 1000)
			setActiveSlideIndex(swiper.activeIndex)
			changeSlide(swiper.activeIndex)
		}
	}

	/**
	 * @param {Event} event 
	 */
	const changeSwiperTwo = (event) => {
		if (firstSwiper && secondSwiper) {
			const slide = event.target.getAttribute('id')
			firstSwiper.slideTo(slide, 1000)
			secondSwiper.slideTo(slide, 1000)
			setActiveSlideIndex(slide)
			changeSlide(slide)
		}
	}

	/**
	 * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event
	 */
	const handlerSwiperButtonVisibility = (event) => {
		event.stopPropagation();
		const wrapper = event.currentTarget;

		if (event.clientX <= wrapper.clientWidth / 2) {
			changeWrapperClassName("productSliderWrapper productSliderWrapper--prev")
		} else if (event.clientX > wrapper.clientWidth / 2) {
			changeWrapperClassName("productSliderWrapper productSliderWrapper--next")
		} else {
			changeWrapperClassName("productSliderWrapper")
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
				
			>
				{hasPhotos && photos.map((img, index) => (
					<SwiperSlide 
						key={index} 
						className="productSliderItem"
						onMouseMove={handlerSwiperButtonVisibility}
					>
						<div 
							style={{ 
								width: "100%", 
								height: "100%" 
							}}
						>
							<img 
								style={{ 
									objectFit: "contain", 
									width: "100%", 
									height: "100%" 
								}} 
								src={img} 
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			{hasSecondCarousel && (
				<Swiper 
					className="mySwiper productSliderNav"
					onSwiper={setSecondSwiper}
					slidesPerView={"auto"}
					slideToClickedSlide={true}
				// watchSlidesVisibility={true}
				>
					{hasPhotos && photos.map((img, index) => (
						// onClick={() => changeSlide(i, activeSlide, setActiveSlide)}
						<SwiperSlide
							key={index}
							id={index}
							className="productSliderNavItem"
							onClick={changeSwiperTwo}
						>
							<img
								src={img}
								// TODO: перенести в стили
								style={{ 
									border: activeSlide[index] 
										? "2px solid hsl(186, 50%, 55%)" 
										: "2px solid transparent",
									borderRadius: "2px"
								}}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</>
	);
}
