import React, { useState } from "react";
import MobileModal from "../../../../components/MobileModal";
import { useRouter } from "next/router";

import UserContent from "../userContent/UserContent";

const UserContentMobile = () => {
  const router = useRouter();
  const [isShowProfileDialog, setIsShowProfileDialog] = useState(true);
  return (
    <MobileModal
      title="Профиль"
      dialog={isShowProfileDialog || false}
      close={() => {
        router.back();
        setIsShowProfileDialog((prevState) => !prevState);
      }}
    >
      {<UserContent />}
    </MobileModal>
  );
};

export default React.memo(UserContentMobile);
