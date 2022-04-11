import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@material-ui/core";
import { useText } from "./style";
import { useRouter } from "next/router";
import Link from "next/link";
import NavMenu from "../navMenu/NavMenu";

const TextPage = ({ links, isMobile }) => {
  const [pageData, setPageData] = useState({ links: [], header: "" });

  // const [activePage, setActivePage] = useState("/ff");

  const [link, setlink] = useState({});
  const classes = useText();
  const router = useRouter();

  const myRef = useRef();

  const scroll = () => {
    let arr = myRef.current.getElementsByTagName("h1");

    for (let i = 0; i < arr.length; i++) {
      let elem = arr[i];
      let elemTop = elem.getBoundingClientRect();

      if (elemTop.top > 0 && elemTop.top < 400) {
        let adressAnch = window.location.search.split("=")[1];

        let adressPage = window.location.search.split("=")[0].slice(1);

        if (adressAnch === elem.id) {
          // console.log("совпадают ничего не делать");
        } else {
          // console.log("обновляем на", elem.id);
          router.push({ query: { [adressPage]: elem.id } }, undefined, {
            shallow: true,
          });
        }
      }
    }
  };

  //фильтрую доступные страницы по ключу из  router.query
  useEffect(() => {
    const a = Object.keys(router.query)[0];
    console.log("слежка за router", a);

    const filtered = links.filter((arr) => {
      const b = Object.keys(arr.links[0].link.query)[0];
      if (a === b) {
        setlink(arr.links[0].link);
        return arr;
      }
    });
    // console.log("слежка за router", router.query);

    setPageData(filtered[0]);
  }, [router]);

  useEffect(() => {
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);
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
