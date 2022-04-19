import React from "react";
import Active from "./tabs/Active";
import Sold from "./tabs/Sold";
import Placeholder from "./tabs/Placeholder";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";
import { useUserStyle } from "./style";

export const UseUsersPage = (data, itemNav, setItemNav) => {
  const classes = useUserStyle();

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

  return {
    items,
    userBnts,
  };
};
