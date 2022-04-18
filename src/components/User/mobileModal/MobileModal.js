import React from "react";
import { Box } from "@material-ui/core";
import { useMedia } from "../../../../hooks/useMedia";
import { Dialog } from "@material-ui/core";
import { useModalMobile } from "./style";

const MobileModal = ({
  title,
  subtitle = false,
  dialog = false,
  close,
  children,
  customClassesContainer = "",
}) => {
  const { matchesMobile, matchesTablet } = useMedia();
  const MobileDevice = matchesMobile || matchesTablet;
  const classes = useModalMobile();
  return MobileDevice ? (
    <Dialog
      open={dialog || false}
      fullScreen={true}
      className={customClassesContainer}
    >
      <Box
        // className="modal__wrapper_md"
        className={classes.modal__wrapper_md}
      >
        <Box
          //   className="modal__block__top mobileModalTop"
          className={`${classes.modal__block__top} ${classes.mobileModalTop}`}
        >
          <>
            <Box
              //   className="modalModalTitleBox"
              className={classes.modalModalTitleBox}
            >
              {MobileDevice ? (
                <Box
                  //   className="mobileModalArrow"
                  className={classes.mobileModalArrow}
                  onClick={() => close()}
                />
              ) : null}
              <h6
                // className="modal__block__top_title mobileModalTitle"
                className={`${classes.modal__block__top_title} ${
                  classes.mobileModalTitle
                } `}
              >
                {title}
              </h6>
              {subtitle && (
                <Box
                  //   className="mobileModalSubtitle"
                  className={classes.mobileModalSubtitle}
                >
                  {subtitle}
                </Box>
              )}
            </Box>
          </>
          {children}
        </Box>
      </Box>
    </Dialog>
  ) : null;
};

export default React.memo(MobileModal);
