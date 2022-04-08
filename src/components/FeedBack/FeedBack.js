import React, { useEffect, useState, useMemo, useReducer } from "react";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import Item from "./Item/Item";
import NavMenu from "./navMenu/NavMenu";
import TextPage from "./textPage/TextPage";
import Footer from "../AnyPage/Footer/Footer";
import Support from "./support/Support";
import { useFeedBack } from "./style";

import links from "./data";

import CustomModalUI from "src/UI/UIcomponent/CustomModal/CustomModalUI";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { ContextApp, initialState, linkReducer } from "./reducer";

function FeedBack() {
  console.log(links);
  const router = useRouter();
  const [textOpen, setTextOpen] = useState(false);

  const classes = useFeedBack();

  const [state, dispatch] = useReducer(linkReducer, initialState);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(659));

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

                <Support />
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
              <Support />
            </Box>
          </Box>
        </Box>
      )}
    </ContextApp.Provider>
  );
}

export default React.memo(FeedBack);
