import React, { useEffect, useState, useReducer } from "react";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import Item from "./Item/Item";
import TextPage from "./textPage/TextPage";

import links from "./data";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";
import CustomModalUI from "src/UI/UIcomponent/CustomModal/CustomModalUI";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { ContextApp, initialState, linkReducer } from "./reducer";
import CallbackForm from "./callbackForm/CallbackForm";
import { useFeedBack } from "./style";
import SupportText from "./supportText/SupportText";
function FeedBack() {
  const router = useRouter();
  const [textOpen, setTextOpen] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const classes = useFeedBack();
  const [state, dispatch] = useReducer(linkReducer, initialState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(659));

  const handleChangeOpenForm = () => {
    setOpenSupport(!openSupport);
  };

  useEffect(() => {
    if (Object.keys(router.query).length == 0) {
      dispatch({
        type: "reset",
        payload: {
          title: "reset",
        },
      });
      setTextOpen(false);
    } else {
      setTextOpen(true);
    }
  }, [router]);

  return (
    <ContextApp.Provider value={{ dispatch, state }}>
      {isMobile ? (
        <CustomModalUI
          open={true}
          customMobile={940}
          title={state.title}
          handleCloseModal={() => router.push(state.link)}
        >
          <Box className={classes.wrapper}>
            <Box className={classes.wrapper922}>
              <Box component="main" className={classes.links}>
                <Box className={classes.contentWrapper}>
                  {textOpen ? (
                    <TextPage links={links} isMobile={isMobile} />
                  ) : (
                    <Box className={classes.linksWrapper}>
                      <Box className={classes.linksCenter}>
                        {links.map((item, idx) => {
                          return (
                            <Item key={idx} links={item} isMobile={isMobile} />
                          );
                        })}
                      </Box>
                    </Box>
                  )}
                </Box>
                {openSupport ? <CallbackForm /> : <SupportText />}

                <CustomButtonUI
                  customRoot={classes.btn}
                  onClick={handleChangeOpenForm}
                >
                  Перейти в диалог техподдержке
                </CustomButtonUI>
              </Box>
            </Box>
          </Box>
        </CustomModalUI>
      ) : (
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
                        return (
                          <Item key={idx} links={item} isMobile={isMobile} />
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
            <Box className={classes.wrapper922}>
              {openSupport ? <CallbackForm /> : <SupportText />}
            </Box>
            <CustomButtonUI
              customRoot={classes.btn}
              onClick={handleChangeOpenForm}
            >
              Перейти в диалог техподдержке
            </CustomButtonUI>
          </Box>
        </Box>
      )}
    </ContextApp.Provider>
  );
}

export default React.memo(FeedBack);
