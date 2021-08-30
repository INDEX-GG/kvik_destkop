import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs, Pagination } from "swiper/core";
import { Modal } from "@material-ui/core";
import ProductModalCarousel from "./ProductModalCarousel";
SwiperCore.use([Navigation, Thumbs, Pagination,]);

export default function ProductCarousel({ photo }) {
	const [modal, setModal] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		setData(photo);
	},[photo])

	return (
		<>
			<Swiper
				loop={true}
				spaceBetween={1}
				navigation={true}
				className="mySwiper2"
				pagination={true}>

				{/* <div className="seen__ad">Просмотрено</div> */}

				{data?.map((img, i) => (
					<SwiperSlide key={i} onClick={() => setModal(!modal)}>
						{" "}
						<img src={img} />
					</SwiperSlide>
				))}
			</Swiper>

			<Modal className="productModal" open={modal || false} onClose={() => setModal(!modal)} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
				<><ProductModalCarousel photo={data} /></>
			</Modal>
		</>
	);
}
