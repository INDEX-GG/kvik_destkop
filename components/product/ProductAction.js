import React, { useState } from "react";
import { useMedia } from "../../hooks/useMedia";
import { ToRusDate } from "../../lib/services";
import { Dialog } from "@material-ui/core";
import IconCall from "../../UI/icons/IconCall";
import IconMess from "../../UI/icons/IconMess";
import Statistics from "../../components/Statistics";
import PhoneModule from "./PhoneModule";
import { useAuth } from "../../lib/Context/AuthCTX";
import UnpublishForm from "../UnpublishForm";
import { UnpublishCTX } from "../../lib/Context/DialogCTX";
import ProductButton from "./ProductUI/ProductButton";
import ProductDeal from "./ProductDeal";
import ProductDate from "./ProductSmallComponents/ProductDate";
import ProductPrice from "./ProductPrice";
import ProductOption from "./ProductOption";
import ProductStats from "./ProductSmallComponents/ProductStats";
import ProductFavoriteNoteCom from "./ProductSmallComponents/ProductFavoriteNoteCom";
import ProductAdsChange from "./ProductAdsChange";
export default function ProductAction(data) {
  const { id } = useAuth();
  const [openStatForm, setOpenStatForm] = useState(false);
  const [phoneModuleState, setPhoneModuleState] = useState(false);
  const handleStatFormDialog = () => setOpenStatForm(!openStatForm);

  const { matchesMobile, matchesTablet } = useMedia();

  const objP = { adstatus: 8 };
  const [offerId, setOfferId] = useState();

  const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
  const handleUnpublishFormDialog = () => setOpenUnpublishForm(!openUnpublishForm);

  /* Модальное окно */
  function pushCheck() {
    setOfferId(+data.router);
    setOpenUnpublishForm(!openUnpublishForm);
    handleUnpublishFormDialog();
  }

  const {user_id} = data;


  console.log(data.trade)

  return (
    <>
      <UnpublishCTX.Provider value={{ offerId, openUnpublishForm, setOpenUnpublishForm }}>

        {!matchesMobile && !matchesTablet && (
          user_id == undefined ? <div className="placeholder_animation product__placeholder_ProductAction_one"></div> :
            <>
              <div className={objP.adstatus === 7 ? "ad__block_top ad__padding-top" : "ad__block_top"}>
				<ProductStats id={id} sellerId={user_id} status={objP.adstatus} dialog={openStatForm} setDialog={setOpenStatForm} />
				<ProductFavoriteNoteCom id={id} sellerId={user_id} isOffer={+data.router}/>
				<ProductDate id={id} sellerId={user_id} date={ToRusDate(data.created_at)} leftDay={30} />
				<ProductPrice id={id} sellerId={user_id} status={objP.adstatus} oldPrice={data.oldprice} price={data.price} trade={data.trade} />
				<ProductDeal id={id} sellerID={user_id}>
					<ProductButton className="SellerInfoMess button contained" title='Написать продацу' icon={<IconMess/>} />
					<ProductButton className="SellerInfoCall button contained" title='Показать номер' icon={<IconCall/>} onClick={() => setPhoneModuleState(true)} />
				</ProductDeal>
				<ProductOption status={objP.adstatus} delivery={data.delivery} safeDeal={data.secure_transaction} reviewed={data.reviewed}/>
              </div>

            </>
        )
        }
		<ProductAdsChange id={id} sellerId={user_id} mobile={matchesMobile || matchesTablet} status={objP.adstatus} modalFunc={pushCheck} />
        <Dialog open={openStatForm || false} onClose={() => setOpenStatForm(!openStatForm)} fullWidth maxWidth="sm">
          <Statistics Close={handleStatFormDialog} />
        </Dialog>
        {/*  */}
        <PhoneModule dialog={phoneModuleState} setDialog={setPhoneModuleState} />
        <Dialog open={openUnpublishForm || false} onClose={() => setOpenUnpublishForm(!openUnpublishForm)} fullWidth maxWidth="xs">
          <UnpublishForm isProductPages Close={handleUnpublishFormDialog} />
        </Dialog>
      </UnpublishCTX.Provider>
    </>
  );
}
