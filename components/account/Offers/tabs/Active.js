import React, { useState, useEffect, useRef } from "react";
import { ToRubles, ToFullDate } from "../../../../lib/services";
// import { useForm } from "react-hook-form";
import { Checkbox, Button, Dialog, makeStyles } from "@material-ui/core";

import UnpublishForm from "../../../UnpublishForm";
import AddRounded from "@material-ui/icons/AddRounded";
import Router from "next/router";
import { UnpublishCTX } from "../../../../lib/Context/DialogCTX";

import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import FiberManualRecordSharpIcon from "@material-ui/icons/FiberManualRecordSharp";
// import { useFavorits } from "../../../../lib/Context/FavoritesCTX";
// import { func } from "prop-types";

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
    background: "none",
    color: theme.palette.grey[200],
    cursor: "pointer",
    transition: "all 200ms ease-in-out",

    "&:hover": {
      transition: "all 200ms ease-in-out",
      textDecoration: "underline",
    },
  },
}));

function Active(data) {
  const classes = useStyles();

  const checkF = useRef();
  const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
  const handleUnpublishFormDialog = () => setOpenUnpublishForm(!openUnpublishForm);

  const [qwe, setQwe] = useState();

  const [offerId, setOfferId] = useState();

  useEffect(() => {
    setQwe(
      data.offers?.map((offer) => {
        return offer.id;
      })
    );
  }, [data]);

  let mainArr = [];

  function setCheck(e) {
    if (e.target.value === "" && mainArr.length === 0) {
      console.log("добавляет все");
      mainArr = qwe;
    } else if (e.target.value === "" && mainArr.length !== 0) {
      console.log("удаляет все");
      mainArr = [];
    } else if (mainArr.includes(+e.target.value)) {
      mainArr = mainArr.filter((item) => {
        return item !== +e.target.value;
      });
    } else {
      mainArr.push(+e.target.value);
    }

    setMainArr();
  }

  function setMainArr() {
    console.log("после ==============>", mainArr);
  }

  /* Модальное окно */
  function pushCheck(e) {
    if (e.target.value === "") {
      setOfferId(mainArr);
    } else {
      setOfferId([+e.target.value]);
    }
    setOpenUnpublishForm(!openUnpublishForm);
    handleUnpublishFormDialog();
  }

  if (data.offers.length == 0) {
    return (
      <div className="clientPage__placeholder-container">
        <div className="clientPage__placeholder-title">Сюда будут попадать все ваши объявления</div>
        <div className="clientPage__placeholder-ads">
          <div className="clientPage__placeholder-item">
            <div className="clientPage__placeholder-item-1"></div>
            <div className="clientPage__placeholder-item-2"></div>
            <div className="clientPage__placeholder-item-3"></div>
          </div>
          <div className="clientPage__placeholder-item">
            <div className="clientPage__placeholder-item-1"></div>
            <div className="clientPage__placeholder-item-2"></div>
            <div className="clientPage__placeholder-item-3"></div>
          </div>
          <div className="clientPage__placeholder-item">
            <div className="clientPage__placeholder-item-1"></div>
            <div className="clientPage__placeholder-item-2"></div>
            <div className="clientPage__placeholder-item-3"></div>
          </div>
        </div>
        <Button onClick={() => Router.push("/placeOffer")} className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" variant="contained" color="primary">
          <AddRounded />
          Подать объявление
        </Button>
      </div>
    );
  }

  return (
    <UnpublishCTX.Provider value={{ offerId, data, openUnpublishForm, setOpenUnpublishForm }}>
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_nav__radio">
          <Checkbox
            className={classes.check}
            color="primary"
            value=""
            icon={<FiberManualRecordOutlinedIcon />}
            checkedIcon={<FiberManualRecordSharpIcon />}
            onChange={(e) => {
              setCheck(e);
            }}
          />
          <button className={classes.btn__unpublish} onClick={(e) => pushCheck(e)}>
            Снять с публикации
          </button>
        </div>
        <div className="clientPage__container_content">
          {data.offers?.map((offer, i) => {
            return (
              <a href={`/product/${offer.id}`} key={i} className="offerContainer boxWrapper">
                <div className="offerImage">
                  <div className="offerPubCheck">
                    <Checkbox
                      className={classes.check}
                      color="primary"
                      icon={<FiberManualRecordOutlinedIcon />}
                      checkedIcon={<FiberManualRecordSharpIcon />}
                      value={offer.id}
                      ref={checkF}
                      onChange={(e) => setCheck(e)}
                      // checked={qqq}
                    />
                  </div>
                  {JSON.parse(offer.photo)
                    ?.photos?.slice(0, 1)
                    .map((imgs, i) => {
                      return <img key={i} src={imgs} />;
                    })}
                </div>
                <div className="offerDescription">
                  <div className="offerDescriptionTop">
                    <div className="offerDTLeft thin">
                      <div>{ToRubles(offer.price)}</div>
                      <div className="offerTitle">{offer.title}</div>
                      <div className="offerDatPub small light DatPub__mobile">
                        <span> Дата публикации </span>
                        {ToFullDate(offer.created_at)}
                      </div>
                      <div>Осталось 30 дней</div>
                    </div>
                    <div className="offerDTRight">
                      <button type="submit" className="offerEdit thin editIcon offerSocialAction">
                        Редактировать
                      </button>

                      <a href="javascript:void(0);">
                        <button value={offer.id} onClick={(e) => pushCheck(e)} className="offerUnpublish thin offerSocialAction">
                          Снять с публикации
                        </button>
                      </a>
                      <div className="offerSocialCount offerSocialCountPos offerSocialCountPosActive">
                        <div className="offerShowes showesIcon">0 +0</div>
                        <div className="offerAddFavores likeIcon">0 +0</div>
                      </div>
                    </div>
                  </div>
                  <div className="offerDescriptionBottom">
                    <button className="offerButtonViews button contained">Увеличить просмотры</button>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <Dialog open={openUnpublishForm} onClose={() => setOpenUnpublishForm(!openUnpublishForm)} fullWidth maxWidth="md">
        <UnpublishForm Close={handleUnpublishFormDialog} />
      </Dialog>
    </UnpublishCTX.Provider>
  );
}
export default Active;

/* import React, { useState, useEffect } from "react";
import { ToRubles, ToFullDate } from "../../../../lib/services";
import { useForm } from "react-hook-form";
import { Box, Checkbox, Button, Container, Dialog, IconButton, makeStyles } from "@material-ui/core";

import UnpublishForm from "../../../UnpublishForm";
import AddRounded from "@material-ui/icons/AddRounded";
import Router from "next/router";
import { UnpublishCTX } from "../../../../lib/Context/DialogCTX";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';


const useStyles = makeStyles((theme) => ({
  check: {
    padding: '0px',
    background: theme.palette.secondary.main,
    width: '14px',
    height: '14px',

    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
}));



function Active(data) {

  const classes = useStyles();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [idAd, setIdAd] = useState([]);
  const [filteredData, setFilteredData] = useState({});

  const handelRemoveFromPublic = (e) => {
    e.preventDefault();
    setIdAd(e.target.value);
    setFilteredData(data.offers.filter(item => item.id == idAd));
    setOpenUnpublishForm(!openUnpublishForm)
  };
  const handelRemoveFromPublicFull = () => {
    const watchShowAge = watch("id");
    // console.log(watchShowAge);
  };

  const onSubmit = (addata) => {
    addata.id = idAd;
    addata.active = 0;
    setOpenUnpublishForm(!openUnpublishForm)
    // console.log(addata)
    handleUnpublishFormDialog()
  };



  const checkItemFull = (data) => () => {
    let idItem = data.offers.map((offer) =>
    setOfferInfo((state) => ({
      ...state,
      [offer.id]: state[offer.id]
        ? ''
        : {
          id: offer.id,
          title: offer.title,
          action: 0,
        }
    })))
  }



  const [offerInfo, setOfferInfo] = useState({});
  const checkItem = (offer) => () => {
    setOfferInfo((state) => ({
      ...state,
     [offer.id]: state[offer.id]
        ? ''
        : {
          id: offer.id,
          title: offer.title,
          verify: 0,
        }
    }));


  };
 console.log(offerInfo);
  useEffect(() => {

  }, [offerInfo]);



  const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
  const handleUnpublishFormDialog = () => setOpenUnpublishForm(!openUnpublishForm);
  if (data.offers.length == 0) {
    return (
      <div className="clientPage__placeholder-container">
        <div className="clientPage__placeholder-title">Сюда будут попадать все ваши объявления</div>
        <div className="clientPage__placeholder-ads">
          <div className="clientPage__placeholder-item">
            <div className="clientPage__placeholder-item-1"></div>
            <div className="clientPage__placeholder-item-2"></div>
            <div className="clientPage__placeholder-item-3"></div>
          </div>
          <div className="clientPage__placeholder-item">
            <div className="clientPage__placeholder-item-1"></div>
            <div className="clientPage__placeholder-item-2"></div>
            <div className="clientPage__placeholder-item-3"></div>
          </div>
          <div className="clientPage__placeholder-item">
            <div className="clientPage__placeholder-item-1"></div>
            <div className="clientPage__placeholder-item-2"></div>
            <div className="clientPage__placeholder-item-3"></div>
          </div>
        </div>
        <Button onClick={() => Router.push("/placeOffer")} className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" variant="contained" color="primary">
          <AddRounded />
          Подать объявление
        </Button>
      </div>
    );
  }

  return (
    <UnpublishCTX.Provider value={{ idAd, filteredData }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="clientPage__container_bottom">
          <div className="clientPage__container_nav__radio">
            <Checkbox
              className={classes.check}
              color='primary'
              icon={<FiberManualRecordOutlinedIcon />}
              checkedIcon={<FiberManualRecordSharpIcon />}
              onClick={checkItemFull(data)}
            />
            <button onClick={handelRemoveFromPublicFull()}>Снять с публикации</button>
          </div>
          <div className="clientPage__container_content">
            {data.offers?.map((offer, i) => {
              return (
                <a href={`/product/${offer.id}`} key={i} {...register("active")} className="offerContainer boxWrapper">
                  <div className="offerImage">
                    <div className="offerPubCheck">
                      <Checkbox
                        className={classes.check}
                        color='primary'
                        icon={<FiberManualRecordOutlinedIcon />}
                        checkedIcon={<FiberManualRecordSharpIcon />}
                        {...register("id")}
                        onClick={checkItem(offer)}
                        value={offerInfo[offer.id]}
                      />
                    </div>
                    {JSON.parse(offer.photo)
                      ?.photos?.slice(0, 1)
                      .map((imgs, i) => {
                        return <img key={i} src={imgs} />;
                      })}
                  </div>
                  <div className="offerDescription">
                    <div className="offerDescriptionTop">
                      <div className="offerDTLeft thin">
                        <div>{ToRubles(offer.price)}</div>
                        <div className="offerTitle">{offer.title}</div>
                        <div className="offerDatPub small light DatPub__mobile">
                          <span> Дата публикации </span>
                          {ToFullDate(offer.created_at)}
                        </div>
                        <div>Осталось 30 дней</div>
                      </div>
                      <div className="offerDTRight">
                        <button type="submit" className="offerEdit thin superLight editIcon">
                          Редактировать
                        </button>
                        <button
                          type="submit"
                          value={offer.id}
                          onClick={(e) => {
                            handelRemoveFromPublic(e);
                          }}
                          className="offerUnpublish thin superLight"
                        >
                          Снять с публикации
                        </button>
                        <div className="offerSocialCount">
                          <div className="offerShowes showesIcon">0 +0</div>
                          <div className="offerAddFavores likeIcon">0 +0</div>
                        </div>
                      </div>
                    </div>
                    <div className="offerDescriptionBottom">
                      <button className="offerButtonViews button contained">Увеличить просмотры</button>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <Dialog open={openUnpublishForm} onClose={() => setOpenUnpublishForm(!openUnpublishForm)} fullWidth maxWidth="xs">
          <UnpublishForm Close={handleUnpublishFormDialog} />
        </Dialog>
      </form>
    </UnpublishCTX.Provider>
  );

}
export default Active;
 */
