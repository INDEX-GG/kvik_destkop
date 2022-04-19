import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@material-ui/core";
import { useStore } from "#lib/Context/Store";
import { useStatistics } from "#lib/Context/StatisticsCTX";
import { useAuth } from "../../../../lib/Context/AuthCTX";
import { useClientSubMenu } from "./style";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";

const ClientPageSubMenu = () => {
  const [loading /* setLoading*/] = useState(false);
  const [userBool, setUserBool] = useState(false);
  const router = useRouter();
  const { id /*token*/ } = useAuth();
  const sellerId = parseInt(router.query.id);
  const { userInfo } = useStore();
  const { addSubscribers, addUnsubscribe } = useStatistics();

  const classes = useClientSubMenu();

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

  const handleSubscribebtn = () => {
    setUserBool(!userBool);
    subscribeClickHandler();
  };
  return (
    <>
      <button
        disabled={loading}
        className={classes.btnSubscribe}
        onClick={() => {
          handleSubscribebtn;
        }}
      >
        {userBool ? "Отписаться" : "Подписаться"}
      </button>
      <Box className={classes.ad__block_bottom__adaptive_right}>
        <CustomButtonUI
          customRoot={` ${classes.small} ${classes.light} ${classes.underline}`}
        >
          Пожаловаться{" "}
          <Typography className={`${classes.SellerInfoComplain}`} />
        </CustomButtonUI>
      </Box>
    </>
  );
};

export default React.memo(ClientPageSubMenu);
