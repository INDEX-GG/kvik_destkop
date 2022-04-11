//импорты библиотек
import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
// свои компоненты
import Link from "next/link";
import NavMenu from "../navMenu/NavMenu";
// css стили
import { useText } from "./style";

const TextPage = ({ links, isMobile }) => {
  const [pageData, setPageData] = useState({ links: [], header: "" });
  const [link, setlink] = useState({});
  const classes = useText();
  const router = useRouter();
  const myRef = useRef();

  const scroll = () => {
    let arr = myRef.current.getElementsByTagName("h1");
    for (let i = 0; i < arr.length; i++) {
      let elem = arr[i];
      let elemTop = elem.getBoundingClientRect();
      if (elemTop.top >= 0 && elemTop.top < 200) {
        let adressId = window.location.search.split("=")[1];
        let adressPage = window.location.search.split("=")[0].slice(1);
        // если не равно значит Новый элемент защел в зону активации активной ссылки
        if (adressId !== elem.id) {
          router.push({ query: { [adressPage]: elem.id } }, undefined, {
            shallow: true,
          });
        }
      }
    }
  };

  const scrollToElem = () => {
    const idElem = Object.values(router.query)[0];
    const elem = document.getElementById(idElem);

    if (elem) {
      if (isMobile) {
        // этот режим работает с модальным окном
        elem.scrollIntoView();
      } else {
        window.scrollTo({ top: elem.offsetTop });
      }
    }
  };
  //фильтрую доступные страницы по ключу из  router.query
  useEffect(() => {
    const routerPage = Object.keys(router.query)[0];
    //фильтрация массива по ключу из роутера с элементом из массива для определения активной страницы
    const filtered = links.filter((arr) => {
      const arrPage = Object.keys(arr.links[0].link.query)[0];
      if (routerPage === arrPage) {
        setlink(arr.links[0].link);
        return arr;
      }
    });
    setPageData(filtered[0]);
    //скролл при изменении роута до ID значения роута
    scrollToElem();
  }, [router]);

  useEffect(() => {
    window.addEventListener("scroll", scroll);

    setTimeout(() => {
      scrollToElem();
    });
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  useEffect(() => {
    scrollToElem();
  }, [pageData]);
  return (
    <Box className={classes.textPage} ref={myRef}>
      <Box>
        {isMobile ? (
          ""
        ) : (
          <Box component="nav" className={classes.nav}>
            <Link
              href={{
                query: {},
              }}
              replace
              className={classes.navLink}
            >
              Помощь
            </Link>
            {pageData ? (
              <Link href={link} replace className={classes.navLink}>
                {pageData.header}
              </Link>
            ) : (
              ""
            )}
          </Box>
        )}
        {pageData ? (
          <Box className={classes.textContentWrapper}>
            {pageData.links.map((textItem, idx) => {
              const id = Object.values(textItem.link.query)[0];
              return (
                <Box key={idx} className={classes.textContent}>
                  <Typography variant="h1" className={classes.h1} id={id}>
                    {textItem.text}
                  </Typography>
                  {textItem.texts.map((text, idx) => {
                    return (
                      <Box key={idx} component="p" className={classes.text}>
                        {text}
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        ) : (
          <Typography variant="h2" className={classes.errortext}>
            ошибка! нет текста
          </Typography>
        )}
      </Box>
      <NavMenu links={links} isMobile={isMobile} />
    </Box>
  );
};
export default React.memo(TextPage);
