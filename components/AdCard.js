import React, {  useCallback, useEffect, useRef, useState } from "react";
import clsx from 'clsx'
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Lazy } from 'swiper';
import { ellipsis, ToRubles, ToRusDate } from "../lib/services";
import { useMedia } from '../hooks/useMedia';
// import { useAuth } from "../lib/Context/AuthCTX";
import { BASE_URL } from "../lib/constants";
import { IconButton, Menu, MenuItem, makeStyles } from "@material-ui/core";
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { useStore } from "../lib/Context/Store";
// import PhoneModule from "./product/PhoneModule";
import {useStatistics} from '../lib/Context/StatisticsCTX'

SwiperCore.use([Pagination, Lazy]);
const initialState = {
	mouseX: null,
	mouseY: null,
};

const useClass = makeStyles(() => ({
	morePhoto: {
		position: "absolute",
		background: "rgba(39, 39, 39, 0.4)",
		borderRadius: '8px 8px 0px 0px',
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: 'column',
		justifyContent: "center",
		alignItems: "center",

	},
	morePhotoText: {
		marginTop: '4px',
		color: "#FFF",
		fontSize: "18px",
		textAlign: "center",
		lineHeight: "21px",
	},
	blur: {
		filter: 'blur(3px)',
	},
	mov_area: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		height: '90%',
		position: 'absolute',
		top: '0',
		left: '0',
		zIndex: '2',
	},
	mov_area__item: {
		height: 'inherit',
		margin: '0',
		padding: '0',
	}
}))

