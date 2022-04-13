import MetaLayout from "#layout/MetaLayout";
import React, { useState } from "react";
import { useMedia } from "../../../hooks/useMedia";
import { useOutherUser } from "../../../hooks/useOutherUser";
import MobileModal from "../../../components/MobileModal";
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

import { useUserPageStyles } from "./styles";
import ClientPageMenu from "./clientPageMenu/ClientPageMenu";

function UserPageNew() {
  const classes = useUserPageStyles();
  const [isShowProfileDialog, setIsShowProfileDialog] = useState(true);
  const { matchesMobile, matchesTablet } = useMedia();
  const router = useRouter();
  const sellerId = parseInt(router.query.id);
  const sellerInfo = useOutherUser(sellerId);

  const { isLoading = true } = sellerInfo;

  const userContent = () => {
    return <>{isLoading ? <UserPlaceHolder /> : <ClientPageMenu />}</>;
  };
  const userContentMobile = () => {
    return (
      <MobileModal
        title="Профиль"
        dialog={isShowProfileDialog || false}
        close={() => {
          // TODO: добавить роутинг на предыдущую страницу
          // router.push('/')
          // .then(() => {
          //     setIsShowProfileDialog((prevState => !prevState))
          // })
          router.back();
          setIsShowProfileDialog((prevState) => !prevState);
        }}
      >
        {userContent()}
      </MobileModal>
    );
  };
  return (
    <MetaLayout>
      <Box className="clientPage text">
        hhhh
        {matchesMobile ? userContentMobile() : userContent()}
      </Box>
    </MetaLayout>
  );
}
export default React.memo(UserPageNew);
