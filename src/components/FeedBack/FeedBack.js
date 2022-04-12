//импорты библиотек
import React, { useEffect, useState, useReducer } from "react";
// import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
// import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";
import CustomModalUI from "src/UI/UIcomponent/CustomModal/CustomModalUI";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// свои компоненты
// import Item from "./Item/Item";
// import TextPage from "./textPage/TextPage";
// import CallbackForm from "./callbackForm/CallbackForm";
// import SupportText from "./supportText/SupportText";
import { ContextApp, initialState, linkReducer } from "./reducer";
// data
import links from "./data";
// css стили
import { useFeedBack } from "./style";
import Content from "./content/Content";

function FeedBack() {
  const router = useRouter();
  const [textOpen, setTextOpen] = useState(false);
  // const [openSupport, setOpenSupport] = useState(false);
  const [state, dispatch] = useReducer(linkReducer, initialState);
  const classes = useFeedBack();
  const theme = useTheme();

  const mobileWidth = 655;
  const isMobile = useMediaQuery(theme.breakpoints.down(mobileWidth));
  // const handleChangeOpenForm = () => {
  //   setOpenSupport(!openSupport);
  // };

  useEffect(() => {
    if (Object.keys(router.query).length == 0) {
      dispatch({
        type: "reset",
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
          customMobile={mobileWidth}
          title={state.title}
          handleCloseModal={() => router.push(state.link)}
        >
          <Content textOpen={textOpen} links={links} isMobile={isMobile} />
        </CustomModalUI>
      ) : (
        <Content textOpen={textOpen} links={links} isMobile={isMobile} />
      )}
    </ContextApp.Provider>
  );
}

export default React.memo(FeedBack);
