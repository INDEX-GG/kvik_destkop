import React, { useEffect, useState, useContext, useMemo } from "react";
import Link from "next/link";

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

const NavMenuItem = ({ menuItem, isMobile }) => {
  const [open, setOpen] = useState(false);

  const [pName, setpName] = useState(false);

  const { router } = useCustomRouter();
  const classes = useNavMenuItem();

  const { state, dispatch } = useContext(ContextApp);

  const btnStyle = useMemo(() => {
    return open
      ? `${classes.navMenuBtn} ${classes.navMenuBtnOpen}`
      : classes.navMenuBtn;
  });

  const nameStyle = useMemo(() => {
    return open ? `${classes.name} ${classes.nameActive}` : classes.name;
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const stopScrool = (e, newLink) => {
    e.preventDefault();

    const id = newLink.split("#")[1];
    router.push(newLink);
    // setTimeout(() => {
    scrollToElem(id);
    // }, 60);
  };

  const scrollToElem = (id) => {
    const elem = document.getElementById(id);

    if (elem) {
      if (isMobile) {
        // этот режим работает с модальным окном
        elem.scrollIntoView();
      } else {
        window.scrollTo({ top: elem.offsetTop });
      }
    }
  };
  const scroll = () => {
    let arrh1 = document.getElementsByTagName("h1");

    for (let i = 0; i < arrh1.length; i++) {
      const elem = arrh1[i];
      const { top } = elem.getBoundingClientRect();

      if (top >= 0 && top < 200) {
        setpName(elem.id);
      }
    }
  };

  const listLinks = menuItem.links.map((link, idx) => {
    const idNavlink = Object.values(link.link.query)[0];

    const linkStyle = useMemo(() => {
      return pName === idNavlink
        ? `${classes.navLink} ${classes.linkActive}`
        : classes.navLink;
    });
    const newLink = `/feedback/${menuItem.idPage}#${link.idonPage}`;
    return (
      <Box component="li" key={idx} className={linkStyle}>
        <Link href={newLink}>
          <a onClick={(e) => stopScrool(e, newLink)}>{link.text}</a>
        </Link>
      </Box>
    );
  });

  useEffect(() => {
    const idPage = menuItem.idPage;
    if (idPage === Object.values(router.query)[0]) {
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

  useEffect(() => {
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

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
