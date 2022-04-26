import React, { useState, useEffect } from "react";
import Router from "next/router";
import { ToRubles } from "../../../../lib/services";
// import Verify from "../../../json/verify.json";
import { Checkbox, makeStyles, Dialog } from "@material-ui/core";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import FiberManualRecordSharpIcon from "@material-ui/icons/FiberManualRecordSharp";
import OfferModal from "../../../OfferModal";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";
import CustomLinkUI from "src/UI/UIcomponent/CustomLinkUI/CustomLinkUI";
import Image from "next/image";
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
  btn__publish: {
    marginLeft: "12px",
    background: "none",
    color: theme.palette.grey[200],
    cursor: "pointer",
    transition: "all 200ms ease-in-out",

    "&:hover": {
      transition: "all 200ms ease-in-out",
      textDecoration: "underline",
    },
  },
  btn__edit: {
    marginLeft: "12px",
    background: "none",
    color: theme.palette.grey[200],
    cursor: "pointer",
    transition: "all 200ms ease-in-out",

    "&:hover": {
      transition: "all 200ms ease-in-out",
      textDecoration: "underline",
    },
  },
  btn__delete: {
    marginLeft: "12px",
    background: "none",
    color: theme.palette.grey[200],
    cursor: "pointer",
    transition: "all 200ms ease-in-out",
    fontWeight: 400,
    fontSize: "13px",
    "&:hover": {
      transition: "all 200ms ease-in-out",
      textDecoration: "underline",
      background: "transparent",
    },
  },
}));

export default function offerArchive({
  offer,
  parentCheck,
  getChildCheck,
  allOfferId,
  parentOpenDelActiveForm,
  offersLength,
}) {
  const classes = useStyles();

  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [offerId, setOfferId] = useState();
  const [buttonId, setButtonId] = useState("");
  const offerData = offer;
  const offerID = offer.id;
  const cleanAll = () => {
    getChildCheck({ id: offer.id, isChecked: false });
    setCheck(false);
  };

  useEffect(() => {
    parentCheck
      ? check
        ? null
        : (getChildCheck({ id: offer.id, isCheck: parentCheck }),
          setCheck(parentCheck))
      : check === false
      ? null
      : allOfferId.length === 0
      ? (getChildCheck({
          id: offer.id,
          isCheck: parentCheck,
        }),
        setCheck(parentCheck))
      : null;
  }, [parentCheck]);

  useEffect(() => {
    parentOpenDelActiveForm === false && allOfferId.length === 0
      ? setCheck(false)
      : null;
  }, [parentOpenDelActiveForm]);

  function pushCheck(e) {
    if (e.target.value !== "") {
      setOfferId([+e.target.value]);
    }
    setOpenOfferModal(!openOfferModal);
    setButtonId(e.target.id);
  }

  return (
    <>
      <div
        key={offer.id}
        className="offerContainer boxWrapper"
        onClick={(event) => {
          if (
            event.target.localName !== "button" &&
            event.target.localName !== "input"
          ) {
            Router.push(`/product/${offer.id}`);
          }
        }}
      >
        <div className="offerImage">
          {offersLength > 1 && (
            <div className="offerPubCheck">
              <Checkbox
                className={classes.check}
                color="primary"
                icon={<FiberManualRecordOutlinedIcon />}
                checkedIcon={<FiberManualRecordSharpIcon />}
                value={offer.id}
                onChange={(event) => {
                  getChildCheck({
                    id: offer.id,
                    isCheck: event.target.checked,
                  }),
                    setCheck(event.target.checked);
                }}
                checked={check}
              />
            </div>
          )}

          {offer.photo?.slice(0, 1).map((imgs, i) => {
            return <Image key={i} src={imgs} alt={"Изображение обьявления"} />;
          })}

          {<Image src={offer.img} alt={"Изображение обьявления"} />}
          {/* старый вариант отображения статуса, после изменения API тут не хватает данных, нужно адекватно заполнить пропсы */}
          {/* {offer.verify === 7 ? "" : <div className="offerWaitCause megaLight">{Verify[offer.active]}</div>} */}
          {offer.verify === 7 ? (
            ""
          ) : (
            <div className="offerWaitCause megaLight">Продано</div>
          )}
        </div>
        <div className="offerDescription">
          <div className="offerDescriptionTop">
            <div className="offerDTLeft thin">
              <div className="offerPrice">{ToRubles(offer.price)}</div>
              <div className="offerTitle">{offer.title}</div>
            </div>

            <div className="offerDTRight">
              <CustomLinkUI href="#" customRoot="offerDTRight__item">
                <span className="offerIcon checkMarkIcon" />

                <CustomButtonUI
                  id="001"
                  value={offer.id}
                  onClick={(e) => pushCheck(e)}
                  customRoot="offerActivate thin superLight offerSocialAction"
                >
                  Активировать
                </CustomButtonUI>
              </CustomLinkUI>

              <CustomButtonUI
                customRoot="offerDTRight__item offerEdit thin offerSocialAction"
                onClick={() => Router.push(`/editPage/${offerID}`)}
              >
                <span className="offerIcon editIcon" />
                Редактировать
              </CustomButtonUI>

              <CustomLinkUI href="#" customRoot="offerDTRight__item">
                <span className="offerIcon binIcon" />

                <CustomButtonUI
                  disableRipple={true}
                  id="002"
                  customRoot={classes.btn__delete}
                  onClick={(e) => {
                    offerData.length > 0 ? pushCheck(e) : null;
                  }}
                >
                  Удалить
                </CustomButtonUI>
              </CustomLinkUI>
            </div>
          </div>
          <div className="offerDescriptionBottomEnd">
            <div
              className="offerSocialCount offerSocialCountPos offerRightBottomNull"
              style={{ justifyContent: "end", paddingRight: "0" }}
            >
              <div className="offerShowes showesIcon">
                {offer.last_day_viewing_count} +{offer.all_time_contact_count}
              </div>
              <div className="offerAddFavores likeIcon">
                {offer.likes_count} +0
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={openOfferModal || false}
        onClose={() => setOpenOfferModal(!openOfferModal)}
        fullWidth
        maxWidth="md"
      >
        <OfferModal
          offerId={offerId}
          offerData={offerData}
          openOfferModal={openOfferModal}
          setOpenOfferModal={setOpenOfferModal}
          buttonId={buttonId}
          cleanAll={cleanAll}
        />
      </Dialog>
    </>
  );
}
