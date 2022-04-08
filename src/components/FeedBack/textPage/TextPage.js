import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useText } from "./style";
import { useRouter } from "next/router";
import Link from "next/link";
import NavMenu from "../navMenu/NavMenu";

const TextPage = ({ links, isMobile }) => {
  const [pageData, setPageData] = useState({ links: [], header: "" });
  const [link, setlink] = useState({});
  const classes = useText();
  const router = useRouter();

  useEffect(() => {
    const a = Object.keys(router.query)[0];
    const filtered = links.filter((arr) => {
      const b = Object.keys(arr.links[0].link.query)[0];
      if (a === b) {
        setlink(arr.links[0].link);
        return arr;
      }
    });

    setPageData(filtered[0]);
  }, [router]);

  return (
    <Box className={classes.textPage}>
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
            {pageData.links.map((textItem) => {
              return (
                <Box
                  key={textItem.id}
                  className={classes.textContent}
                  id={textItem.id}
                >
                  <Typography
                    variant="h1"
                    id={textItem.id}
                    className={classes.h1}
                  >
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
