import React from "react";
import MetaLayout from "#layout/MetaLayout";
import { useMedia } from "../../../hooks/useMedia";

import { Box } from "@material-ui/core";

import { useUserPageStyles } from "./styles";

import UserContent from "./userContent/UserContent";
import UserContentMobile from "./userContentMobile/UserContentMobile";

function UserPageNew() {
  const classes = useUserPageStyles();
  const { matchesMobile, matchesTablet } = useMedia();

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
}
export default React.memo(UserPageNew);
