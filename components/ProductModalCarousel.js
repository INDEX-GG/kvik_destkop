import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

export default function ProductModalCarousel({photos, activeSlideIndex, setActiveSlideIndex}) {
  const [activeSlide, setActiveSlide] = useState([]);
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  let CarouselPag = { type: "fraction" };
//   let CarouselInf = true;
  let SecondCarousel = true;

  useEffect(() => {
    const arr = [];
    if (photos != undefined) {
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

  function changeSlide(index) {
    const newArr = activeSlide.map((item, i) => (index == i ? true : false));
    setActiveSlide(newArr);
  }

  useEffect(() => {
	  if (firstSwiper) firstSwiper?.slideTo(activeSlideIndex, 0)
  }, [firstSwiper, activeSlideIndex])

  if (photos != undefined) {
    if (photos.length == 1) {
      CarouselPag = false;
    //   CarouselInf = false;
      SecondCarousel = false;
    }
  }

  const firstSwiperInit = (swiper) => {
	  setFirstSwiper(swiper)
	  if (firstSwiper) firstSwiper.slideTo(activeSlideIndex, 0)
  } 


  const changeSwiperOne = (swiper) => {
	  if (firstSwiper && secondSwiper) {
		secondSwiper.slideTo(swiper.activeIndex, 1000)
		setActiveSlideIndex(swiper.activeIndex)
		changeSlide(swiper.activeIndex)
	  }
  }

  const changeSwiperTwo = (e) => {
	  if (firstSwiper && secondSwiper) {
		const slide = e.target.getAttribute('id')
	  	firstSwiper.slideTo(slide, 1000)
	  	secondSwiper.slideTo(slide, 1000)
		setActiveSlideIndex(slide)
		changeSlide(slide)
	  }
  }

  return (
    <>
      <Swiper className="productSliderWrapper"
        onSwiper={firstSwiperInit}
		onActiveIndexChange={changeSwiperOne}
		pagination={CarouselPag} 
		navigation={true} 
		centeredSlides={true} >
        {photos == undefined
          ? ""
          : photos.map((img, i) => (
              <SwiperSlide key={i} className="productSliderItem">
                <div style={{width: "100%", height: "100%"}}>
                  <img style={{objectFit: "contain", width: "100%", height: "100%"}} src={img} />
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      {SecondCarousel ? (
        <Swiper className="mySwiper productSliderNav"        
        onSwiper={setSecondSwiper}
		slidesPerView={"auto"}
		slideToClickedSlide={true}
		// watchSlidesVisibility={true}
		>
          {photos == undefined
            ? ""
            : photos.map((img, i) => (
				// onClick={() => changeSlide(i, activeSlide, setActiveSlide)}
                <SwiperSlide key={i} id={i}  className="productSliderNavItem" onClick={changeSwiperTwo}>
                  <img src={img} style={{ border: activeSlide[i] ? "6px solid #52b9c5" : "none", borderRadius: "5px" }} />
                </SwiperSlide>
              ))}
        </Swiper>
      ) : null}
    </>
  );
}
