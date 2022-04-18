import React from "react";
import { Box } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

import { useMenuItem } from "./useMenuItem";

import { useNavMenuItem } from "./style";

const NavMenuItem = ({ menuItem, isMobile }) => {
  const classes = useNavMenuItem();

  const { btnStyle, nameStyle, open, handleClick, listLinks } = useMenuItem(
    menuItem,
    isMobile
  );

  return (
    <Box className={classes.sticky}>
      <ListItemButton onClick={handleClick} className={btnStyle}>
        {open ? <ExpandMore /> : <ExpandLess />}
        <ListItemText primary={menuItem.header} className={nameStyle} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="ul" className={classes.navLinks}>
          {listLinks}
        </List>
      </Collapse>
    </Box>
  );
};

export default React.memo(NavMenuItem);
