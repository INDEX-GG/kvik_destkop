import React from "react";
import { Box, FormControl, InputBase, InputAdornment } from "@material-ui/core";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";
import { useNav } from "./style";

function Nav() {
  const classes = useNav();
  return (
    <Box component="nav" className={classes.nav}>
      <Box className={classes.logo}>
        <svg
          width="101"
          height="53"
          viewBox="0 0 101 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.4122 49.3117H12.4638L8.46901 40.4823H8.38911L7.51025 49.3117H0L1.99741 28.5116H9.50766L8.7087 36.6619H8.7886L14.2215 28.5116H22.7705L15.2602 38.2749L21.4122 49.3117Z"
            fill="#2C2C2C"
          />
          <path
            d="M70.3114 49.3117H63.5664L65.3603 28.5116H72.1053L70.3114 49.3117Z"
            fill="#2C2C2C"
          />
          <path
            d="M99.2091 49.3117H90.2607L86.2659 40.4823H86.186L85.3071 49.3117H77.7969L79.7943 28.5116H87.3045L86.5056 36.6619H86.5855L92.0184 28.5116H100.567L93.0571 38.2749L99.2091 49.3117Z"
            fill="#2C2C2C"
          />
          <path
            d="M56.679 29.3156C48.8172 37.8358 41.2548 48.749 39.2454 53C36.91 48.5649 33.4885 42.2897 29.1436 35.5542C24.7988 28.8187 20.8885 24.9541 17.141 21.5864C17.141 21.5864 17.5321 20.2394 16.9238 18.3844C16.3155 16.5294 14.5704 13.9861 13.8281 13.1948C13.9911 13.2868 14.8518 13.8959 15.9462 14.6854C17.6298 15.9 19.0238 17.2986 20.3454 18.6604C20.3816 18.4948 20.3454 18 20.3281 17.5C20.2234 14.4604 18.8281 11.7593 18.8281 11.7593C18.8281 11.7593 24.6365 16.7005 30.1755 22.1938C36.6928 28.6572 39.6255 33.0698 39.6255 33.0698C39.6255 33.0698 42.1846 27.7266 50.2161 19.2125C61.6212 7.1218 71.0712 1.71142 71.0712 1.71142C71.0712 1.71142 60.6436 10.1031 54.0178 16.7833C49.171 21.6699 45.0566 27.5489 45.0566 27.5489C45.0566 27.5489 52.485 18.3844 62.0557 10.2688C70.7229 2.91934 75.9049 0 75.9049 0C75.9049 0 75.3255 0.938542 75.0902 2.37396C74.9831 3.02745 75.4161 3.975 75.4161 3.975C75.4161 3.975 72.5919 6.33335 66.5635 11.7593C62.1643 15.7189 59.1772 19.2125 59.1772 19.2125C63.685 15.1271 71.0712 9.55105 76.8281 6.07288C76.8281 6.07288 73.6962 8.8333 71.7773 11.7593C69.9603 14.5298 70.0207 16.6727 70.0391 17.327L70.0393 17.3354C70.0393 17.3354 63.2505 22.1938 56.679 29.3156Z"
            fill="url(#paint0_linear_7025_59028)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_7025_59028"
              x1="45.3281"
              y1="0"
              x2="45.3281"
              y2="53"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#52B9C5" />
              <stop offset="1" stopColor="#00A0AB" />
            </linearGradient>
          </defs>
        </svg>
      </Box>
      <Box className={classes.nav__findwraper}>
        <FormControl className={classes.navSearchField}>
          <InputBase
            className={classes.nav__search}
            id="search"
            startAdornment={
              <InputAdornment position="start">
                <svg
                  className={classes.svgSearch}
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11.003" cy="10.003" r="5.503" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.942 14.159l4.834 4.834"
                  />
                </svg>
              </InputAdornment>
            }
            placeholder="Опишите свой вопрос"
          />
        </FormControl>

        <CustomButtonUI customRoot={classes.nav__btnSearch}>
          Найти
        </CustomButtonUI>
      </Box>
    </Box>
  );
}
export default React.memo(Nav);
