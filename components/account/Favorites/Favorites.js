import React, { useState } from "react";
import Offers from "./tabs/Offers";
import Searches from "./tabs/Searches";
import Sellers from "./tabs/Sellers";
import { brooklyn } from "../../../lib/services";
// import { useAuth } from '../../../lib/Context/AuthCTX';
// import { useRouter } from 'next/router';
import safeAccountTab from "../../safeAccountTab";
// import {getTokenDataByPost} from "../../../lib/fetch";

import ScrollGetMore from "src/components/ScrollGetMore/ScrollGetMore";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";

import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  clientPage__container_top: {
    top: "65px",
    backgroundColor: "#fff",
    //   zIndex: 1,
    padding: "0 28px",
    borderRadius: "8px 8px 0 0",
    zIndex: 2,
    [theme.breakpoints.down(1080)]: {
      position: "relative",
      boxShadow: "none",
      top: 0,
      padding: "0",
    },
    [theme.breakpoints.down(450)]: {
      padding: "0 10px",
    },
  },

  clientPage__container_nav__wrapper: {
    overflowX: "auto",
    overflowY: "hidden",
    margin: "0 0 21px 0",
    whiteSpace: "nowrap",
    [theme.breakpoints.down(960)]: {
      margin: 0,
      borderBottom: "none",
    },
  },
  clientPage__container_nav: {
    width: "100%",
    padding: "15px 0 8px 0",
    margin: "0 0 5px 0",
    borderBottom: "2px solid #e9e9e9",

    "& > *": {
      fontSize: "18px",
      color: "#8f8f8f",

      "&:hover": {
        transition: "all 200ms ease-in-out",
        color: "#5a5a5a",
      },
      [theme.breakpoints.down(1080)]: {
        width: "100%",
        paddingBottom: "8px",
        textAlign: "center",
        // padding: "0px 0 16px 0",
      },
      [theme.breakpoints.down(520)]: {
        fontSize: "14px",
        padding: 0,
      },
    },
    [theme.breakpoints.down(1080)]: {
      padding: "0 0 0 0",
      display: "flex",
      justifyContent: "space-between",
    },
    [theme.breakpoints.down(960)]: {
      margin: "0 0 10px 0",
      borderBottom: "none",
    },
  },

  tabBtn: {
    color: "#8f8f8f",
    borderRadius: 0,
    minWidth: "100px",
    marginBottom: "-10px",
    marginRight: "30px",
    paddingBottom: "10px",
    borderBottom: "4px solid transparent",

    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:active": {
      backgroundColor: "transparent ",
    },
    "&>child": {
      backgroundColor: "blue",
    },
    [theme.breakpoints.down(1080)]: {
      marginRight: 0,
    },
  },
  navActive: {
    // marginBottom: "-4px",
    color: "#2c2c2c",
    position: "relative",
    borderBottom: "4px solid #fff6a5",
    // paddingBottom: "4px",
  },
}));

// Пагинация
const Favorites = ({ data }) => {
  // const Favorites = () => {

  // const { id, token } = useAuth();
  const [itemNav, setItemNav] = useState({ i: 1, ttl: "Объявления" });
  const classes = useStyles();
  // const router = useRouter()

  // const [offetFav, setOfferFav] = useState()
  // const [seller, setSeller] = useState(0)
  // const [search, setSearch] = useState(0)

  // useEffect(() => {

  // 	getTokenDataByPost('/api/PersonalAreaFavorites', { user_id: id, page: 1, page_limit: 50}, token)
  // 		.then(data => {
  // 			setOfferFav(data.liked_posts)
  // 			setSeller(data.subscriptions)
  // 			setSearch(data.searchs)
  // 		})
  // 		.catch(error => {
  // 			console.log('PersonalAreaFavorites: ', error)
  // 		})

  // }, [id])

  // useEffect(() => {
  // 	if (router) {
  // 		if (router.query.content !== undefined) {
  // 			setItemNav({ i: +router.query.content, ttl: navItems[router.query.content - 1].title })
  // 		}
  // 	}
  // }, [router])

  const navItems = [
    {
      id: 1,
      title: "Объявления",
      content: <Offers key={1} itemsPost={data?.liked_posts?.data || []} />,
      count: data?.liked_posts_count || 0,
    },
    {
      id: 2,
      title: "Продавцы",
      content: <Sellers key={2} sellers={data?.subscriptions?.data || []} />,
      count: data?.subscriptions_count || 0,
    },
    {
      id: 3,
      title: "Поиски",
      content: <Searches key={3} searches={data?.searchs?.data || []} />,
      count: data?.searchs_count || 0,
    },
  ];

  return (
    <>
      <div className={classes.clientPage__container_top}>
        <div className={classes.clientPage__container_nav__wrapper}>
          <div className={classes.clientPage__container_nav}>
            {navItems.map((item) => {
              return (
                <CustomButtonUI
                  disableRipple={true}
                  key={item.id}
                  customRoot={
                    itemNav.i === item.id
                      ? `${classes.navActive} ${classes.tabBtn}`
                      : classes.tabBtn
                  }
                  onClick={() => {
                    setItemNav({ i: item.id, ttl: item.title });
                    safeAccountTab(item.id);
                  }}
                >
                  {item.title} {brooklyn(item.count)}
                </CustomButtonUI>
              );
            })}
          </div>
        </div>
      </div>
      {navItems.map((item) => {
        return itemNav.i === item.id && item.content;
      })}
    </>
  );
};

// export default React.memo(Favorites)

export default React.memo(
  ScrollGetMore({
    url: "/api/PersonalAreaFavorites",
    tabs: ["liked_posts", "subscriptions", "searchs"],
  })(Favorites)
);
