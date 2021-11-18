import React, {useState} from 'react';
import {STATIC_URL} from "../../../../lib/constants";
import {ellipsis, ToRubles} from "../../../../lib/services";
import {useRouter} from "next/router";
import {useAuth} from "../../../../lib/Context/AuthCTX";
import axios from 'axios'

const SellersItem = ({seller}) => {
  const {id} = useAuth();
  const [subscribe, setSubscribe] = useState(true)
  const router = useRouter();


  function subscribeUser(id, sellerID) {
    const subscribe = {
      user_id: id + "",
      seller_id: sellerID + ""
    }

    axios.post("/api/subscriptions", subscribe)
      .then(res => console.log(res.data))
      .catch(error => console.log(error))

  }


  const hanleClick = () => {
    setSubscribe(!subscribe)
    if (id && seller.id) {
      subscribeUser(id, seller.id)
    }
  }

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
        {seller.poducts.map((offer, i) => {
          return (
            <a href={`/product/${offer.id}`} key={i} className="sellersOffer">

              <img src={`${STATIC_URL}/${JSON.parse(offer.photo)?.photos[0]}`}/>
              <div>{ellipsis(ToRubles(offer.price), 15)}</div>
              <div>{ellipsis(offer.title, 10)}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SellersItem;