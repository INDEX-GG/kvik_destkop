import React from "react";

import UserPlaceHolderMobile from "./UserPlaceHolderMobile";
import { useMedia } from "../../../hooks/useMedia";

const UserPlaceHolder = () => {
  const { matchesMobile } = useMedia();

  return matchesMobile ? (
    // мобильный плейсхолдер
    <UserPlaceHolderMobile />
  ) : // десктопный плейсхолдер
  null;
};

export default React.memo(UserPlaceHolder);
