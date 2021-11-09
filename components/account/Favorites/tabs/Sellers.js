import React, { useEffect, useState } from "react";
import { ToRubles, ellipsis } from "../../../../lib/services";
import {useRouter} from "next/router"
import { STATIC_URL } from "../../../../lib/constants";
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import FavoritesSellersPlaceHolder
  from "../../../placeHolders/FavoritesPlaceHolder/FavoritesSellers/FavoritesSellersPlaceHolder";

function Sellers({sellers, sellerSub}) {

  const [btnSellerArr, setBtnSellerArr] = useState([])

  const router = useRouter()

  useEffect(() => {
    if (sellers != undefined && btnSellerArr.length == 0) {
      const newArr = []
      for (let count = 0; count < sellers.length; count++) {
        newArr.push(true)
      }
      setBtnSellerArr(newArr)
    }
  },[sellers])

  function changeSubscribe(i) {
    const arr = btnSellerArr

    const newArr = arr.map((item, index) => {
      if (i == index) {
        return !item
      }
      return item
    })

    setBtnSellerArr(newArr)
  }


  if (sellers?.message) {
    return (
        <>
          {!sellers ? <FavoritesSellersPlaceHolder/>
              :<EmptyPlaceholder
              title='Здесь будут ваши избранные продавцы'
              subtitle='Подпишитесь на продавца, чтобы видеть больше его объявлений'
              img='/accountImage/SellerNone.png'
              imgAlt='seller_placholder'/>}
        </>
    );
  }


  return (
      <>
        {!sellers ? <FavoritesSellersPlaceHolder/> :<div className="clientPage__container_bottom">
          <div className="clientPage__container_content">
            <div className="sellersWrapper small">
              {sellers?.map((seller, index) => {
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
                          sellerSub(58, seller.id)
                          changeSubscribe(index)
                        }} className="buttonGrey">{btnSellerArr[index] ? "Отписать" : "Подписаться"}</button>
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
              })}
            </div>
          </div>
        </div>}
      </>
  );
}

export default Sellers;
