import React, { useState, useEffect } from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import StarRating from "../StarRating";
import Active_icon from "../../UI/icons/ActiveIcon";
import Router from "next/router";
import { useProduct } from "../../hooks/useProduct";
import { useOutherUser } from "../../hooks/useOutherUser"
import { Dialog } from "@material-ui/core";

export default function PhoneModule({dialog, setDialog}) {


  const [infoSeller, setInfoSeller] = useState({})
  const { name, userPhoto, raiting, user_id, isLoading } = useProduct(Router);
  const {sellerPhone} = useOutherUser(user_id)

  // useEffect(() => {
  //   setInfoSeller({name: name, userPhoto, raiting, user_id, sellerPhone})
  //   console.log(infoSeller.length)
  //   console.log(infoSeller)
  //   console.log("2")
  // })

  const useStyles = makeStyles(() => ({
    modalNumber: {
      fontSize: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "16px",
    },
    userProfile: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    userInf: {
      marginLeft: "14px",
    },
    userName: {
      fontSize: "12px",
      color: "#2C2C2C",
    },
    userStar: {
      display: "flex",
      alignItems: "center",
    },
    numberStar: {
      marginRight: "4px",
      color: "#5A5A5A",
      fontSize: "14px",
      fontWeight: "500",
    },
    userPhone: {
      color: "#2C2C2C",
      fontSize: "30px",
      marginBottom: "7px",
    },
    userMessage: {
      color: "#5A5A5A",
      marginBottom: "30px",
    },
    warningMessage: {
      marginBottom: "15px",
      fontWeight: "500",
      color: "#5A5A5A",
    },
    warningBlock: {
      color: "#5A5A5A",
      fontWeight: "500",
    },
    warningItem: {
      marginBottom: "20px",
    },
    small: {
      width: "56px",
      height: "56px",
    },
  }));
  const classes = useStyles();
  return (
    <Dialog open={dialog} onClose={() => setDialog(!dialog)} fullWidth maxWidth="sm">
      <div className={classes.modalNumber}>
        <div className={classes.userProfile}>
          {isLoading || (
            <Avatar alt="User" className={classes.small} src={userPhoto}>
              {name}
            </Avatar>
          )}
          <div className={classes.userInf}>
            <div className={classes.userName}>{name}</div>
            <div className={classes.userStar}>
              {raiting == null ? null : <div className={classes.numberStar}>{(raiting + "").split("").splice(0, 4).join("")}</div>}
              <StarRating rating={raiting} />
            </div>
          </div>
        </div>
        <h2 className={classes.userPhone}>{sellerPhone || "Не указан"}</h2>
        <p className={classes.userMessage}>Сообщите продавцу, что это объявление Вы нашли с помощью KVIK</p>
        <div className={classes.warningMessage}>Советы о том как не попасться мошенникам</div>
        <ul className={classes.warningBlock}>
          <li className={classes.warningItem}>
            <Active_icon Size={12} Color="#5A5A5A" />
            &nbsp;Никому не сообщайте платежные данные
          </li>
          <li className={classes.warningItem}>
            <Active_icon Size={12} Color="#5A5A5A" />
            &nbsp;Храните в тайне персональные данные
          </li>
          <li className={classes.warningItem}>
            <Active_icon Size={12} Color="#5A5A5A" />
            &nbsp;Не переходите по незнакомым ссылкам
          </li>
          <li className={classes.warningItem}>
            <Active_icon Size={12} Color="#5A5A5A" />
            &nbsp;Не переходите в другие мессенджеры
          </li>
        </ul>
      </div>
    </Dialog>
  );
}
