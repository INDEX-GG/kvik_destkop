import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs, Controller } from "swiper/core";
import { useMedia } from "../hooks/useMedia";
import { Height } from "@material-ui/icons";

SwiperCore.use([Navigation, Thumbs, Controller]);

export default function ProductModalCarousel({ photo }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeSlide, setActiveSlide] = useState([]);
  const { matchesTablet, matchesMobile } = useMedia();

  let CarouselPag = { type: "fraction" };
  let CarouselInf = true;
  let SecondCarousel = true;

  useEffect(() => {
    const arr = [];
    if (photo != undefined) {
      for (let inner = 0; inner < JSON.parse(photo).photos.length; inner++) {
        if (inner == 0) {
          arr.push(true);
        } else {
          arr.push(false);
        }
      }
      setActiveSlide(arr);
    }
  }, []);

  function changeSlide(index, arr, setArr) {
    const newArr = arr.map((item, i) => (index == i ? true : false));
    setArr(newArr);
  }

  if (photo != undefined) {
    if (JSON.parse(photo).photos.length == 1) {
      CarouselPag = false;
      CarouselInf = false;
      SecondCarousel = false;
    }
  }

  return (
    <>
      <Swiper className="productSliderWrapper" thumbs={{ swiper: thumbsSwiper }} loop={CarouselInf} pagination={CarouselPag} navigation={true} centeredSlides={true} >
        {photo == undefined
          ? ""
          : JSON.parse(photo).photos.map((img, i) => (
              <SwiperSlide key={i} className="productSliderItem">
                <div style={{width: "100%", height: "100%"}}>
                  <img style={{objectFit: "contain", width: "100%", height: "100%"}} src={img} />
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      {SecondCarousel ? (
        <Swiper className="mySwiper productSliderNav" onSwiper={setThumbsSwiper} slidesPerView={"auto"} freeMode={true} watchSlidesVisibility={true}>
          {photo == undefined
            ? ""
            : JSON.parse(photo).photos.map((img, i) => (
                <SwiperSlide key={i} className="productSliderNavItem" onClick={() => changeSlide(i, activeSlide, setActiveSlide)}>
                  <img src={img} style={{ border: activeSlide[i] ? "6px solid #52b9c5" : "none", borderRadius: "5px" }} />
                </SwiperSlide>
              ))}
        </Swiper>
      ) : null}
    </>
  );
}
