import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs, Pagination } from "swiper/core";
import { Modal } from "@material-ui/core";
import ProductModalCarousel from "./ProductModalCarousel";
import { useMedia } from "../hooks/useMedia";

SwiperCore.use([Navigation, Thumbs, Pagination,]);

export default function ProductCarousel({ photo }) {
	const [modal, setModal] = useState(false);
	const [data, setData] = useState(null);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const {matchesTablet, matchesMobile} = useMedia()
	useEffect(() => {
		setData(photo);
	},[photo])

	const [sliderProps, setSliderProps] = useState({
		slidesPrevPhoto: false,
		sliderDot: false,
		sliderNavigation: true
	});

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

	const {slidesPrevPhoto, sliderDot, sliderNavigation} = sliderProps;


	const sliderClass = `mySwiper2 importantSlider ${sliderDot || photo.length > 1 && (matchesTablet || matchesMobile) ? '' : 'dotNone'} ${sliderNavigation ? '' : 'navigationNone'}`


	return (
		photo ? 
		<>
			<Swiper
				spaceBetween={10}
				pagination={{clickable: true, type: 'fraction'}}
				navigation={true}
				slidesPerView={1}
				className={sliderClass}
				thumbs={{swiper: thumbsSwiper}}
				>

				{/* <div className="seen__ad">Просмотрено</div> */}

				{data?.map((img, i) => (
					<SwiperSlide style={{minWidth: matchesMobile ? '100% !important' : '620px', width: '100% !important'}} key={i} onClick={() => setModal(!modal)}>
						{" "}
						<img src={img} />
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper 
				style={{display: slidesPrevPhoto && !matchesTablet && !matchesMobile ? 'block' : 'none', height: '88px'}}
				onSwiper={setThumbsSwiper}
				watchSlidesProgress={true}
				slidesPerView={6}
				// loop={true}
				spaceBetween={1}
				className="mySwiper2"
				>

				{/* <div className="seen__ad">Просмотрено</div> */}

				{data?.map((img, i) => (
					<SwiperSlide key={i}>
						{" "}
						<div style={{height: '88px'}}>
							<img style={{width: '100%', height: '100%'}} src={img} />
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<Modal className="productModal" open={modal || false} onClose={() => setModal(!modal)} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
				<><ProductModalCarousel photo={data} /></>
			</Modal>
		</> 
		: null
	);
}
