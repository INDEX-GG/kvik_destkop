import React from "react";
import { Box } from "@material-ui/core";
import ScrollGetMore from "src/components/ScrollGetMore/ScrollGetMore";

import { UseUsersPage } from "./useUser";

import { useUserStyle } from "./style";

const UsersPage = ({ data, itemNav, setItemNav }) => {
  const classes = useUserStyle();
  const { items, userBnts } = UseUsersPage(data, itemNav, setItemNav);
  return (
    <>
      <Box className={classes.clientPage__container_top}>
        <Box className={classes.clientPage__container_nav__wrapper}>
          <Box className={classes.clientPage__container_nav}>{userBnts}</Box>
        </Box>
      </Box>
      {items}
    </>
  );
};

export default React.memo(
  ScrollGetMore({
    url: "/api/getSeller",
    tabs: ["active_posts", "archive_posts"],
  })(UsersPage)
);
