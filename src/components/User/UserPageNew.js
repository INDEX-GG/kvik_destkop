import MetaLayout from "#layout/MetaLayout";
import React, { useState } from "react";
import { useMedia } from "../../../hooks/useMedia";
import { useOutherUser } from "../../../hooks/useOutherUser";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  makeStyles,
} from "@material-ui/core";
import { useRouter } from "next/router";
import UserPlaceHolder from "../../../components/placeHolders/UserPlaceHolder/UserPlaceHolder";
import {
  ToRusAccountDate,
  stringToColor,
  initials,
} from "../../../lib/services";
import { STATIC_URL } from "../../../lib/constants";
import { useAuth } from "../../../lib/Context/AuthCTX";

import { Tooltip } from "@mui/material";

import ScrollTop from "../../../UI/ScrollTop";

import User from "../../../components/User/User";

import StarRating from "../../../components/StarRating";
import { useStatistics } from "#lib/Context/StatisticsCTX";
import { useStore } from "#lib/Context/Store";
import { useUserPageStyles } from "./styles";

function UserPageNew() {
  const { userInfo } = useStore();
  const { addSubscribers, addUnsubscribe } = useStatistics();
  const [reviewsModal, setReviewsModal] = useState(false);
  const [subscriptionsModal, setSubscriptionsModal] = useState(false);
  const [userBool, setUserBool] = useState(false);
  const classes = useUserPageStyles();

  const { id /*token*/ } = useAuth();
  const { matchesMobile, matchesTablet } = useMedia();
  const router = useRouter();
  const sellerId = parseInt(router.query.id);
  const sellerInfo = useOutherUser(sellerId);
  const [itemNav, setItemNav] = useState({ i: 1, ttl: "Активные" });
  const [loading /* setLoading*/] = useState(false);
  const {
    name: sellerName,
    userPhoto: sellerPhoto,
    raiting,
    createdAt,
    isLoading = true,
    /*sellerId,*/
    subscribers_count,
    subscriptions_count,
  } = sellerInfo;

  const subscribeClickHandler = () => {
    if (!id) return;

    if (userInfo && userBool) {
      addUnsubscribe(sellerId)();
      setUserBool(false);
      return;
    }
    if (userInfo && !userBool) {
      addSubscribers(sellerId)();
      setUserBool(true);
      return;
    }
  };
  const userContent = () => {
    return (
      <>
        {isLoading ? (
          <UserPlaceHolder />
        ) : (
          <>
            <Box className="clientPage__menu">
              <Box className="clientPage__userinfo">
                <Box className="clientPage__userpic">
                  {isLoading ? null : (
                    <Avatar
                      src={`${STATIC_URL}/${sellerPhoto}`}
                      style={{
                        backgroundColor: `${stringToColor(sellerName)}`,
                      }}
                    >
                      {initials(sellerName)}
                    </Avatar>
                  )}
                </Box>

                <Box className="clientPage__username">{sellerName}</Box>
                <Box className="clientPage__userRegDate light small">
                  на Kvik c {createdAt ? ToRusAccountDate(createdAt) : ""}
                </Box>

                <Tooltip
                  title="В разработке"
                  arrow
                  classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
                >
                  <Box className="clientPage__userrate">
                    <Box className="clientPage__userrate__num">{raiting}</Box>
                    <StarRating rating={raiting} />
                  </Box>
                </Tooltip>

                <Box className="clientPage__userstats highlight small">
                  <Tooltip
                    title="В разработке"
                    arrow
                    classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
                  >
                    <Box className={classes.userStats}>
                      <span>{"0"}</span>
                      <Button
                        className={classes.buttonDesc}
                        size="small"
                        variant="text"
                        disabled
                        onClick={() => setReviewsModal(!reviewsModal)}
                      >
                        <p>Отзывы</p>
                      </Button>
                    </Box>
                  </Tooltip>

                  <Box className={classes.userStats}>
                    <span>{subscribers_count}</span>
                    <Button
                      className={classes.buttonDesc}
                      size="small"
                      variant="text" /*onClick={() => setSubscribersModal(!subscriptionsModal)}*/
                    >
                      <p>Подписчиков</p>
                    </Button>
                  </Box>

                  <Box className={classes.userStats}>
                    <span>{subscriptions_count}</span>
                    <Button
                      className={classes.buttonDesc}
                      size="small"
                      variant="text"
                      onClick={() => setSubscriptionsModal(!subscriptionsModal)}
                    >
                      <p>Подписки</p>
                    </Button>
                  </Box>
                </Box>

                {+router.query.id === id ? null : (
                  <>
                    <button
                      disabled={loading}
                      className="btnSubscribe"
                      // onClick={() => subscribeUser()}
                      onClick={() => {
                        setUserBool(!userBool);
                        subscribeClickHandler();
                      }}
                    >
                      {userBool ? "Отписаться" : "Подписаться"}
                    </button>
                    <Box className="ad__block_bottom__adaptive_right">
                      {/*<a className="SellerInfoShutUp small light underline" onClick={() => {*/}
                      {/*  if (!blockLoading) setBlockOpen(true)*/}
                      {/*}}>{userBlockBool ? 'Разбокировать' :'Заблокировать'} пользователя</a>*/}
                      <a className="SellerInfoComplain small light underline">
                        Пожаловаться
                      </a>
                    </Box>
                  </>
                )}
              </Box>
            </Box>

            <Box className="clientPage__container">
              <User itemNav={itemNav} setItemNav={setItemNav} />
            </Box>
            <ScrollTop />
          </>
        )}
      </>
    );
  };

  return (
    <MetaLayout>
      <Box className="clientPage text">
        hhhh
        {matchesMobile ? "userContentMobile()" : userContent()}
      </Box>
    </MetaLayout>
  );
}
export default React.memo(UserPageNew);
