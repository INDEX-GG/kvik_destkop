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

    return (
        <Link href={`/product/${objs.id}`} >
            <div className={objs.status === 2 ? "card card__lg" : "card"}>
                <div className={objs.status !== 0 ? "card__wrapper card__wrapper-yellow" : "card__wrapper"}>
                    <div className="card__top">
                        {objs.seen ? <div className="card__top_seen">Просмотрено</div> : ''}
                        <div className="card__top_slider">
                            <Swiper
                                ref={currentSwiper}
                                pagination={{
                                    "clickable": true
                                }}
                                slidesPerView={1}
                            >
                                {objs.objImg.map((img, i) => { return <SwiperSlide key={i}> <img src={img.img} alt="" /></SwiperSlide> })}
                            </Swiper>
                        </div>
                        <div className="card__top_info">
                            <div className="card__top_info_left">
                                {objs.message ? <span className="card_comment"></span> : ''}
                                {objs.call ? <span href="#" className="card_call"></span> : ''}
                            </div>
                            <div className="card__top_info_right">
                                <span className="card_compare"></span>
                                {objs.like ? <span className="card_like"></span> : ''}
                            </div>
                        </div>
                    </div>
                    <div className={objs.seen ? "card__bottom card__bottom-seen" : 'card__bottom'}>
                        <div className="card__bottom_info">
                            <div className="card__bottom_info_left">
                                <span className="old__price">{ToRubles(objs.oldPrice)}</span>
                                <span className="new__price">{ToRubles(objs.newPrice)}</span>
                            </div>
                            <div className="card__bottom_info_right">
                                {objs.delivery ? <span className={!objs.status == 0 ? "card_delivery card_delivery-green" : "card_delivery"}></span> : ''}
                                {objs.security ? <span className={!objs.status == 0 ? "card_secure card_secure-green" : "card_secure"}></span> : ''}
                            </div>
                        </div>
                        <div className="card__bottom_info_middle">{objs.title}</div>
                        <div className="card__bottom_info_footer">
                            <div className="card__bottom_info_footer_left">{objs.status === 2 ? objs.city : ellipsis(objs.city, 15)}</div>
                            <div className="card__bottom_info_footer_right">{ToRusDate(objs.date)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default AdCard_component;
