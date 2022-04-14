import React, { useState } from "react";
import { useAuth } from "../../../../lib/Context/AuthCTX";
import { useStore } from "#lib/Context/Store";
import { useStatistics } from "#lib/Context/StatisticsCTX";
import { useRouter } from "next/router";
import { Box } from "@material-ui/core";
import { useClientSubMenu } from "./style";

const ClientPageSubMenu = () => {
  const [loading /* setLoading*/] = useState(false);
  const { id /*token*/ } = useAuth();
  const { userInfo } = useStore();
  const [userBool, setUserBool] = useState(false);
  const { addSubscribers, addUnsubscribe } = useStatistics();
  const router = useRouter();
  const sellerId = parseInt(router.query.id);

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
        <a
          // className="SellerInfoComplain small light underline"
          className={`${classes.SellerInfoComplain} ${classes.small} ${
            classes.light
          } ${classes.underline}`}
        >
          Пожаловаться
        </a>
      </Box>
    </>
  );
};

export default React.memo(ClientPageSubMenu);
