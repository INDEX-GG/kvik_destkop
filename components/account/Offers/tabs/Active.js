import React, { useState, useEffect } from "react";
import { Checkbox, makeStyles, Dialog } from "@material-ui/core";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import FiberManualRecordSharpIcon from "@material-ui/icons/FiberManualRecordSharp";
import { useOfferAccount } from "../../../../lib/Context/OfferAccountCTX";
import Placeholder from "./Placeholder";
import OfferModal from "../../../OfferModal";
import OfferActivePlaceHolder from "../../../placeHolders/OfferPlaceHolder/OfferActivePlaceHolder/OfferActivePlaceHolder";
import throttle from "lodash.throttle";
import OfferCard from "../card/OfferCard";

const useStyles = makeStyles((theme) => ({
  check: {
    padding: "0px",
    background: theme.palette.secondary.main,
    width: "14px",
    height: "14px",
    "&:hover": {
      background: theme.palette.secondary.main,
    },
  },
  btn__unpublish: {
    marginLeft: "12px",
    background: "transparent",
    color: theme.palette.grey[200],
    cursor: "pointer",
    transition: "all 200ms ease-in-out",
    "&:hover": {
      transition: "all 200ms ease-in-out",
      textDecoration: "underline",
      background: "transparent",
    },
  },
}));

function Active({ offers }) {
  // console.log('Active - offers: ', offers)

  const classes = useStyles();
  const { page, setPage, totalPosts, page_limit } = useOfferAccount();
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [offerId, setOfferId] = useState([]);
  const [offerData, setOfferData] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const buttonId = "003";
  const offersLength = offers.length;

  const throttledScrollHandler = throttle(scrollHandler, 500);

  const cleanAll = () => {
    setCheck(false);
    setOfferId([]);
    setOfferData([]);
  };

  function getChildCheck({ id, isCheck }) {
    setOfferId(
      isCheck
        ? (prev) => [...prev, id]
        : (prev) => prev.filter((item) => item !== id)
    );
    setOfferData(
      isCheck
        ? (prev) => [...prev, offers.filter((item) => item.id === id)[0]]
        : (prev) => prev.filter((item) => item.id !== id)
    );
  }

  useEffect(() => {
    offerId.length === offers.length
      ? check
        ? null
        : setCheck(false)
      : check === false
      ? null
      : setCheck(true);
  }, [offerId]);

  // запрещаем вешать слушатель скрола, при первом рендере т.к. стейты еще не пришли.
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    // _.debounce(calculateLayout, 150)
    document.addEventListener("scroll", throttledScrollHandler);
    return () => {
      document.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [totalPosts, isFirstRender]);

  // pageNumber - переменная для сохранения значения. (сделана из-за того, что для функции scrollHandler page всегда равна первому значению)
  let pageNumber = page;
  function scrollHandler(e) {
    // высчитываем высоту отступа между скролом и низом страницы
    const pixelsFromBottom =
      e.target.documentElement.scrollHeight -
      e.target.documentElement.scrollTop -
      window.innerHeight;
    const maxPossiblePage = Math.ceil(totalPosts.active / page_limit);
    if (maxPossiblePage <= pageNumber && !isFirstRender) {
      return;
    }
    // если находится нужная нам высота, обновляем страницу для повторого запроса
    if (pixelsFromBottom <= 200) {
      setPage(pageNumber + 1);
      pageNumber += 1;
    }
  }

  if (offers?.length === 0) {
    return <>{!offers ? <OfferActivePlaceHolder /> : <Placeholder />}</>;
  }

  return (
    <>
      {!offers ? (
        <OfferActivePlaceHolder />
      ) : (
        <div className="clientPage__container_bottom">
          {offers.length > 1 && (
            <div className="clientPage__container_nav__radio">
              <Checkbox
                className={classes.check}
                color="primary"
                value=""
                icon={<FiberManualRecordOutlinedIcon />}
                checkedIcon={<FiberManualRecordSharpIcon />}
                onChange={(e) => {
                  e.target.checked === false
                    ? cleanAll()
                    : setCheck(e.target.checked);
                }}
                checked={check}
              />
              <button
                className={classes.btn__unpublish}
                onClick={() => {
                  offerData.length > 0
                    ? setOpenOfferModal(!openOfferModal)
                    : null;
                }}
              >
                Снять с публикации
              </button>
            </div>
          )}
          <div className="clientPage__container_content">
            {offers?.map((offer) => {
              return (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  typeTab="activeTab"
                  typeButton={"003"}
                  parentCheck={check}
                  getChildCheck={getChildCheck}
                  parentUnpublishForm={openOfferModal}
                  allDataCheck={offerId}
                  offersLength={offersLength}
                />
              );
            })}
          </div>
        </div>
      )}
      <Dialog
        open={openOfferModal}
        onClose={() => setOpenOfferModal(!openOfferModal)}
        fullWidth
        maxWidth="xs"
      >
        <OfferModal
          offerId={offerId}
          offerData={offerData}
          setOpenOfferModal={setOpenOfferModal}
          openOfferModal={openOfferModal}
          cleanAll={cleanAll}
          buttonId={buttonId}
          offersLength={offersLength}
        />
      </Dialog>
    </>
  );
}
export default Active;
