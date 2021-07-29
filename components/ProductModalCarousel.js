import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";

SwiperCore.use([Navigation, Thumbs]);

export default function ProductModalCarousel({ photo }) {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeSlide , setActiveSlide] = useState([])
  const [controlledSwiper, setControlledSwiper] = useState(null)
  
  let CarouselPag = { type: "fraction" }
  let CarouselInf = true
  let SecondCarousel = true

  useEffect(() => {
    const arr = []
    if (photo != undefined) {
      for (let inner = 0; inner < JSON.parse(photo).photos.length; inner++) {
        if (inner == 0) {
          arr.push(true)
        } else {
          arr.push(false)
        }
      }
      setActiveSlide(arr)
    }
  }, [])


  function changeSlide(index, arr, setArr) {
    const newArr = arr.map((item, i) => index == i ? true : false)
    setArr(newArr)
  }


  if (photo != undefined) {
    if (JSON.parse(photo).photos.length == 1) {
      CarouselPag = false
      CarouselInf = false
      SecondCarousel = false
    }
  }

  return (
    <>
      <Swiper className="productSliderWrapper" loop={CarouselInf} pagination={CarouselPag} navigation={true} autoHeight={true} thumbs={{ swiper: thumbsSwiper }} centeredSlides={true}>
        {photo == undefined
          ? ""
          : JSON.parse(photo).photos.map((img, i) => (
            <SwiperSlide key={i} className="productSliderItem">
              <img src={img} />
            </SwiperSlide>
          ))}
      </Swiper>
      {SecondCarousel ? 
      (
        <Swiper className="mySwiper productSliderNav" onSwiper={setThumbsSwiper} slidesPerView={"auto"}  slidesPerView={"auto"} freeMode={true} watchSlidesVisibility={true} >
        {photo == undefined
          ? ""
          : JSON.parse(photo).photos.map((img, i) => (
            <SwiperSlide key={i} className="productSliderNavItem" onClick={() => changeSlide(i, activeSlide, setActiveSlide)}>
              <img src={img} style={{border: activeSlide[i] ? "6px solid #52b9c5" : "none", borderRadius: "5px"}}/>
            </SwiperSlide>
          ))}
      </Swiper>
      ) : null}
    </>
  );
}
