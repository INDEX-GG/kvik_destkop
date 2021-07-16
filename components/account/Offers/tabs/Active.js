import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    console.log(offerInfo);
  }, [offerInfo]);



  const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
  const handleUnpublishFormDialog = () => setOpenUnpublishForm(!openUnpublishForm);

  if (data.offers.lenght == 0) {
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
            {data.offers?.map((offer) => {
              return (
                <div {...register("active")} className="offerContainer boxWrapper">
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


                      {/* <label className="checkbox">
                        <input type="checkbox"  {...register("id")} value={offer.id} />
                        <div className="checkbox__text"></div>
                      </label> */}
                    </div>
                    {JSON.parse(offer.photo)
                      .photos.slice(0, 1)
                      .map((imgs) => {
                        return <img src={imgs} />;
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
                </div>
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
