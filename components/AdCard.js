import React, {  useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from 'swiper';
import { ellipsis, ToRubles, ToRusDate } from "../lib/services";
import { useMedia } from '../hooks/useMedia';
import { useAuth } from "../lib/Context/AuthCTX";
import { BASE_URL } from "../lib/constants";
import { IconButton, Menu, MenuItem, makeStyles } from "@material-ui/core";
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { useStore } from "../lib/Context/Store";

SwiperCore.use([Pagination]);
const initialState = {
	mouseX: null,
	mouseY: null,
};

const useClass = makeStyles(() => ({
	morePhoto: {
		position: "absolute", 
		background: "rgba(0, 0, 0, 0.6)", 
		top: 0, 
		left: 0,
		width: "100%", 
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	morePhotoText: {
		color: "#FFF",
		fontSize: "16px",
		textAlign: "center",
		lineHeight: "1.3",
	}
}))

const AdCard_component = React.forwardRef((props, ref) => {
	const classes = useClass()
	const { id } = useAuth();
	const {offer} = props;
	// console.log('',offer)
	// const clearPhoto = offer.photo.map(photo => photo.includes('http://192.168.45.195:6001/http://192.168.45.195:6001/')
	// 	? photo.replace('http://192.168.45.195:6001/http://192.168.45.195:6001/','http://192.168.45.195:6001/')
	// 	: photo.includes('https://onekvik.ru/zz/http://192.168.45.195:6001/')
	// 		? photo.replace('https://onekvik.ru/zz/http://192.168.45.195:6001/','https://onekvik.ru/zz/')
	// 	: photo.replace('http://192.168.45.195:6001/https://onekvik.ru/zz/','http://192.168.45.195:6001/')
	// )



	const { userInfo, setLikeComment } = useStore();
	const currentSwiper = useRef();
	// let scheduled = false;
	const [openMenu, setOpenMenu] = useState(initialState);
	const handleCM = (e) => {
		e.preventDefault();
		setOpenMenu({
			mouseX: e.clientX - 2,
			mouseY: e.clientY - 4,
		});
	}

	const handleWheelClick = (e, id) => {
		if (e.button === 1) {
			window.open(`/product/${id}`);
		}
	}

	// todo: перелистывание слайдера по движению мыши
	// useEffect(() => {
	// 	currentSwiper.current.addEventListener("mousemove", switchSlide);
	// }, [currentSwiper]);

	// function switchSlide(e) {
	// 	if (!scheduled) {
	// 		scheduled = true;
	// 		setTimeout(() => {
	// 			if (currentSwiper.current !== null && currentSwiper.current.swiper !== null) {
	// 				if (e.movementX > 0) {
	// 					console.log('$$$$$$$$$$>',e.movementX )
	// 					currentSwiper.current.swiper.slideNext();
	//
	// 				} else if (e.movementX < 0) {
	// 					console.log('$$$$$$$$$$<',e.movementX )
	// 					currentSwiper.current.swiper.slidePrev();
	// 				}
	// 				scheduled = false;
	// 			}
	// 		}, 320);
	// 	}
	// }

	const call = true;

	let archived = null
	if (offer.archived === true) {
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
		<div
			ref={ref}
			className={offer.commercial === 2 ? "card card__lg" : "card"}
			onContextMenu={(e) => handleCM(e)}
			onMouseDown={(e) => handleWheelClick(e, offer.id)}
		>
			<Menu
				open={openMenu.mouseY !== null}
				onClose={() => setOpenMenu(initialState)}
				anchorReference="anchorPosition"
				anchorPosition={
					openMenu.mouseY !== null && openMenu.mouseX !== null
						? { top: openMenu.mouseY, left: openMenu.mouseX }
						: undefined
				}
			>
				<MenuItem onClick={() => setOpenMenu(initialState)} component='a' target='_blank' href={`/product/${offer.id}`}>Открыть в новой вкладке</MenuItem>
				<MenuItem>Добавить в избранное</MenuItem>
				<MenuItem>Добавить к сравнению</MenuItem>
				<MenuItem>Не показывать</MenuItem>
			</Menu>
			<div className={offer.commercial === 1 || offer.commercial === 2 ? 'card__wrapper-yellow' : "card__wrapper"}>
				<div className={"card__top " + archived}>
					{offer?.viewing_bool ? <div className="card__top_seen">Просмотрено</div> : ""}
					<Link href={`/product/${offer.id}`} prefetch={false}>
						<div className="card__top_slider">
							{offer?.photo?.length === 1 ?
								<img
									ref={currentSwiper}
									src={`${offer.photo[0]}`}
									onError={e => e.target.src = `${BASE_URL}/icons/photocard_placeholder.svg`}
								/>
								: <Swiper
									ref={currentSwiper}
									pagination={pagination}
									slidesPerView={1}
								>	
									{offer.photo && (offer.photo?.slice(0, 5))?.map((img, i) => {
										return (
											<SwiperSlide key={i} style={{position: 'relative'}}>
												<img
													src={`${img}`}
													onError={e => e.target.src = `${BASE_URL}/icons/photocard_placeholder.svg`}
												/>
												{
													i === 4 && (offer.photo.length - 5 > 0) ?
													<div className={classes.morePhoto}>
														<span className={classes.morePhotoText}>
															Еще<br />{offer.photo.length - 5} фото
														</span>
													</div>
													: null
												}
											</SwiperSlide>
										)
									})}
								</Swiper>}
						</div>
					</Link>
					<div className="card__top_info">
						{!matchesMobile && !matchesTablet &&
							<div className="card__top_info_left">
								{offer.email && offer.user_id != id ? <span className="card_comment"></span> : ''}
								{call && offer.user_id != id ? <span href="#" className="card_call"></span> : ''}
							</div>}
						<div className="card__top_info_right">
							{/* {!matchesMobile && !matchesTablet && offer.user_id != id ? <span className="card_compare"></span> : ''} */}
							{offer.user_id !== id ? (
								userInfo !== undefined && userInfo.favorites.length > 0 && userInfo.favorites && userInfo.favorites.filter(item => item.post_id === offer.id)?.[0]?.condition ?
									<IconButton
										onClick={() => setLikeComment(offer.id, userInfo?.favorites === undefined ? '' : userInfo?.favorites.filter(item => item.post_id === offer.id).map(item => item.comment)[0], false) }
										color='primary'
										className='card_like'>
										<FavoriteRoundedIcon />
									</IconButton> :
									<IconButton
										onClick={() => id ? setLikeComment(offer.id, userInfo?.favorites === undefined ? '' : userInfo?.favorites.filter(item => item.post_id === offer.id).map(item => item.comment)[0], true) : null }
										color='secondary'
										className='card_like'>
										<FavoriteBorderRoundedIcon />
									</IconButton>
							) : null}
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
})

export default AdCard_component;
