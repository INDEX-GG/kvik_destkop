import { Box } from "@material-ui/core";
import React from "react";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";
import safeAccountTab from "../../../../components/safeAccountTab";
import { useClientPageNav } from "./style";

const ClientPageNav = ({ navItems, itemNav, setItemNav }) => {
  const classes = useClientPageNav();
  return (
    <>
      <Box className={classes.clientPage__container_top}>
        <Box className={classes.clientPage__container_nav__wrapper}>
          <Box className={classes.clientPage__container_nav}>
            {navItems.map((item) => {
              return (
                <CustomButtonUI
                  disableRipple={true}
                  key={item.id}
                  customRoot={
                    itemNav.i === item.id
                      ? `${classes.tabBtn} ${classes.navActive}`
                      : classes.tabBtn
                  }
                  onClick={() => {
                    setItemNav({ i: item.id, ttl: item.title });
                    safeAccountTab(item.id);
                  }}
                >
                  {`${item.title} ${item.count || ""}`}
                </CustomButtonUI>
              );
            })}
          </Box>
        </Box>
      </Box>
      {navItems.map((item) => itemNav.i === item.id && item.content)}
    </>
  );
};

export default React.memo(ClientPageNav);
