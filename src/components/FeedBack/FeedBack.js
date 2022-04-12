//импорты библиотек
import React from "react";
import CustomModalUI from "src/UI/UIcomponent/CustomModal/CustomModalUI";

// свои компоненты
import { ContextApp } from "./reducer";
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
