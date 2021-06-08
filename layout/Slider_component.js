import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from "swiper/core";
// import bike from "../../images/home/slider/sliderIcon/bike.svg";
// import car from "../../images/home/slider/sliderIcon/car.svg";
// import homeandgarden from "../../images/home/slider/sliderIcon/homeandgarden.svg";
// import job from "../../images/home/slider/sliderIcon/job.svg";
// import notebook from "../../images/home/slider/sliderIcon/notebook.svg";
// import part from "../../images/home/slider/sliderIcon/part.svg";
// import property from "../../images/home/slider/sliderIcon/property.svg";
// import service from "../../images/home/slider/sliderIcon/service.svg";
// import smartphone from "../../images/home/slider/sliderIcon/smartphone.svg";

SwiperCore.use([Navigation]);
function Slider_component() {

    return (
        <div className="main__slider">
            <Swiper
                spaceBetween={50}
                navigation={true}
                loop={true}
                breakpoints={{
                    300: {
                        slidesPerView: 2
                    },
                    400: {
                        slidesPerView: 3
                    },
                    500: {
                        slidesPerView: 3
                    },
                    600: {

                        slidesPerView: 4
                    },
                    1024: {
                        slidesPerView: 5
                    },
                    1440: {
                        slidesPerView: 6
                    }
                }}
            >
                <SwiperSlide><button className="slider__category "><p>Смартфоны</p><img className="category_smartphone" /* src={smartphone} */ alt="" /></button></SwiperSlide>
                <SwiperSlide><button className="slider__category "><p>Ноутбуки</p><img className="category_notebook" /* src={notebook} */ alt="" /></button></SwiperSlide>
                <SwiperSlide><button className="slider__category "><p>Квартиры</p><img className="category_property" /* src={property} */ alt="" /></button></SwiperSlide>
                <SwiperSlide><button className="slider__category "><p>Работа</p><img className="category_job" /* src={job} */ alt="" /></button></SwiperSlide>
                <SwiperSlide><button className="slider__category "><p>Автомобили</p><img className="category_car" /* src={car} */ alt="" /></button></SwiperSlide>
                <SwiperSlide><button className="slider__category "><p>Услуги</p><img className="category_service" /* src={service} */ alt="" /></button></SwiperSlide>
                <SwiperSlide><button className="slider__category "><p>Мотоциклы</p><img className="category_bike" /* src={bike} */ alt="" /></button></SwiperSlide>
                <SwiperSlide><button className="slider__category "><p>Дома, дачи и коттеджи</p><img className="category_homeandgarden" /* src={homeandgarden} */ alt="" /></button></SwiperSlide>
                <SwiperSlide><button className="slider__category "><p>Запчасти для автомобилей</p><img className="category_part" /* src={part} */ alt="" /></button></SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Slider_component