import React, { useState } from "react";
import { useOutherUser } from "../../../../hooks/useOutherUser";
import { useRouter } from "next/router";
import { Avatar, Box, Button } from "@material-ui/core";
import {
  ToRusAccountDate,
  stringToColor,
  initials,
} from "../../../../lib/services";
import { Tooltip } from "@mui/material";
import { STATIC_URL } from "../../../../lib/constants";
import StarRating from "../../../../components/StarRating";
import ClientPageSubMenu from "../clientPageSubMenu/ClientPageSubMenu";
import { useAuth } from "../../../../lib/Context/AuthCTX";
import { useClientPageMenuLeft } from "./style";
import CustomAvatarUI from "src/UI/UIcomponent/CustomAvatar/CustomAvatarUI";
const ClientPageMenuLeft = () => {
  const [reviewsModal, setReviewsModal] = useState(false);
  const [subscriptionsModal, setSubscriptionsModal] = useState(false);
  const { id /*token*/ } = useAuth();
  const router = useRouter();
  const sellerId = parseInt(router.query.id);
  const sellerInfo = useOutherUser(sellerId);
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
  const classes = useClientPageMenuLeft();
  return (
    <Box
      // className="clientPage__menu"
      className={classes.clientPage__menu} //добавил
    >
      <Box
        // className="clientPage__userinfo"
        className={classes.clientPage__userinfo} //добавил
      >
        <Box
          // className="clientPage__userpic"
          className={classes.clientPage__userpic} //добавил
        >
          {isLoading ? null : (
            <CustomAvatarUI
              alt={"avatar"}
              src={`${STATIC_URL}/${sellerPhoto}`}
              userName={initials(sellerName)}
            />
            // <Avatar
            //   src={`${STATIC_URL}/${sellerPhoto}`}
            //   style={{
            //     backgroundColor: `${stringToColor(sellerName)}`,
            //   }}
            // >
            //   {initials(sellerName)}
            // </Avatar>
          )}
        </Box>

        <Box
          // className="clientPage__username"
          className={classes.clientPage__username}
        >
          {sellerName}
        </Box>
        <Box
          // className="clientPage__userRegDate light small" // !!! НЕ НАШЕЛ clientPage__userRegDate
          className={`${classes.clientPage__userRegDate} ${classes.light} ${
            classes.small
          }`}
        >
          на Kvik c {createdAt ? ToRusAccountDate(createdAt) : ""}
        </Box>

        <Tooltip
          title="В разработке"
          arrow
          classes={{ tooltip: classes.tooltip, arrow: classes.arrow }} //  добавил
        >
          <Box
            // className="clientPage__userrate"
            className={classes.clientPage__userrate} //  добавил
          >
            <Box
              // className="clientPage__userrate__num"
              className={classes.clientPage__userrate__num} //  добавил
            >
              {raiting}
            </Box>
            <StarRating rating={raiting} />
          </Box>
        </Tooltip>

        <Box
          // className="clientPage__userstats highlight small"
          className={`${classes.clientPage__userstats} ${classes.highlight} ${
            classes.small
          }`} //  добавил
        >
          <Tooltip
            title="В разработке"
            arrow
            classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
          >
            <Box className={classes.userStats}>
              <span>{"0"}</span>
              <Button
                className={classes.buttonDesc}
                добавить
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
              className={classes.buttonDesc} /*добавил*/
              size="small"
              variant="text" /*onClick={() => setSubscribersModal(!subscriptionsModal)}*/
            >
              <p>Подписчиков</p>
            </Button>
          </Box>

          <Box className={classes.userStats} /* добавил */>
            <span>{subscriptions_count}</span>
            <Button
              className={classes.buttonDesc} /* добавил */
              size="small"
              variant="text"
              onClick={() => setSubscriptionsModal(!subscriptionsModal)}
            >
              <p>Подписки</p>
            </Button>
          </Box>
        </Box>

        {+router.query.id === id ? null : <ClientPageSubMenu />}
      </Box>
    </Box>
  );
};

export default React.memo(ClientPageMenuLeft);
