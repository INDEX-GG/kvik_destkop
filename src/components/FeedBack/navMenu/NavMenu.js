import React, { useMemo } from "react";
import { Box } from "@material-ui/core";
//свои компоненты
import NavMenuItem from "../navMenuItem/NavMenuItem";
// стили
import { useNavMenu } from "./style";

const NavMenu = ({ links, isMobile }) => {
  const classes = useNavMenu();
  const navMenuStyle = useMemo(() => {
    return isMobile ? classes.navMenuClose : `${classes.navMenu} ${classes.st}`;
  });

  return (
    <Box className={navMenuStyle}>
      {links.map((menuItem, idx) => {
        return (
          <NavMenuItem key={idx} menuItem={menuItem} isMobile={isMobile} />
        );
      })}
    </Box>
  );
};
export default React.memo(NavMenu);
