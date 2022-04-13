import React, { useState } from "react";
import { Avatar, Box, Button } from "@material-ui/core";

import { Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import ScrollTop from "../../../../UI/ScrollTop";
import { useOutherUser } from "../../../../hooks/useOutherUser";
import User from "../../../../components/User/User";
import {
  ToRusAccountDate,
  stringToColor,
  initials,
} from "../../../../lib/services";
import StarRating from "../../../../components/StarRating";
import { STATIC_URL } from "../../../../lib/constants";
import { useStatistics } from "#lib/Context/StatisticsCTX";
import { useStore } from "#lib/Context/Store";
import { useAuth } from "../../../../lib/Context/AuthCTX";
import { useClientPageMenu } from "./styles";
const ClientPageMenu = () => {
  const classes = useClientPageMenu();
  const router = useRouter();
  const sellerId = parseInt(router.query.id);
  const sellerInfo = useOutherUser(sellerId);
  const { userInfo } = useStore();
  const { addSubscribers, addUnsubscribe } = useStatistics();
  const [reviewsModal, setReviewsModal] = useState(false);
  const [subscriptionsModal, setSubscriptionsModal] = useState(false);
  const [userBool, setUserBool] = useState(false);
  const [itemNav, setItemNav] = useState({ i: 1, ttl: "Активные" });
  const { id /*token*/ } = useAuth();
  const [loading /* setLoading*/] = useState(false);
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
  return (
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
  );
};

export default ClientPageMenu;
