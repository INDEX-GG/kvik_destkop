import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs, Pagination } from "swiper/core";
import { Dialog, Modal } from "@material-ui/core";
import ProductModalCarousel from "./ProductModalCarousel";
SwiperCore.use([Navigation, Thumbs, Pagination,]);

export default function ProductCarousel({ photo }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [modal, setModal] = useState(false);
	const [imageModal, setImageModal] = useState(false)

	let settingsCarousele = true
	let paginationCarousel = { type: "fraction" }
	if (photo == undefined) {
		return null;
	} else {
		if (photo.length == 1) {
			settingsCarousele = false
			paginationCarousel = false
		}
	}
	if (photo.length === 1) {
		return (
			<>
				<div onClick={() => setImageModal(!imageModal)} className='mySwiper2_photo'>
					<img className='productPage_photo' src={photo[0]} />
				</div>
				<Dialog open={imageModal || false} maxWidth='sm' onClose={() => setImageModal(!imageModal)}>
					<img className='productPage_photo' src={photo[0]} />
				</Dialog>
			</>
		);
	}

	return (
		<>
			<Swiper loop={settingsCarousele} spaceBetween={1} navigation={settingsCarousele} thumbs={{ swiper: thumbsSwiper }} className="mySwiper2" pagination={paginationCarousel}>
				{/* <div className="seen__ad">Просмотрено</div> */}

				{photo == undefined
					? ""
					: photo.map((img, i) => (
						<SwiperSlide key={i} onClick={() => setModal(!modal)}>
							{" "}
							<img src={img} />
						</SwiperSlide>
					))}
			</Swiper>

			{/* {photo == undefined ? "" : photo.length > 6 ? ( */}
			<Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={1} slidesPerView={6} freeMode={true} watchSlidesVisibility={true} watchSlidesProgress={true} className="mySwiper">

				{photo == undefined
					? ""
					: photo.map((img, i) => (
						<SwiperSlide key={i}>
							{" "}
							<img src={img} />
						</SwiperSlide>
					))}
			</Swiper>
			{/* ) : null} */}
			<Modal className="productModal" open={modal || false} onClose={() => setModal(!modal)} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
				<><ProductModalCarousel photo={photo} /></>
			</Modal>
		</>
	);
}
