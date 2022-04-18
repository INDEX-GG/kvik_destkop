import { useEffect, useState, useContext, useMemo } from "react";
import { ContextApp } from "../reducer";
import { useCustomRouter } from "src/hook/globalHooks/useCustomRouter";
import Link from "next/link";

import { Box } from "@material-ui/core";

import { useNavMenuItem } from "./style";

export const useMenuItem = (menuItem, isMobile) => {
  const [open, setOpen] = useState(false);
  const [pName, setpName] = useState(false);
  const { router } = useCustomRouter();

  const { state, dispatch } = useContext(ContextApp);
  const classes = useNavMenuItem();

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
  const elemId = router.asPath.split("#")[1];

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
        <Link href={newLink} scroll={false}>
          <a>{link.text}</a>
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

    // скроллим к элементы в случае нажатия кнопки назад
    // без таймаута не работает
    setTimeout(() => {
      scrollToElem(elemId);
    });
  }, [router]);

  useEffect(() => {
    //первый скролл к элементу

    setTimeout(() => {
      scrollToElem(elemId);
    });

    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return { btnStyle, nameStyle, open, handleClick, listLinks };
};
