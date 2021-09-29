import React from 'react';
import { ToRubles } from '../../../../lib/services';
import { Modal } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Thumbs } from "swiper/core";

SwiperCore.use( [ Pagination, Navigation, Thumbs ] );


function WaitingCard({index, offer, openWaitForm, setOpenWaitForm, parentCheck, getDataChild, offerId}) {

    const [check, setCheck] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);

    const [cardSwiper, setCardSwiper] = React.useState(null);
    const [modalSwiper, setModalSwiper] = React.useState(null);
    const [thumbsSwiper, setThumbsSwiper] = React.useState(null)
    const [activeSlide, setActiveSlide] = React.useState(0);

    React.useEffect( () => {
        parentCheck ? check ? null : handleChange(parentCheck) : check === false ? null : offerId.length === 0 ? handleChange(parentCheck) : null;
    }, [parentCheck])
    
    const listRef = (e) => {
        const adInformation = document.querySelectorAll(".ad__information__description")[e.target.value]
        const loerMore = document.querySelectorAll(".btn__loer_more")[e.target.value]
        adInformation.classList.toggle("ad_close");
        loerMore.classList.toggle("btn__loer_more-open");
        if (adInformation.classList.contains('ad_close')) {
           loerMore.innerHTML = 'Развернуть';
        }
        else {
           loerMore.innerHTML = "Скрыть";
        }
    }

    function handleChange(event) {
        setCheck(event);
        getDataChild({id: offer.id, isCheck: event })
    }
    
   
    if (modalSwiper) {
        modalSwiper.slideTo(activeSlide, 0);
    }
    
    
    console.log(activeSlide)
    return (
        <div key={offer.id} className="ad__wrapper">
            <div className="ad__check">
                <label className="checkbox">
                    <input 
                        type="checkbox" 
                        onChange={(event) => handleChange(event.target.checked) }
                        checked={check}
                    />
                    <div className="checkbox__text"></div>
                </label>
            </div>
            <a  className="ad_slider"  >
                <Swiper
                    navigation={true}
                    pagination={{type: "fraction"}}
                    onActiveIndexChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                    className="mySwiper2 admin-page-swiper"
                    onSwiper={setCardSwiper}
                >
                    {offer.imgs.map( (img, index) => (
                        <SwiperSlide key={index} onClick={() =>{ setOpenModal(!openModal)}} >
                            <img src={img} alt="" style={{ width: "280px"}}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </a>
            <div className="ad__information">
                <div className="ad__information__blocks">
                    <div className="ad__information__left_block">
                        <div className="ad__information_price">{ToRubles(offer.price)}</div>
                        <div className="ad__information_title">{offer.title}</div>
                        <div className="ad__information_category">
                        {offer.categorys.map(category => {
                            return (
                                <span key={category.id}>{category.category}</span>
                            );
                        })
                        }
                        </div>
                    </div>
                    <div className="ad__information__right_block">
                        <button onClick={() => setOpenWaitForm(!openWaitForm)} className="btn__reject">Отклонить</button>
                    </div>
                </div>
                <div className="ad__information__user">
                    <div className="ad__information__user_icon">
                        <img src={`${offer.userpic}?${offer.id}`} />
                    </div>
                    <div className="ad__information__user_name">
                        {offer.username}
                    </div>
                </div>
                <p value={index} className="ad__information__description ad_close">
                    {offer.description}
                </p>
                <button className="btn__loer_more" value={index} onClick={(e, index) => listRef(e, index)} >Развернуть</button>
                <button className="btn__ad_add">Одобрить</button>
            </div>
            <Modal 
                open={openModal} 
                onClose={() => {
                    setOpenModal(!openModal); 
                    setThumbsSwiper(null); 
                    cardSwiper.slideTo(activeSlide, 0);
                }} 
                className="productModal"
            >
                <>
                    <Swiper
                        className="productSliderWrapper"
                        navigation={true}
                        slidesPerView={1}
                        onSwiper={setModalSwiper}
                        onActiveIndexChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                        thumbs={{swiper: thumbsSwiper}}
                    >
                        { offer.imgs.map( (img, index) => (
                            <SwiperSlide key={index} className="productSliderItem" >
                                <img src={img} alt=""  style={{objectFit: "contain", width: "100%", height: "100%"}}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                        {/* добавить в свайпер ниже onActiveIndexChange  */}
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        className="mySwiper productSliderNav admin-page_modal-swiper" 
                        style={{ height: '88px', display: "block"}}
                        spaceBetween={1}
                    >
                        { offer.imgs.map( (img, index) => (
                            <SwiperSlide key={index} className="productSliderNavItem" >
                                <img src={img} alt=""  style={{ height: "88px"}}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            </Modal>
        </div>
    )
}

export default WaitingCard
