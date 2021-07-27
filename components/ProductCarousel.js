import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs, Pagination } from "swiper/core";
import { Modal } from "@material-ui/core";
import ProductModalCarousel from "./ProductModalCarousel";
SwiperCore.use([Navigation, Thumbs, Pagination,]);

export default function ProductCarousel({ photo }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modal, setModal] = useState(false);

  let settingsCarousele = true
  let paginationCarousel = { type: "fraction" }
  if (photo == undefined) {
    return null;
  } else {
    if (JSON.parse(photo).photos.length == 1) {
      settingsCarousele = false
      paginationCarousel = false
    }
  }

  return (
    <>
      <Swiper loop={settingsCarousele} spaceBetween={1} navigation={settingsCarousele} thumbs={{ swiper: thumbsSwiper }} className="mySwiper2" pagination={paginationCarousel}>
        {/* <div className="seen__ad">Просмотрено</div> */}

        {photo == undefined
          ? ""
          : JSON.parse(photo).photos.map((img, i) => (
            <SwiperSlide key={i} onClick={() => setModal(!modal)}>
              {" "}
              <img src={img} />
            </SwiperSlide>
          ))}
      </Swiper>

      {photo == undefined ? "" : JSON.parse(photo).photos.length > 6 ? (<Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={1} slidesPerView={6} freeMode={true} watchSlidesVisibility={true} watchSlidesProgress={true} className="mySwiper">
        {photo == undefined
          ? ""
          : JSON.parse(photo).photos.map((img, i) => (
            <SwiperSlide key={i}>
              {" "}
              <img src={img} />
            </SwiperSlide>
          ))}
      </Swiper>) : null}
      <Modal className="productModal" open={modal} onClose={() => setModal(!modal)} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">

        <ProductModalCarousel photo={photo} />

      </Modal>
    </>
  );
}
