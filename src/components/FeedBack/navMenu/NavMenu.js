import React, { useMemo } from "react";
import { Box } from "@material-ui/core";

import { useNavMenu } from "./style";
import { useMedia } from "#hooks/useMedia";
import NavMenuItem from "../navMenuItem/NavMenuItem";

const NavMenu = ({ links, isMobile }) => {
  const classes = useNavMenu();

  const navMenuStyle = isMobile
    ? classes.navMenuClose
    : `${classes.navMenu} ${classes.st}`;

  return (
    <>
      <Box className={navMenuStyle}>
        {links.map((menuItem, idx) => {
          return <NavMenuItem key={idx} menuItem={menuItem} />;
        })}
      </Box>
    </>
  );
};
export default React.memo(NavMenu);