const AdCard_component = React.forwardRef((props, ref,) => {
	const classes = useClass()
	// const { id } = useAuth();
	const {addSlideView, addLike, addUnLike} = useStatistics()
	const {id} = props;
	const {offer} = props;
	const { matchesMobile, matchesTablet } = useMedia();
	const screenIsMobile = matchesMobile || matchesTablet;
	const { userInfo, /*setLikeComment*/ } = useStore();

	const currentSwiper = useRef();
	const currentSlide = useRef(); // для слайдов в swiper

	// let scheduled = false;
	const [openMenu, setOpenMenu] = useState(initialState);
	const [isLiked, setIsLiked] = useState(false)
	// закоментил стейт, пока не разбереся с запросами.
	// const [phoneModuleState, setPhoneModuleState] = useState(false);
	const [, setPhoneModuleState] = useState(false);

	useEffect(() => {	
		if(!userInfo) return
		const isFavorite = userInfo?.favorites.includes(offer.id)
		setIsLiked(isFavorite)
	}, [offer, userInfo])

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

	const likeClickHandler = () => {
		if(userInfo && isLiked) {
			addUnLike(offer.id)()
			setIsLiked(false)
			return
		}
		if(userInfo && !isLiked) {
			addLike(offer.id)()
			setIsLiked(true)
			return
		}
	}



	// вешает класс или классы на враппер карточки по условию
	const classSwitcher = () => {
		const isCommercial = offer.commercial === 1 || offer.commercial === 2;

		if(isCommercial) return 'card__wrapper-yellow';
		if(!props.isGrid && screenIsMobile) return 'card__wrapperV2'
		if(!props.isGrid && isCommercial && screenIsMobile ) return 'card__wrapper-yellow card__wrapperV2'

		return 'card__wrapper'
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

	// перемещение слайдов по движению мыши
	useEffect(() => {
		// если фото более 2 и не мобилка
		if (offer.photo?.length >= 2 && !screenIsMobile && typeof currentSlide.current !== 'undefined' ) {
			const sections = [...currentSlide.current.children]
			sections.forEach(element => {
				element.addEventListener('mouseenter', mouseEnter)
				element.addEventListener('mouseleave', mouseLeave)
			})

			return () => sections.forEach(e => {
				e.removeEventListener('mouseenter', mouseEnter)
				e.removeEventListener('mouseleave', mouseLeave)
			})
		}
	}, [currentSwiper])

	const mouseEnter = useCallback((e) => {
		const target = +e.target.dataset.for
		if (currentSwiper.current !== null && currentSwiper.current.swiper !== null && typeof currentSwiper.current.swiper !== 'undefined') {
			currentSwiper.current.swiper.slideTo(target, 0)
		}
	})

	// eslint-disable-next-line
	const mouseLeave = useCallback((_) => {
		if (currentSwiper.current !== null && currentSwiper.current.swiper !== null && typeof currentSwiper.current.swiper !== 'undefined') {
			currentSwiper.current.swiper.slideTo(0, 0)
		}
	})

	// изменяем модель юзера при свайпе фотографий
	// const handlerSlideChange = () => {
	// 	// TODO: добавить проверку на сессию
	// 	mockVisitedArray.push(offer.id)
	// 	currentSwiper.current.swiper.off('slideChange')
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
			{/* <div className={offer.commercial === 1 || offer.commercial === 2 ? 'card__wrapper-yellow' : "card__wrapper"}> */}
			<div 
				className={classSwitcher()}
			>
				<div className={"card__top " + archived}>
					{offer?.viewing_bool ? <div className="card__top_seen">Просмотрено</div> : ""}
					<Link href={`/product/${offer.id}`} prefetch={false}>
						<div
							className="card__top_slider"
							style={{
								// height: '263px'
							}}
						>
							{offer?.photo?.length === 1 ?
							<>
								{/* <img
									src={`${offer.photo[0]}`}
									style={{
										objectFit: 'cover',
										width: '100%',
										objectPosition: 'center',
										height: '100%',


									}}
									alt="фото объявления"
									ref={currentSwiper}
									onError={e => e.target.src = `${BASE_URL}/icons/photocard_placeholder.svg`}
								/> */}
								{/* после оптимизации приложения, див переписать на тег img */}
									<div
										style={{
											backgroundImage: `url(${offer.photo[0]})`,
											width: '100%',
											height: '100%',
											backgroundSize: 'cover',
											backgroundPosition: 'center'
										}}
										ref={currentSwiper}
										onError={e => e.target.src = `${BASE_URL}/icons/photocard_placeholder.svg`}
									/>
									<div
										style={{
											backgroundImage: `url(${offer.photo[0]})`,
											backgroundSize: 'cover',
											filter: 'blur(20px)'
										}}
										className="imageBlur">
									</div>
								</>
								: (
									<>
									{/* рисуем области при которых листаем слайды - если не мобилка */}
										{!screenIsMobile &&
											<div
												ref={currentSlide}
												className={classes.mov_area}
												onMouseEnter={addSlideView(offer.id)} 
												// onTouchStart={addSlideView(offer.id)}
											>
												{/* eslint-disable-next-line */}
												{Array.isArray(offer.photo) && offer?.photo && (offer.photo?.slice(0, 5))?.map((_, i) => {
													return (
														<div
															key={i}
															data-for={i}
															className={classes.mov_area__item}
															style={{
																width: `${Math.round(100 / (offer.photo.length > 5 ? 5 : offer.photo.length))}%`
															}}
														></div>
													)
												})}
											</div>
										}
										<Swiper
											// Enable lazy loading
											lazy={{
												//  tell swiper to load images before they appear
												loadPrevNext: true,
												// amount of images to load
												loadPrevNextAmount: 1,
											}}
											// Disable preloading of all images
											// preloadImages={false}
											ref={currentSwiper}
											pagination={pagination}
											slidesPerView={1}
											style={{width: '100%', height: '100%',}}
											// onSlideChange={handlerSlideChange}
										>
											{Array.isArray(offer.photo) && offer?.photo && (offer.photo?.slice(0, 5))?.map((img, i) => {
												return (
													<SwiperSlide key={i} style={{position: 'relative',}}>
														{/* после оптимизации приложения, див переписать на тег img */}
														<div
															style={{
																// display: 'block',
																// width: '100%',
																// height: '100%',
																// minHeight: '100%',
																// objectFit: 'cover',
																width: '100%',
																height: '100%',
																backgroundImage: `url(${img})`,
																backgroundSize: 'cover',
																backgroundPosition: 'center',
																backgroundRepeat: 'no-repeat',
																// border: '0'
															}}
															// alt="фото объявления"
															// src={`${img}`}
															// srt={true}
															// className={(i === 4 && (offer.photo.length - 5 > 0) ? classes.blur : null)}
															className={clsx((i === 4 && (offer.photo.length - 5 > 0) ? classes.blur : null), 'swiper-lazy')}
															onError={e => e.target.src = `${BASE_URL}/icons/photocard_placeholder.svg`}
														/>
														{/* <img
															style={{
																width: '100%',
																height: '100%',
																backgroundImage: `url(${img})`,
																backgroundSize: 'cover',
																backgroundPosition: 'center'
															}}
														/> */}

														{/* <div
															style={{
																backgroundImage: `url(${img})`,
																backgroundSize: 'cover',
																filter: 'blur(20px)'
															}}
															className="imageBlur"
														>
														</div> */}
														{
															i === 4 && (offer.photo.length - 5 > 0) ?
															<div className={classes.morePhoto}>
																<span className="morePhotoImage"></span>
																<span className={classes.morePhotoText}>
																	Еще {offer.photo.length - 5} фото
																</span>
															</div>
															: null
														}
													</SwiperSlide>
												)
											})}
										</Swiper>
									</>
								)}
						</div>
					</Link>
					<div className="card__top_info">
						{!matchesMobile && !matchesTablet &&
							<div className="card__top_info_left">
								{offer.email && offer.user_id !== id ? <span className="card_comment"/> : ''}
								{/*{call && offer.user_id !== id ? <span  className="card_call"/> : ''}*/}
								{call && offer.user_id !== id ? <span  onClick={() => setPhoneModuleState(true)}   className='card_call'/> : ''}
							</div>}
						<div className="card__top_info_right">
							{/* {!matchesMobile && !matchesTablet && offer.user_id != id ? <span className="card_compare"></span> : ''} */}
							{offer.user_id !== id &&
								<IconButton
									onClick={() => {
										likeClickHandler()
									}}
									color={isLiked ? 'primary' : 'secondary'}
									className='card_like'
								>
									{isLiked &&  <FavoriteRoundedIcon />}
									{!isLiked && <FavoriteBorderRoundedIcon/>}	
								</IconButton>}
						</div>
					</div>
				</div>
				
				<Link href={`/product/${offer.id}`} prefetch={false}>
					<div className={offer.reviewed < 0 ? "card__bottom card__bottom-seen" : 'card__bottom'}>
						<div className="card__bottom_info">
							<div className="card__bottom_info_right">
								{/* компонент для старой цены, пока не нужен */}
								{/* <span className="old__price">{offer.old_price == null ? ' ' : ellipsis(ToRubles(offer.old_price), 15)}</span> */}
								<div className="card__bottom_info_right_commercial">
									{!matchesMobile && offer.delivery ? <span className={!offer.commercial === 0 ? "card_delivery card_delivery-green" : "card_delivery"}/> : ''}
									{!matchesMobile && offer.secure_transaction ? <span className={!offer.commercial === 0 ? "card_secure card_secure-green" : "card_secure"}/> : ''}
								</div>
							</div>
							
							<div className="card__bottom_info_left">
								<span className={(!props.isGrid && screenIsMobile) ?
									"new__priceV2" :
									'new__price'
								}>
									{ellipsis(ToRubles(offer.price), 15)}
								</span>
							</div>
						</div>

						<div className={(!props.isGrid && screenIsMobile) ?
							"card__bottom_info_middleV2" :
							'card__bottom_info_middle'
						}>
							{offer.commercial === 2 ? ellipsis(offer.title, 40) : ellipsis(offer.title, 54)}
							{/* {offer.commercial === 2 ? ellipsis(offer.title, 40) : ellipsis(offer.title, 40)} */}
						</div>

						<div className="card__bottom_info_footer">
							<div className={(!props.isGrid && screenIsMobile) ?
							"card__bottom_info_footer_leftV2" :
							'card__bottom_info_footer_left'
							}>
								{offer.address}
							</div>

							<div className={(!props.isGrid && screenIsMobile) ?
							"card__bottom_info_footer_rightV2" :
							'card__bottom_info_footer_right'
							}>
								{ToRusDate(offer.created_at)}
							</div>
						</div>
					</div>
				</Link>
			</div>
			{/* <PhoneModule productInfo={offer} dialog={phoneModuleState} setDialog={setPhoneModuleState} /> */}
			{/* телефонный модуль делает очень много запросов. Отключен пока не пофиксится баг */}
			{/* <PhoneModule product={offer} dialog={phoneModuleState} setDialog={setPhoneModuleState} userName={offer.user_name} userPhotoInIndex={offer.user_photo} userPhone={offer.user_phone} userRating={offer.rating}/> */}
		</div>

	);
})

export default AdCard_component;
