import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from "swiper/core";
import { ellipsis, ToRubles, ToRusDate } from '../lib/services';

SwiperCore.use([Pagination]);

function AdCard_component({ offer }) {

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
            }, 220)
        }
    }

    const call = true;
    const like = true;

    return (
        <Link href={`/product/${offer.id}`} >
            <div className={offer.commercial === 2 ? "card card__lg" : "card"}>
                <div className={offer.commercial !== 0 ? "card__wrapper card__wrapper-yellow" : "card__wrapper"}>
                    <div className="card__top">
                        {offer.reviewed < 0 ? <div className="card__top_seen">Просмотрено</div> : ''}
                        <div className="card__top_slider">
                            <Swiper
                                ref={currentSwiper}
                                pagination={{
                                    "clickable": true
                                }}
                                slidesPerView={1}
                            >
                                {JSON.parse(offer.photo).photos.map((img, i) => <SwiperSlide key={i}> <img src={img} alt='' onError={e => e.target.src = '/icons/photocard_placeholder.svg'} /></SwiperSlide>)}
                            </Swiper>
                        </div>
                        <div className="card__top_info">
                            <div className="card__top_info_left">
                                {offer.email ? <span className="card_comment"></span> : ''}
                                {call ? <span href="#" className="card_call"></span> : ''}
                            </div>
                            <div className="card__top_info_right">
                                <span className="card_compare"></span>
                                {like ? <span className="card_like"></span> : ''}
                            </div>
                        </div>
                    </div>
                    <div className={offer.reviewed < 0 ? "card__bottom card__bottom-seen" : 'card__bottom'}>
                        <div className="card__bottom_info">
                            <div className="card__bottom_info_left">
                                <span className="old__price">{ /* {ToRubles(offer.oldPrice)}  */}</span>
                                <span className="new__price">{ellipsis(ToRubles(offer.price), 12)}</span>
                            </div>
                            <div className="card__bottom_info_right">
                                {offer.delivery ? <span className={!offer.commercial == 0 ? "card_delivery card_delivery-green" : "card_delivery"}></span> : ''}
                                {offer.secure_transaction ? <span className={!offer.commercial == 0 ? "card_secure card_secure-green" : "card_secure"}></span> : ''}
                            </div>
                        </div>
                        <div className="card__bottom_info_middle">{offer.title}</div>
                        <div className="card__bottom_info_footer">
                            <div className="card__bottom_info_footer_left">{offer.commercial === 2 ? offer.address : ellipsis(offer.address, 15)}</div>
                            <div className="card__bottom_info_footer_right">{ToRusDate(offer.created_at)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default AdCard_component;