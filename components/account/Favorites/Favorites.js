import React, { useState } from "react";
import Offers from "./tabs/Offers";
import Searches from "./tabs/Searches";
import Sellers from "./tabs/Sellers";
import ScrollGetMore from "src/components/ScrollGetMore/ScrollGetMore";
import ClientPageNav from "src/components/AnyPage/ClientPageNav/ClientPageNav";

// Пагинация
const Favorites = ({ data }) => {
  // const Favorites = () => {

  // const { id, token } = useAuth();
  const [itemNav, setItemNav] = useState({ i: 1, ttl: "Объявления" });

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
      <ClientPageNav
        navItems={navItems}
        itemNav={itemNav}
        setItemNav={setItemNav}
      />
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
