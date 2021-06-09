import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';

SwiperCore.use([Navigation]);
function Slider_component() {

    return (
        <div className="main__slider">
            <Swiper
                spaceBetween={50}
                navigation={true}
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
                <SwiperSlide><button className="slider__category"><p>Смартфоны</p><div className="category_smartphone"></div></button></SwiperSlide>
                <SwiperSlide><button className="slider__category"><p>Ноутбуки</p><div className="category_notebook"></div></button></SwiperSlide>
                <SwiperSlide><button className="slider__category"><p>Квартиры</p><div className="category_property"></div></button></SwiperSlide>
                <SwiperSlide><button className="slider__category"><p>Работа</p><div className="category_job"></div></button></SwiperSlide>
                <SwiperSlide><button className="slider__category"><p>Автомобили</p><div className="category_car"></div></button></SwiperSlide>
                <SwiperSlide><button className="slider__category"><p>Услуги</p><div className="category_service"></div></button></SwiperSlide>
                <SwiperSlide><button className="slider__category"><p>Мотоциклы</p><div className="category_bike"></div></button></SwiperSlide>
                <SwiperSlide><button className="slider__category"><p>Дома, дачи и коттеджи</p><div className="category_homeandgarden"></div></button></SwiperSlide>
                <SwiperSlide><button className="slider__category"><p>Запчасти для автомобилей</p><div className="category_part"></div></button></SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Slider_component