import React, { useState } from "react";
import { useRouter } from "next/router";
import { Avatar, Box, Button, Typography } from "@material-ui/core";
import {
  ToRusAccountDate,
  stringToColor,
  initials,
} from "../../../../lib/services";
import { Tooltip } from "@mui/material";
import ClientPageSubMenu from "../clientPageSubMenu/ClientPageSubMenu";
import CustomAvatarUI from "src/UI/UIcomponent/CustomAvatar/CustomAvatarUI";
import CustomRatingUI from "src/UI/UIcomponent/CustomRating/CustomRatingUI";
import CustomTooltipUI from "src/UI/UIcomponent/CustomTooltip/CustomTooltipUI";
import { STATIC_URL } from "../../../../lib/constants";
import StarRating from "../../../../components/StarRating";
import { useAuth } from "../../../../lib/Context/AuthCTX";
import { useOutherUser } from "../../../../hooks/useOutherUser";
import { useClientPageMenuLeft } from "./style";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";

const ClientPageMenuLeft = () => {
  const router = useRouter();
  const { id /*token*/ } = useAuth();
  const sellerId = parseInt(router.query.id);
  const sellerInfo = useOutherUser(sellerId);
  const [reviewsModal, setReviewsModal] = useState(false);
  const [subscriptionsModal, setSubscriptionsModal] = useState(false);
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

  const handleSetReviewsModal = () => {
    setReviewsModal(!reviewsModal);
  };

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
              customStyle={classes.avararSize}
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
        {/* <Tooltip
          title="В разработке"
          arrow
          classes={{ tooltip: classes.tooltip, arrow: classes.arrow }} //  добавил
        >
          <Box
          // className="clientPage__userrate"
          // className={classes.clientPage__userrate} //  добавил
          >
            <Box
              // className="clientPage__userrate__num"
              className={classes.clientPage__userrate__num} //  добавил
            >
              {raiting}
            </Box>
            <StarRating rating={raiting} /> 
          </Box>
        </Tooltip> */}

        <CustomTooltipUI title="В разработке">
          <Box
            className={classes.clientPage__userrate} //  добавил класс для отступа
          >
            {/* ширина звезд не совпадает со старым дизайном */}
            <CustomRatingUI rating={raiting} />
          </Box>
        </CustomTooltipUI>
        <Box
          // className="clientPage__userstats highlight small"
          className={`${classes.clientPage__userstats} ${classes.highlight} ${
            classes.small
          }`} //  добавил
        >
          <CustomTooltipUI title="В разработке">
            <Box className={classes.userStats}>
              <Typography className={classes.countSize}>{"0"}</Typography>
              <CustomButtonUI
                customRoot={classes.buttonDesc}
                onClick={() => handleSetReviewsModal}
              >
                <Typography variant="text">Отзывы</Typography>
              </CustomButtonUI>
            </Box>
          </CustomTooltipUI>

          <Box className={classes.userStats}>
            <Typography className={classes.countSize}>
              {subscribers_count}
            </Typography>
            <CustomButtonUI
              customRoot={classes.buttonDesc}
              /*onClick={() => setSubscribersModal(!subscriptionsModal)}*/
            >
              <Typography variant="text">Подписчиков</Typography>
            </CustomButtonUI>
          </Box>

          <Box className={classes.userStats} /* добавил */>
            <Typography className={classes.countSize}>
              {subscriptions_count}
            </Typography>
            <CustomButtonUI
              customRoot={classes.buttonDesc}
              onClick={() => setSubscriptionsModal(!subscriptionsModal)}
            >
              <Typography variant="text">Подписки</Typography>
            </CustomButtonUI>
          </Box>
        </Box>
        {+router.query.id === id ? null : <ClientPageSubMenu />}
      </Box>
    </Box>
  );
};

export default React.memo(ClientPageMenuLeft);
