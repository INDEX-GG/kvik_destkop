//импорты библиотек
import React, { useEffect, useState, useReducer } from "react";
import { useRouter } from "next/router";
import CustomModalUI from "src/UI/UIcomponent/CustomModal/CustomModalUI";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// свои компоненты
import { useCustomRouter } from "src/hook/globalHooks/useCustomRouter";
import { ContextApp, initialState, linkReducer } from "./reducer";
import Content from "./content/Content";
import { useFeedBack } from "./useFeedBack";
// data
import links from "./data";
// css стили

function FeedBack() {
  const {
    textOpen,
    mobileWidth,
    isMobile,
    state,
    dispatch,
    router,
  } = useFeedBack();

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
