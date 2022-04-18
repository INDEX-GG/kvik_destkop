import React, { useState } from "react";
import { useRouter } from "next/router";
import UserContent from "../userContent/UserContent";
import MobileModal from "../mobileModal/MobileModal";

// import MobileModal from "../../../../components/MobileModal";

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
    // <MobileModal
    //   title="Профиль"
    //   dialog={isShowProfileDialog || false}
    //   close={() => {
    //     router.back();
    //     setIsShowProfileDialog((prevState) => !prevState);
    //   }}
    // >
    //   {<UserContent />}
    // </MobileModal>
  );
};

export default React.memo(UserContentMobile);
