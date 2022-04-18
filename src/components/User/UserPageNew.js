import React from "react";
import { Box } from "@material-ui/core";
import { useMedia } from "../../../hooks/useMedia";
import UserContentMobile from "./userContentMobile/UserContentMobile";
import MetaLayout from "#layout/MetaLayout";

import UserContent from "./userContent/UserContent";

import { useUserPageStyles } from "./styles";

const UserPageNew = () => {
  const classes = useUserPageStyles();
  const { matchesMobile } = useMedia();

  return (
    <MetaLayout>
      <Box
        // className="clientPage text"
        className={`${classes.clientPage} ${classes.text}`}
      >
        {matchesMobile ? <UserContentMobile /> : <UserContent />}
      </Box>
    </MetaLayout>
  );
};
export default React.memo(UserPageNew);
