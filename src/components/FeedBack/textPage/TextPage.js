//импорты библиотек
import React, { useRef } from "react";
import { Box, Typography } from "@material-ui/core";
// свои компоненты
import Link from "next/link";
import NavMenu from "../navMenu/NavMenu";
import TextContext from "../textContext/TextContext";
import { useTextPage } from "./useTextPage";
// css стили
import { useText } from "./style";

const TextPage = ({ links, isMobile }) => {
  const myRef = useRef();
  const classes = useText();
  const { pageData, state } = useTextPage(links, isMobile, myRef);

  const textContents = () => {
    return pageData.links.map((textItem, idx) => {
      const id = Object.values(textItem.link.query)[0];
      return <TextContext key={idx} id={id} textItem={textItem} />;
    });
  };

  return (
    <Box className={classes.textPage} ref={myRef}>
      <Box>
        {isMobile ? (
          ""
        ) : (
          <Box component="nav" className={classes.nav}>
            <Link href={state.link} replace className={classes.navLink}>
              Помощь
            </Link>
            {/* <Box className={classes.navLink}>{pageData.header}</Box> */}
          </Box>
        )}
        {pageData ? (
          <Box className={classes.textContentWrapper}>{textContents}</Box>
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
