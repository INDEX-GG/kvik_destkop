import React from "react";
import EmptyPlaceholder from "../../../EmptyPlaceholder";
import FavoritesSellersPlaceHolder
  from "../../../placeHolders/FavoritesPlaceHolder/FavoritesSellers/FavoritesSellersPlaceHolder";
import SellersItem from "../sellers/SellersItem";

function Sellers({sellers}) {

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
        {!sellers ? <FavoritesSellersPlaceHolder/> : <div className="clientPage__container_bottom">
          <div className="clientPage__container_content">
            <div className="sellersWrapper small">
              {sellers?.map((seller, index) => (
                <SellersItem key={index + 1} seller={seller}/>
              ))}
            </div>
          </div>
        </div>}
      </>
  );
}

export default Sellers;
