import React, { useEffect, useState, useContext, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

import { ContextApp } from "../reducer";

import { useNavMenuItem } from "./style";

const NavMenuItem = ({ menuItem }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const classes = useNavMenuItem();

  const { state, dispatch } = useContext(ContextApp);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const param = Object.keys(menuItem.links[0].link.query)[0];
    if (param === Object.keys(router.query)[0]) {
      dispatch({
        type: "setTitle",
        payload: {
          title: menuItem.header,
        },
      });

      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [router]);

  const btnStyle = open
    ? `${classes.navMenuBtn} ${classes.navMenuBtnOpen}`
    : classes.navMenuBtn;

  const nameStyle = open
    ? `${classes.name} ${classes.nameActive}`
    : classes.name;

  const listLinks = menuItem.links.map((link, idx) => {
    const value1 = Object.values(router.query)[0];
    const value2 = Object.values(link.link.query)[0];

    const linkStyle =
      value1 === value2
        ? `${classes.navLink} ${classes.linkActive}`
        : classes.navLink;

    return (
      <Box component="li" key={idx} className={linkStyle}>
        <Link href={link.link} replace>
          {link.text}
        </Link>
      </Box>
    );
  });

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
