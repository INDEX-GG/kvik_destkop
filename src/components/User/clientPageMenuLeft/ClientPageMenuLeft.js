import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@material-ui/core";
import { ToRusAccountDate, initials } from "../../../../lib/services";
import CustomAvatarUI from "src/UI/UIcomponent/CustomAvatar/CustomAvatarUI";
import CustomRatingUI from "src/UI/UIcomponent/CustomRating/CustomRatingUI";
import CustomTooltipUI from "src/UI/UIcomponent/CustomTooltip/CustomTooltipUI";
import { STATIC_URL } from "../../../../lib/constants";
import { useAuth } from "../../../../lib/Context/AuthCTX";
import { useOutherUser } from "../../../../hooks/useOutherUser";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";
import ClientPageSubMenu from "../clientPageSubMenu/ClientPageSubMenu";
import { useClientPageMenuLeft } from "./style";

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
    <Box className={classes.clientPage__menu}>
      <Box className={classes.clientPage__userinfo}>
        <Box className={classes.clientPage__userpic}>
          {isLoading ? null : (
            <CustomAvatarUI
              alt={"avatar"}
              src={`${STATIC_URL}/${sellerPhoto}`}
              userName={initials(sellerName)}
              customStyle={classes.avararSize}
            />
          )}
        </Box>
        <Box className={classes.clientPage__username}>{sellerName}</Box>
        <Box
          className={`${classes.clientPage__userRegDate} ${classes.light} ${
            classes.small
          }`}
        >
          на Kvik c {createdAt ? ToRusAccountDate(createdAt) : ""}
        </Box>

        <CustomTooltipUI title="В разработке">
          <Box className={classes.clientPage__userrate}>
            <CustomRatingUI rating={raiting} />
          </Box>
        </CustomTooltipUI>
        <Box
          className={`${classes.clientPage__userstats} ${classes.highlight} ${
            classes.small
          }`}
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

          <Box className={classes.userStats}>
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
