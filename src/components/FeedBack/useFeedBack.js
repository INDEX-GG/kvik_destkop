import { useState, useEffect, useReducer } from "react";
import { useCustomRouter } from "src/hook/globalHooks/useCustomRouter";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { initialState, linkReducer } from "./reducer";
import { useTheme } from "@material-ui/core/styles";

export const useFeedBack = () => {
  const [state, dispatch] = useReducer(linkReducer, initialState);
  const { router } = useCustomRouter();
  const [textOpen, setTextOpen] = useState(false);
  const mobileWidth = 655;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(mobileWidth));

  useEffect(() => {
    let keys = Object.keys(router.query).length === 0;
    if (keys) {
      dispatch({
        type: "reset",
      });
      setTextOpen(false);
    } else {
      setTextOpen(true);
    }
  }, [router]);

  return {
    textOpen,
    router,
    state,
    dispatch,
    isMobile,
  };
};
