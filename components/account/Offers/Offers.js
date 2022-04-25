import React, { useState, useEffect } from "react";

import Wait from "./tabs/Wait";
import Active from "./tabs/Active";
import Archive from "./tabs/Archive";
import safeAccountTab from "../../safeAccountTab";
import ScrollGetMore from "src/components/ScrollGetMore/ScrollGetMore";

import { STATIC_URL } from "#lib/constants";
import { photos2arr } from "#lib/services";
import ClientPageNav from "src/components/AnyPage/ClientPageNav/ClientPageNav";
/**
 *
 * @param {*} param0
 * @returns
 */
const Offers = ({ data }) => {
  const [itemNav, setItemNav] = useState({ i: 1, ttl: "Активные" });
  const [posts, setPosts] = useState();

  useEffect(() => {
    const posts = [
      data?.active_posts?.data || [],
      data?.wait_posts?.data || [],
      data?.archive_posts?.data || [],
    ];

    posts?.map((item) => {
      if (item?.length && typeof item !== "undefined") {
        item.map((obj) => {
          // срабатывает во время прокручивания, данные приходят измененные не ввиде объекта, а в виде массива
          if (Array.isArray(obj.photo)) {
            const photos = obj?.photo?.map((img) => `${img}`);
            return (obj.photo = photos);
          } else {
            const photos = photos2arr(obj?.photo)?.map(
              (img) => `${STATIC_URL}/${img}`
            );
            return (obj.photo = photos);
          }
        });
      }
    });
    setPosts(posts);
  }, [data]);

  const navItems = [
    {
      id: 1,
      title: "Активные",
      content: (
        <Active key={1} offers={typeof posts !== "undefined" ? posts[0] : []} />
      ),
      count: data?.active_posts_count || 0,
    },
    {
      id: 2,
      title: "Ждут действия",
      content: (
        <Wait key={2} offers={typeof posts !== "undefined" ? posts[1] : []} />
      ),
      count: data?.wait_posts_count || 0,
    },
    {
      id: 3,
      title: "Архив",
      content: (
        <Archive
          key={3}
          offers={typeof posts !== "undefined" ? posts[2] : []}
        />
      ),
      count: data?.archive_posts_count || 0,
    },
  ];

  return (
    <ClientPageNav
      navItems={navItems}
      itemNav={itemNav}
      setItemNav={setItemNav}
    />
  );
};

export default React.memo(
  ScrollGetMore({
    url: "/api/PersonalAreaPosts",
    tabs: ["active_posts", "wait_posts", "archive_posts"],
  })(Offers)
);
