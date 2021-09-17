import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs, Pagination } from "swiper/core";
import { Modal } from "@material-ui/core";
import ProductModalCarousel from "./ProductModalCarousel";
import { useMedia } from "../hooks/useMedia";
import { useRouter } from "next/dist/client/router";

SwiperCore.use([Navigation, Thumbs, Pagination,]);

export default function ProductCarousel({ title, photo, mobile = false }) {
	const [modal, setModal] = useState(false);
	const [data, setData] = useState(null);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const {matchesTablet, matchesMobile} = useMedia()
	const [firstSwiper, setFirstSwiper] = useState(null);
	const router = useRouter()
	const [sliderProps, setSliderProps] = useState({
		slidesPrevPhoto: false,
		sliderDot: false,
		sliderNavigation: true
	});
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		setData(photo);
	},[photo])
	
	useEffect(() => {
		if (photo) {
			if (photo.length > 6) {
				setSliderProps({slidesPrevPhoto: 6, sliderDot: false, sliderNavigation: true})
			} else if (photo.length >  1 && photo.length <= 6) {
				setSliderProps({slidesPrevPhoto : false, sliderDot: true, sliderNavigation: true})
			} else {
				setSliderProps({slidesPrevPhoto : false, sliderDot: false, sliderNavigation: false})
			}
		}
	}, [photo])

	useEffect(() => {
		if (firstSwiper) firstSwiper?.slideTo(activeIndex, 0)
	}, [activeIndex])


	useEffect(() => {
		if (firstSwiper) {
			firstSwiper.slideTo(0, 1)
		}
	}, [router])

	const {slidesPrevPhoto, sliderDot, sliderNavigation} = sliderProps;


	const sliderClass = `mySwiper2 importantSlider ${sliderDot || photo?.length > 1 && (matchesTablet || matchesMobile) ? '' : 'dotNone'} ${sliderNavigation ? '' : 'navigationNone'}`

	return (
		<div style={{display: 'flex', flexDirection: mobile ? 'column-reverse' : 'column'}}>
			{title == undefined ? 
			<div className="placeholder_animation product__placeholder_title"></div>
			: <div className="productPageTitle xl">{title}</div>}
			{photo ? 
				<div>
					<Swiper
						onSwiper={setFirstSwiper}
						onActiveIndexChange={(swiper) => {setActiveIndex(swiper.activeIndex)}}
						spaceBetween={10}
						pagination={{clickable: true, type: 'fraction'}}
						navigation={true}
						slidesPerView={1}
						className={sliderClass}
						followFinger={data && data.length > 1 ? true : false}
						thumbs={{swiper: thumbsSwiper}}
						>
						{/* <div className="seen__ad">Просмотрено</div> */}
						{data?.map((img, i) => (
							<SwiperSlide className='importantSlide' key={i} onClick={() => setModal(!modal)}>
								<img src={img} />
							</SwiperSlide>
						))}
					</Swiper>
					{slidesPrevPhoto &&
					<Swiper 
						style={{ height: '88px', display: "block"}}
						onSwiper={setThumbsSwiper}
						watchSlidesProgress={true}
						slidesPerView={6}
						spaceBetween={1}
						className="mySwiper2"
						>
						{/* <div className="seen__ad">Просмотрено</div> */}
						{!matchesTablet && !matchesMobile ? 
						data.map((img, i) => (
							<SwiperSlide key={i}>
								<div>
									<img style={{ height: '88px', }} src={img} />
								</div>
							</SwiperSlide>
						)) : null}
					</Swiper>
					}

					<Modal className="productModal" open={modal || false} onClose={() => setModal(!modal)} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
						<>
							<div onClick={() => setModal(false)} style={{position: 'absolute', zIndex: '100', top: '0', right: 0, width: '100%'}}>
								<div className='productClose'></div>
							</div>
							<ProductModalCarousel activeSlideIndex={activeIndex} setActiveSlideIndex={setActiveIndex} photos={data} />
						</>
					</Modal>
				</div> 
				: <div className="placeholder_animation product__placeholder_swipers"></div>}
		</div>
	);
}
