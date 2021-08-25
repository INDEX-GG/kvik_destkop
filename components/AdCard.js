import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import { ellipsis, ToRubles, ToRusDate } from "../lib/services";
import { useMedia } from '../hooks/useMedia';
import Favorits from '../UI/Favorits';
import { useAuth } from "../lib/Context/AuthCTX";
import { BASE_URL, STATIC_URL } from "../lib/constants";

SwiperCore.use([Pagination]);

function AdCard_component({ offer }) {

	const { id } = useAuth();

	const currentSwiper = useRef();
	let sheduled = false;

	useEffect(() => {
		currentSwiper.current.addEventListener("mousemove", switchSlide);
	}, [currentSwiper]);

	function switchSlide(e) {

		if (!sheduled) {
			sheduled = true;
			setTimeout(() => {
				if (currentSwiper.current != null) {
					if (e.movementX > 0) {
						currentSwiper.current?.swiper.slideNext();

					} else if (e.movementX < 0) {
						currentSwiper.current?.swiper.slidePrev();
					}
					sheduled = false;
				}
			}, 320);
		}
	}

	const call = true;

	let archived = null
	if (offer.archived == true) {
		archived = "sold"
	}

	let pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			if (index >= 5) return '';
			return '<span class="' + className + '">' + "</span>"
		}
	}

	const { matchesMobile, matchesTablet } = useMedia();
	return (
		<div className={offer.commercial === 2 ? "card card__lg" : "card"}>
			<div className={"card__wrapper"}>
				<div className={"card__top " + archived}>
					{offer.reviewed < 0 ? <div className="card__top_seen">Просмотрено</div> : ""}
					<Link href={`/product/${offer.id}`} prefetch={false}>
						<div className="card__top_slider">
							<Swiper
								ref={currentSwiper}
								pagination={pagination}
								slidesPerView={1}
							>
								{(JSON
									.parse(offer.photo)?.photos
									?.slice(0, 5))
									?.map((img, i) => {
										return (
											<SwiperSlide key={i}>
												<img
													src={`${STATIC_URL}/${img}`}
													onError={e => e.target.src = `${BASE_URL}/icons/photocard_placeholder.svg`}
												/>
											</SwiperSlide>
										)
									}
									)}
							</Swiper>
						</div>
					</Link>
					<div className="card__top_info">
						{!matchesMobile && !matchesTablet &&
							<div className="card__top_info_left">
								{offer.email && offer.user_id != id ? <span className="card_comment"></span> : ''}
								{call && offer.user_id != id ? <span href="#" className="card_call"></span> : ''}
							</div>}
						<div className="card__top_info_right">
							{!matchesMobile && !matchesTablet && offer.user_id != id ? <span className="card_compare"></span> : ''}
							{offer.user_id != id ? <Favorits isCard offer={offer}></Favorits> : ''}
						</div>
					</div>
				</div>
				<Link href={`/product/${offer.id}`} prefetch={false}>
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
							<div className="card__bottom_info_footer_left">{offer.address}</div>
							<div className="card__bottom_info_footer_right">{ToRusDate(offer.created_at)}</div>
						</div>
					</div>
				</Link>
			</div>
		</div>

	);
}

export default AdCard_component;