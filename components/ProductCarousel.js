import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs, Pagination } from "swiper/core";
import { Modal } from "@material-ui/core";
import ProductModalCarousel from "./ProductModalCarousel";
SwiperCore.use([Navigation, Thumbs, Pagination,]);

export default function ProductCarousel({ photo }) {
	// const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [modal, setModal] = useState(false);
	// let settingsCarousele = true
	// let paginationCarousel = { type: "fraction" }
	const [data, setData] = useState(null);

	useEffect(() => {
		setData(photo);
	}, [photo])

	return (
		<>
			{
				<>
					<Swiper
						className="mySwiper2"
						loop={true}
						spaceBetween={0}
						navigation={true}
					// thumbs={{ swiper: thumbsSwiper }}
					// pagination={paginationCarousel}
					>

						{/* <div className="seen__ad">Просмотрено</div> */}

						{data?.map((img, i) => (
							<SwiperSlide key={i} onClick={() => setModal(!modal)}>
								<img src={img} />
							</SwiperSlide>
						))}
					</Swiper>
					{/* <Swiper
						className="mySwiper"
						onSwiper={setThumbsSwiper}
						loop={true}
						spaceBetween={1}
						slidesPerView={6}
						freeMode={true}
						// watchSlidesVisibility={true}
						watchSlidesProgress={true}

					>
						{data?.map((img, i) => (
							<SwiperSlide key={i}>
								<img src={img} />
							</SwiperSlide>
						))}
					</Swiper> */}
				</>
			}


			<Modal className="productModal" open={modal} onClose={() => setModal(!modal)} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
				<ProductModalCarousel photo={data} />
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
