import React from "react";
import Active from "./tabs/Active";
import Sold from "./tabs/Sold";
import Placeholder from "./tabs/Placeholder";

import { Box } from "@material-ui/core";
import ScrollGetMore from "src/components/ScrollGetMore/ScrollGetMore";

// import { useAd } from "../../hooks/useAd";
import { useRouter } from "next/router";
// import { brooklyn } from "../../lib/services";
// import { getDataByPost } from "#lib/fetch";

import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";
import { useUserStyle } from "./style";

const UsersPage = ({ data, itemNav, setItemNav }) => {
  const classes = useUserStyle();

  //   const [activeBox, setActiveBox] = useState([]);
  //   const [activeTotal, setActiveTotal] = useState(null)
  //   const [soldBox, setSoldBox] = useState([]);
  //   const [soldTotal, setSoldTotal] = useState(null)

  const router = useRouter();

  //   const sellerId = parseInt(router.query.id)

  // const { userInfo, /*isLoading*/ } = useAd(router.query.id);

  //   useEffect(async () => {
  //     if(!sellerId) {
  //       return
  //     }
  //     const data = await getDataByPost(`/api/getSeller`, { id: sellerId, page: 1, page_limit: 50 } )
  //     setActiveBox(data.active_posts)
  //     setSoldBox(data.archive_posts)
  //     setActiveTotal(data.active_posts_count)
  //     setSoldTotal(data.archive_posts_count)
  //   }, [sellerId])

  // useEffect(() => {

  //   if (userInfo && userInfo.length > 0) {

  //     setActiveBox(userInfo.filter(item => item.active === 0 && item.archived === false))
  //     setSoldBox(userInfo.filter(item => item.active !== 0 && item.archived))
  //   }
  // }, [router, isLoading])

  const navItems = [
    {
      id: 1,
      title: "Активные",
      content: <Active offers={data?.active_posts?.data || []} />,
      count: data?.active_posts_count || 0,
    },
    {
      id: 2,
      title: "Продано",
      content: <Sold offers={data?.archive_posts?.data || []} />,
      count: data?.archive_posts_count || 0,
    },
  ];

  const clickLink = (item) => {
    setItemNav({ i: item.id, ttl: item.title });
  };
  const userBnts = navItems.length
    ? navItems.map((item) => {
        return (
          <CustomButtonUI
            key={item.id}
            onClick={() => clickLink(item)}
            customRoot={
              itemNav.i === item.id
                ? `${classes.tabBtn} ${classes.navActive}`
                : classes.tabBtn
            }
          >{`${item.title} ${item.count || ""}`}</CustomButtonUI>
        );
      })
    : null;
  const items = navItems.map(
    (item) =>
      itemNav.i === item.id &&
      (item.content ? (
        item.content
      ) : (
        <Placeholder key={item.id} user={item.id} />
      ))
  );

  return (
    <>
      <Box
        // className="clientPage__container_top"
        className={classes.clientPage__container_top} // добавил
      >
        <Box
          // className="clientPage__container_nav__wrapper"
          className={classes.clientPage__container_nav__wrapper} // добавил
        >
          <Box
            // className="clientPage__container_nav"
            className={classes.clientPage__container_nav} // добавил
          >
            {userBnts}
          </Box>
        </Box>
      </Box>
      {items}
    </>
  );
};

// export default UsersPage;

export default React.memo(
  ScrollGetMore({
    url: "/api/getSeller",
    tabs: ["active_posts", "archive_posts"],
  })(UsersPage)
);
