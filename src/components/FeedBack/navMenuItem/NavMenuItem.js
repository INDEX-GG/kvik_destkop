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
  const [currentPage, setCurrentPage] = useState("");
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
  const scrollToElem = () => {
    console.log("СКРОЛЛ К ЭЛЕМЕНТУ");
    const idElem = window.location.hash.split("#")[1];
    console.log("elemelemelem", idElem);
    const elem = document.getElementById(idElem);
    console.log("elemelemelem", elem);
    // if (elem) {
    //   if (isMobile) {
    //     // этот режим работает с модальным окном
    //     elem.scrollIntoView();
    //   } else {
    //     window.scrollTo({ top: elem.offsetTop });
    //   }
    // }
    if (elem) {
      window.scrollTo({ top: elem.offsetTop });
    }
  };
  const scroll = () => {
    let currentPage = window.location.pathname.split("/")[2];
    let arrh1 = document.getElementsByTagName("h1");

    // for (let i = 0; i < arrh1.length; i++) {
    //   const elem = arrh1[i];
    //   const { top } = elem.getBoundingClientRect();
    //   if (top >= 0 && top < 200) {
    //     const locationId = window.location.hash.split("#")[1];
    //     // если не равно значит Новый элемент защел в зону активации активной ссылки
    //     if (locationId !== elem.id) {
    //       router.push(`/feedback/${currentPage}/#${elem.id}`, undefined, {
    //         shallow: true,
    //       });
    //     }
    //   }
    // }
  };

  const listLinks = menuItem.links.map((link, idx) => {
    const pathName = window.location.hash.split("#")[1];
    const idNavlink = Object.values(link.link.query)[0];

    const linkStyle = useMemo(() => {
      return pathName === idNavlink
        ? `${classes.navLink} ${classes.linkActive}`
        : classes.navLink;
    });

    return (
      <Box component="li" key={idx} className={linkStyle}>
        <Link href={`/feedback/${menuItem.idPage}#${link.idonPage}`}>
          {link.text}
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
    // setTimeout(() => {
    //   scrollToElem();
    // });
  }, [router]);

  useEffect(() => {
    window.addEventListener("scroll", scroll);

    // setTimeout(() => {
    //   scrollToElem();
    // });
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
