import React, { useState } from "react";
import { useRouter } from "next/router";
import UserContent from "../userContent/UserContent";
import CustomModalUI from "src/UI/UIcomponent/CustomModal/CustomModalUI";

const UserContentMobile = () => {
  const router = useRouter();
  const [isShowProfileDialog, setIsShowProfileDialog] = useState(true);
  return (
    <CustomModalUI
      title="Профиль"
      open={isShowProfileDialog}
      handleCloseModal={() => {
        router.back();
        setIsShowProfileDialog((prevState) => !prevState);
      }}
    >
      {<UserContent />}
    </CustomModalUI>
  );
};

export default React.memo(UserContentMobile);
