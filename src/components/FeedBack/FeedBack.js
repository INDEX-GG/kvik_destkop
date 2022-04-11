//импорты библиотек
import React, { useEffect, useState, useReducer, useRef } from "react";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";
import CustomModalUI from "src/UI/UIcomponent/CustomModal/CustomModalUI";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// свои компоненты
import Item from "./Item/Item";
import TextPage from "./textPage/TextPage";
import CallbackForm from "./callbackForm/CallbackForm";
import SupportText from "./supportText/SupportText";
import { ContextApp, initialState, linkReducer } from "./reducer";
// data
import links from "./data";
// css стили
import { useFeedBack } from "./style";

function FeedBack() {
  const router = useRouter();
  const [textOpen, setTextOpen] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [state, dispatch] = useReducer(linkReducer, initialState);
  const classes = useFeedBack();
  const theme = useTheme();
  const myRef = useRef("");
  const mobileWidth = 655;
  const isMobile = useMediaQuery(theme.breakpoints.down(mobileWidth));
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
          // customMobile={940}
          customMobile={mobileWidth}
          title={state.title}
          handleCloseModal={() => router.push(state.link)}
        >
          <Box className={classes.wrapper} ref={myRef}>
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
