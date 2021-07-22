import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import { ellipsis, ToRubles, ToRusDate } from "../lib/services";
import Image from "next/image";
import { useMedia } from '../hooks/useMedia';
import Favorits from '../UI/Favorits';
import { useFaverits } from '../lib/Context/FavoritesCTX';
SwiperCore.use([Pagination]);

function AdCard_component({ offer }) {

  const {favorites} = useFaverits();


  const currentSwiper = useRef();
  let sheduled = false;

  console.log('offerRender')

  useEffect(() => {
    currentSwiper.current.addEventListener("mousemove", switchSlide);	
  }, [currentSwiper]);

  function switchSlide(e) {
    if (!sheduled) {
      sheduled = true;
      setTimeout(() => {
        if (e.movementX > 0) {
          currentSwiper.current?.swiper.slideNext();
        } else if (e.movementX < 0) {
          currentSwiper.current?.swiper.slidePrev();
        }
        sheduled = false;
      }, 220);
    }
  }






  const call = true;
  const like = true;

  let archived = null
  if (offer.archived == true) {
    archived = "sold"
  }

  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();

//   const myLoader = ({src, width, quality}) => `${src}`;
  return (

    <div className={offer.commercial === 2 ? "card card__lg" : "card"}>
      <div className={offer.commercial !== 0 ? "card__wrapper card__wrapper-yellow" : "card__wrapper"}>
        <div className={"card__top " + archived}>
          {offer.reviewed < 0 ? <div className="card__top_seen">Просмотрено</div> : ""}
          <Link href={`/product/${offer.id}`}>
              <div className="card__top_slider">
                <Swiper
                  ref={currentSwiper}
                  pagination={{
                    clickable: true,
                  }}
                  slidesPerView={1}
                >
                  	{/* {JSON.parse(offer.photo).photos.map((img, i) => {
									return (
										<SwiperSlide 
										key={i}>
											<Image loader={myLoader} src={img} layout='fill'/>
										</SwiperSlide>
						)})} */}
                  {JSON.parse(offer.photo)?.photos?.map((img, i) => <SwiperSlide key={i}> <img src={img} onError={e => e.target.src = '/icons/photocard_placeholder.svg'} /></SwiperSlide>)}

                </Swiper>
              </div>
          </Link>
          <div className="card__top_info">
            <div className="card__top_info_left">
              {offer.email ? <span className="card_comment"></span> : ''}
              {call ? <span href="#" className="card_call"></span> : ''}
            </div>
            <div className="card__top_info_right">
              {!matchesMobile && !matchesTablet ? <span className="card_compare"></span> : ''}

              <Favorits isCard favorites={favorites} offer= {offer}></Favorits>

            </div>
          </div>

        </div>
        <Link href={`/product/${offer.id}`}>
            <div className={offer.reviewed < 0 ? "card__bottom card__bottom-seen" : 'card__bottom'}>
              <div className="card__bottom_info">
                <div className="card__bottom_info_right">
                  <span className="old__price">{offer.old_price == null ? ' ' : ellipsis(ToRubles(offer.old_price), 15)}</span>
                  <div className="card__bottom_info_right_commercial">
                    {!matchesMobile && offer.delivery ? <span className={!offer.commercial == 0 ? "card_delivery card_delivery-green" : "card_delivery"}></span> : ''}
                    {!matchesMobile && offer.secure_transaction ? <span className={!offer.commercial == 0 ? "card_secure card_secure-green" : "card_secure"}></span> : ''}
                  </div>
                </div>
                <div className="card__bottom_info_left">
                  <span className="new__price">{ellipsis(ToRubles(offer.price), 15)}</span>
                </div>


              </div>
              <div className="card__bottom_info_middle">{offer.commercial === 2 ? ellipsis(offer.title, 40) : ellipsis(offer.title, 24)}</div>
              <div className="card__bottom_info_footer">
                <div className="card__bottom_info_footer_left">{offer.address/* offer.commercial === 2 ? offer.address : ellipsis(offer.address, 25) */}</div>
                <div className="card__bottom_info_footer_right">{ToRusDate(offer.created_at)}</div>
              </div>
            </div>
        </Link>
      </div>
    </div>

  );
}

export default AdCard_component;