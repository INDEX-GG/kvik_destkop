import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from "swiper/core";
import { ellipsis, ToRubles, ToRusDate } from './services';

SwiperCore.use([Pagination]);

function AdCard_component({ objs }) {
    const currentSwiper = useRef();
    let sheduled = false;

    useEffect(() => {
        currentSwiper.current.addEventListener('mousemove', switchSlide);
        return () =>
            currentSwiper.current.removeEventListener('mousemove', switchSlide);
    });

    function switchSlide(e) {
        if (!sheduled) {
            sheduled = true;
            setTimeout(() => {
                if (e.movementX > 0) {
                    currentSwiper.current?.swiper.slideNext()
                } else if (e.movementX < 0) {
                    currentSwiper.current?.swiper.slidePrev()
                }
                sheduled = false;
            }, 180)
        }
    }


    const obj = [
        { id: 1, title: "Toyota Mark II jxz90", objImg: [{ img: "https://source.unsplash.com/random?cars" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 200000, newPrice: 180000, city: "Челябинск", date: "2021-05-19T12:03:51.000000Z", seen: true, status: 0, call: true, message: true, like: true, compare: false, delivery: true, security: true },
        { id: 2, title: "Toyota Altezza", objImg: [{ img: "https://source.unsplash.com/random?forest" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: '', newPrice: 400000, city: "Челябинск", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: false, like: true, compare: false, delivery: false, security: true },
        { id: 3, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?land" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 2, call: true, message: true, like: true, compare: false, delivery: true, security: true },
        { id: 4, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?tools" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 0, call: true, message: true, like: true, compare: false, delivery: true, security: true },
        { id: 5, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?cars" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true },
        { id: 6, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?moto" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: true, status: 0, call: true, message: true, like: true, compare: false, delivery: true, security: true },
        { id: 7, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?house" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 2, call: true, message: true, like: true, compare: false, delivery: true, security: true },
        { id: 8, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?dog" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: true, status: 2, call: true, message: true, like: true, compare: false, delivery: true, security: true },
        { id: 9, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?smail" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true },
        { id: 10, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?animals" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true },
        { id: 11, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?boat" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: true, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true },
        { id: 12, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?region" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true }
      ];


    /* console.log(objs.map(objs => (objs.title))) */
    const call = true;
    const like = true;

   
    return (
        objs.map(objs => (
        <Link href={`/product/${objs.category_id}`} >
            <div className={objs.commercial === 2 ? "card card__lg" : "card"}>
                <div className={objs.commercial !== 0 ? "card__wrapper card__wrapper-yellow" : "card__wrapper"}>
                    <div className="card__top">
                        {objs.reviewed < 0 ? <div className="card__top_seen">Просмотрено</div> : ''}
                        <div className="card__top_slider">
                            <Swiper
                                ref={currentSwiper}
                                pagination={{
                                    "clickable": true
                                }}
                                slidesPerView={1}
                            >
                                {/*  {obj.objImg.map((img, i) => { return <SwiperSlide key={i}> <img src={img.img} alt="" /></SwiperSlide> })}  */}
                            </Swiper>
                        </div>
                        <div className="card__top_info">
                            <div className="card__top_info_left">
                                {objs.email ? <span className="card_comment"></span> : ''}
                                {call ? <span href="#" className="card_call"></span> : ''}
                            </div>
                            <div className="card__top_info_right">
                                <span className="card_compare"></span>
                                {like ? <span className="card_like"></span> : ''}
                            </div>
                        </div>
                    </div>
                    <div className={objs.reviewed < 0 ? "card__bottom card__bottom-seen" : 'card__bottom'}>
                        <div className="card__bottom_info">
                            <div className="card__bottom_info_left">
                                <span className="old__price">{ /* {ToRubles(objs.oldPrice)}  */}</span>
                                <span className="new__price">{ ToRubles(objs.price)}</span>
                            </div>
                            <div className="card__bottom_info_right">
                                {objs.delivery ? <span className={!objs.commercial == 0 ? "card_delivery card_delivery-green" : "card_delivery"}></span> : ''}
                                {objs.secure_transaction ? <span className={!objs.commercial == 0 ? "card_secure card_secure-green" : "card_secure"}></span> : ''}
                            </div>
                        </div>
                        <div className="card__bottom_info_middle">{objs.title}</div>
                        <div className="card__bottom_info_footer">
                            <div className="card__bottom_info_footer_left">{objs.commercial === 2 ? objs.address :  ellipsis(objs.address, 15)}</div>
                            <div className="card__bottom_info_footer_right">{ ToRusDate(objs.created_at)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )))
}



export default AdCard_component;
