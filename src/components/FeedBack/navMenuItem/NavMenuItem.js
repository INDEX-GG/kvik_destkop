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
import { useCustomRouter } from "src/hook/globalHooks/useCustomRouter";

const NavMenuItem = ({ menuItem }) => {
  const [open, setOpen] = useState(false);
  const { router } = useCustomRouter();
  const classes = useNavMenuItem();

  const { state, dispatch } = useContext(ContextApp);

  const btnStyle = useMemo(() => {
    return open
      ? `${classes.navMenuBtn} ${classes.navMenuBtnOpen}`
      : classes.navMenuBtn;
  });
  // const btnStyle = open
  //   ? `${classes.navMenuBtn} ${classes.navMenuBtnOpen}`
  //   : classes.navMenuBtn;
  const nameStyle = useMemo(() => {
    return open ? `${classes.name} ${classes.nameActive}` : classes.name;
  });
  // const nameStyle = open
  //   ? `${classes.name} ${classes.nameActive}`
  //   : classes.name;

  const handleClick = () => {
    setOpen(!open);
  };
  const listLinks = menuItem.links.map((link, idx) => {
    const pathName = Object.values(router.query)[0];
    const idNavlink = Object.values(link.link.query)[0];
    const linkStyle = useMemo(() => {
      return pathName === idNavlink
        ? `${classes.navLink} ${classes.linkActive}`
        : classes.navLink;
    });
    // const linkStyle =
    //   pathName === idNavlink
    //     ? `${classes.navLink} ${classes.linkActive}`
    //     : classes.navLink;

    return (
      <Box component="li" key={idx} className={linkStyle}>
        <Link href={link.link} replace>
          {link.text}
        </Link>
      </Box>
    );
  });
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
