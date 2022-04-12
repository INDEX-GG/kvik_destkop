import React, { useState } from "react";
import { Box } from "@material-ui/core";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";

import Item from "../Item/Item";
import TextPage from "../textPage/TextPage";
import CallbackForm from "../callbackForm/CallbackForm";
import SupportText from "../supportText/SupportText";

import { useContent } from "./style";

const Content = ({ textOpen, links, isMobile }) => {
  const [openSupport, setOpenSupport] = useState(false);

  const classes = useContent();
  const handleChangeOpenForm = () => {
    setOpenSupport(!openSupport);
  };
  return (
    <Box className={classes.wrapper}>
      <Box component="main" className={classes.links}>
        <Box className={classes.contentWrapper}>
          {textOpen ? (
            <TextPage links={links} isMobile={isMobile} />
          ) : (
            <Box className={classes.wrapper922}>
              <Box className={classes.linksWrapper}>
                <Box className={classes.linksCenter}>
                  {links.map((item, idx) => {
                    return <Item key={idx} links={item} isMobile={isMobile} />;
                  })}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Box className={classes.wrapper922}>
          {openSupport ? <CallbackForm /> : <SupportText />}
        </Box>
        <CustomButtonUI customRoot={classes.btn} onClick={handleChangeOpenForm}>
          Перейти в диалог техподдержке
        </CustomButtonUI>
      </Box>
    </Box>
  );
};

export default Content;
