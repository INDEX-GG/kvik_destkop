import React from "react";
import Active from "./tabs/Active";
import Sold from "./tabs/Sold";
import Placeholder from "./tabs/Placeholder";
// import { useAd } from "../../hooks/useAd";
// import { useRouter } from "next/router";
// import { brooklyn } from "../../lib/services";
// import { getDataByPost } from "#lib/fetch";

import ScrollGetMore from 'src/components/ScrollGetMore/ScrollGetMore';

const UsersPage = ({data, itemNav, setItemNav}) => {

//   const [activeBox, setActiveBox] = useState([]);
//   const [activeTotal, setActiveTotal] = useState(null)
//   const [soldBox, setSoldBox] = useState([]);
//   const [soldTotal, setSoldTotal] = useState(null)

//   const router = useRouter();
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
        count: data?.active_posts_count || 0
    },
    {
        id: 2,
        title: "Продано",
        content: <Sold offers={data?.archive_posts?.data || []} />,
        count: data?.archive_posts_count || 0
    },
  ];

  return (
    <>
      <div className="clientPage__container_top">
        <div className="clientPage__container_nav__wrapper">
          <div className="clientPage__container_nav">
            {navItems.length ? navItems.map((item) => {
              return (
                <a key={item.id} className={itemNav.i === item.id ? "navActive" : ""} onClick={() => setItemNav({ i: item.id, ttl: item.title })}>
                  {/* {item.title} {brooklyn(item.count)} */}
                  {`${item.title} ${item.count || ''}`}
                </a>
              );
            }) : null}
          </div>
        </div>
      </div>
      {navItems.map((item) => itemNav.i === item.id && (item.content ? item.content : <Placeholder key={item.id} user={item.id} />))}
    </>
  );
};

// export default UsersPage;

export default React.memo(ScrollGetMore({
    url: "/api/getSeller",
    tabs: ['active_posts', 'archive_posts']
})(UsersPage))
