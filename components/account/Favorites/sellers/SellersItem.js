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

    getTokenDataByPost("/api/subscribe", {
      user_id: id,
      subscribe: !subscribe ? [sellerID] : [],
      unsubscribe: subscribe ? [sellerID] : [],
    }, token)
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
   * Render Seller productV2 item of array
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
        seller?.user_products_count >= 3
        ? (
          <Swiper
            navigation={true}
            slidesPerView='auto'
          >
          {seller?.user_products.map((offerProduct) => {
            return (
              <SwiperSlide key={offerProduct.id}>
                <SellerProductItem  offer={offerProduct} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        ): seller?.user_products.map((offerProduct) => <SellerProductItem key={offerProduct.id} offer={offerProduct} />)
      ) : (
        seller?.user_products_count >= 7
        ? (
          <Swiper
            navigation={true}
            slidesPerView='auto'
          >
          {seller?.user_products.map((offerProduct) => {
            return (
              <SwiperSlide key={offerProduct.id}>
                <SellerProductItem  offer={offerProduct} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        ) : seller?.user_products.map((offerProduct) => <SellerProductItem key={offerProduct.id} offer={offerProduct} />)
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
            <div className="sellersOffersCount light">{seller?.user_products_count} объявлений</div>
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
