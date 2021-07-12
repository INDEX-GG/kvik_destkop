import React, { useState, useEffect } from "react";
import { ToRubles, ToFullDate } from "../../../../lib/services";
import { useForm } from "react-hook-form";
import { AppBar, Avatar, Button, Container, Dialog, IconButton, makeStyles } from "@material-ui/core";
import UnpublishForm from "../../../UnpublishForm";
import AddRounded from "@material-ui/icons/AddRounded";
import Router from "next/router";

function Active(data) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [idAd, setIdAd] = useState([]);

  const handelRemoveFromPublic = (e) => {
    setIdAd(e.target.value);
  };

  const handelRemoveFromPublicFull = () => {
    const watchShowAge = watch("id");

    console.log(watchShowAge);
  };

  const onSubmit = (data) => {
    data.id = idAd;
    data.active = 0;
    console.log(data);
    /* axios.post('/api/qwe', sendData, {
         headers: {
            "Content-Type": "multipart/form-data"
         }
      }) */
  };

  const [openUnpublishForm, setOpenUnpublishForm] = useState(false);
  const handleUnpublishFormDialog = () => setOpenUnpublishForm(!openUnpublishForm);

  //   !
  const arr = [];

  if (arr.length == 0) {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_nav__radio">
          <label className="checkbox">
            <input type="checkbox" />
            <div className="checkbox__text"></div>
          </label>
          <button onClick={handelRemoveFromPublicFull()}>Снять с публикации</button>
        </div>
        <div className="clientPage__container_content">
          {data.offers?.map((offer) => {
            return (
              <div {...register("active")} className="offerContainer boxWrapper">
                <div className="offerImage">
                  <div className="offerPubCheck">
                    <label className="checkbox">
                      <input type="checkbox" {...register("id")} value={offer.id} />
                      <div className="checkbox__text"></div>
                    </label>
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
                          handelRemoveFromPublic(e), setOpenUnpublishForm(!openUnpublishForm);
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
  );
}
export default Active;
