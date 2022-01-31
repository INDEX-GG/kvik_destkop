import React, {useState, useMemo} from 'react';
import {STATIC_URL} from "../../../../lib/constants";
import {ellipsis, ToRubles} from "../../../../lib/services";
import {useRouter} from "next/router";
import {useAuth} from "../../../../lib/Context/AuthCTX";
import {getTokenDataByPost} from "../../../../lib/fetch";
import { useMedia } from '../../../../hooks/useMedia';

// swiper объявлений
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);


const SellersItem = ({seller}) => {
  const {id, token} = useAuth();
  const [subscribe, setSubscribe] = useState(true)
  const router = useRouter();
	const { matchesMobile } = useMedia();

  function subscribeUser(id, sellerID) {
    const subscribe = {
      user_id: id + "",
      seller_id: sellerID + ""
    }

    getTokenDataByPost("/api/subscriptions", subscribe, token)
      .then(res => console.log(res))
      .catch(error => console.log(error))

  }


  const hanleClick = () => {
    setSubscribe(!subscribe)
    if (id && seller.id) {
      subscribeUser(id, seller.id)
    }
  }

  /**
   * Render Seller product item of array
   * @param {offer} (Object)
   * @returns JSX
   */
  const SellerProductItem = ({offer}) => {
    return (
      <a href={`/product/${offer.id}`} className="sellersOffer">
        <img src={`${STATIC_URL}/${JSON.parse(offer.photo)?.photos[0]}`}/>
        <div>{ellipsis(ToRubles(offer.price), 15)}</div>
        <div>{ellipsis(offer.title, 10)}</div>
      </a>
    )
  }

  /**
   * Render seller.products one line layout
   * ! NOTICE: If mobile & seller.products.length > 3 => use swiper other via array
   * ! NOTICE: If desktop & seller.products.length > 7 => use swiper other via array
   * @param {seller} (Object)
   * @returns JSX
   */
  const SellersProducts = useMemo(
    () => ({seller}) => {
    return (
      matchesMobile
      ? (
        seller?.poducts.length >= 3
        ? (
          <Swiper
            navigation={true}
            slidesPerView='auto'
          >
          {seller?.poducts.map((offerProduct, i) => {
            return (
              <SwiperSlide key={i}>
                <SellerProductItem  offer={offerProduct} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        ): seller?.poducts.map((offerProduct, i) => <SellerProductItem key={i} offer={offerProduct} />)
      ) : (
        seller?.poducts.length >= 7
        ? (
          <Swiper
            navigation={true}
            slidesPerView='auto'
          >
          {seller?.poducts.map((offerProduct, i) => {
            return (
              <SwiperSlide key={i}>
                <SellerProductItem  offer={offerProduct} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        ) : seller?.poducts.map((offerProduct, i) => <SellerProductItem key={i} offer={offerProduct} />)
      )
    )
  }, [seller, matchesMobile])

  return (
    <div key={seller.id} className="sellersContainer">
      <div className="sellersUser">
        <div onClick={() => {
          router.push(`/user/${seller.id}`)
        }} className="sellersUserBlock">
          <img src={`${STATIC_URL}/${seller.userPhoto}`}/>
          <div className="sellersUserInfo">
            <div className="sellersUserName">{seller.name}</div>
            <div className="sellersOffersCount light">{seller.poducts.length} объявлений</div>
          </div>
        </div>
        <button onClick={() => {
          hanleClick()
          // sellerSub(58, seller.id)
          // changeSubscribe(index)
        }} className="buttonGrey">{subscribe ? "Отписаться" : "Подписаться"}</button>
      </div>
      <div className="sellersOffers">
        <SellersProducts seller={seller} />
      </div>
    </div>
  );
};

export default SellersItem;
