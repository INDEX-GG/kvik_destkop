import { useState } from "react";
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
    if (photo.length == 1) {
      settingsCarousele = false
      paginationCarousel = false
    }
  }
  if (photo.length === 1) {
	  return <img className='mySwiper2_photo' src={photo[0]} />
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
			{console.log('1 ', thumbsSwiper)}
      {/* {photo == undefined ? "" : photo.length > 6 ? ( */}
	  <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={1} slidesPerView={6} freeMode={true} watchSlidesVisibility={true} watchSlidesProgress={true} className="mySwiper">
	  {console.log('2')}
		{photo == undefined
          ? ""
          : photo.map((img, i) => (
            <SwiperSlide key={i}>
              {" "}{console.log('3')}
              <img src={img} />
            </SwiperSlide>
          ))}
      </Swiper>
	  {/* ) : null} */}
      <Modal className="productModal" open={modal} onClose={() => setModal(!modal)} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <ProductModalCarousel photo={photo} />
      </Modal>
    </>
  );
}
