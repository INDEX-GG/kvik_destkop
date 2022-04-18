import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@material-ui/core";
import { useStore } from "#lib/Context/Store";
import { useStatistics } from "#lib/Context/StatisticsCTX";
import { useAuth } from "../../../../lib/Context/AuthCTX";
import { useClientSubMenu } from "./style";
import CustomLinkUI from "src/UI/UIcomponent/CustomLinkUI/CustomLinkUI";
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

  return (
    <>
      <button
        disabled={loading}
        // className="btnSubscribe"
        className={classes.btnSubscribe}
        // onClick={() => subscribeUser()}
        onClick={() => {
          setUserBool(!userBool);
          subscribeClickHandler();
        }}
      >
        {userBool ? "Отписаться" : "Подписаться"}
      </button>
      <Box
        // className="ad__block_bottom__adaptive_right"
        className={classes.ad__block_bottom__adaptive_right}
      >
        <CustomButtonUI
          customRoot={` ${classes.small} ${classes.light} ${classes.underline}`}
        >
          Пожаловаться
        </CustomButtonUI>
        <Typography
          className={`${classes.SellerInfoComplain} ${classes.small} ${
            classes.light
          } ${classes.underline}`}
        />
        {/* <CustomLinkUI
          customRoot={`${classes.SellerInfoComplain} ${classes.small} ${
            classes.light
          } ${classes.underline}`}
        >
          Пожаловаться
        </CustomLinkUI> */}

        {/* <a
          // className="SellerInfoComplain small light underline"
          className={`${classes.SellerInfoComplain} ${classes.small} ${
            classes.light
          } ${classes.underline}`}
        >
          Пожаловаться
        </a> */}
      </Box>
    </>
  );
};

export default React.memo(ClientPageSubMenu);
