import React, { useState, useEffect } from "react";
import Active from "./tabs/Active";
import Sold from "./tabs/Sold";
import Placeholder from "./tabs/Placeholder";
import { useAd } from "../../hooks/useAd";
import { useRouter } from "next/router";

const ContentBox = [
  {
    id: 1,
    category_id: null,
    price: "1000",
    photo: '{"photos":["/offersImage/373040offer-147235.webp"]}',
    rating: 3,
    created_at: "2021-07-08T06:40:10.000Z",
    delivery: true,
    reviewed: -1,
    address: "test",
    phone: null,
    trade: false,
    verify_moderator: {
      verify: ["1", "2", "3", "4", "5", "6", "7"],
    },
    commercial: 0,
    secure_transaction: true,
    title: "testtt",
    email: null,
    oldPrice: "1200",
  },
  {
    id: 2,
    category_id: null,
    price: "1545",
    photo: '{"photos":["/offersImage/873141offer-397500.webp", "/offersImage/873141offer-397500.webp"]}',
    rating: 0,
    created_at: "2021-07-08T06:47:40.000Z",
    delivery: true,
    reviewed: 0,
    address: "qqqqq",
    phone: null,
    trade: false,
    verify_moderator: {
      verify: ["1", "2", "3", "4", "5", "6", "7", "8"],
    },
    commercial: 0,
    secure_transaction: true,
    title: "qwer1",
    email: null,
    oldPrice: "23200",
  },
  {
    id: 3,
    category_id: null,
    price: "1545",
    photo: '{"photos":["/offersImage/196414offer-629584.webp", "/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp"]}',
    rating: 0,
    created_at: "2021-07-08T06:48:40.000Z",
    delivery: true,
    reviewed: 0,
    address: "qqqqq",
    phone: null,
    trade: false,
    verify_moderator: {
      verify: ["1", "2", "3", "4", "5", "6", "7", "8"],
    },
    commercial: 0,
    secure_transaction: true,
    title: "qwer1",
    email: null,
    oldPrice: "4200",
  },
  {
    id: 4,
    category_id: 9,
    price: "1597",
    photo: '{"photos":["/offersImage/373040offer-147235.webp"]}',
    rating: 0,
    created_at: "2021-07-09T08:23:30.000Z",
    delivery: true,
    reviewed: 0,
    address: "asfasf",
    phone: null,
    trade: false,
    verify_moderator: {
      verify: ["1"],
    },
    commercial: 0,
    secure_transaction: true,
    title: "tete",
    email: null,
    oldPrice: "32100",
  },
  {
    id: 5,
    category_id: 5,
    price: "21233222",
    photo: '{"photos":["/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp"]}',
    rating: 0,
    created_at: "2021-07-09T12:13:54.000Z",
    delivery: false,
    reviewed: 0,
    address: "Челябинск",
    phone: null,
    trade: true,
    verify_moderator: {
      verify: ["1"],
    },
    commercial: 0,
    secure_transaction: true,
    title: "Квартира",
    email: null,
    oldPrice: "200",
  },
    {
    id: 6,
    category_id: 6,
    price: "30000",
    photo: '{"photos":["/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp"]}',
    rating: 0,
    created_at: "2021-07-09T12:13:54.000Z",
    delivery: false,
    reviewed: 0,
    address: "Челябинск",
    phone: null,
    trade: true,
    verify_moderator: {
      verify: ["1"],
    },
    commercial: 0,
    secure_transaction: true,
    title: "Квартира",
    email: null,
    oldPrice: "200",
    sold: true
  },
    {
    id: 7,
    category_id: 7,
    price: "20000",
    photo: '{"photos":["/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp"]}',
    rating: 0,
    created_at: "2021-07-09T12:13:54.000Z",
    delivery: false,
    reviewed: 0,
    address: "Челябинск",
    phone: null,
    trade: true,
    verify_moderator: {
      verify: ["1"],
    },
    commercial: 0,
    secure_transaction: true,
    title: "Квартира",
    email: null,
    oldPrice: "200",
    sold: true
  },
    {
    id: 8,
    category_id: 8,
    price: "10000",
    photo: '{"photos":["/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp", "/offersImage/373040offer-147235.webp"]}',
    rating: 0,
    created_at: "2021-07-09T12:13:54.000Z",
    delivery: false,
    reviewed: 0,
    address: "Челябинск",
    phone: null,
    trade: true,
    verify_moderator: {
      verify: ["1"],
    },
    commercial: 0,
    secure_transaction: true,
    title: "Квартира",
    email: null,
    oldPrice: "200",
    sold: true
  },
];

const UsersPage = () => {
  const [activeBox, setActiveBox] = useState([]);
  const [soldBox, setSoldBox] = useState([]);

  const router = useRouter();

  // push
 
  const { userInfo, isLoading } = useAd(router.query.id);
console.log(userInfo, isLoading)
  
  useEffect(() => {
    setActiveBox(ContentBox.filter(item => item.sold == undefined))
    setSoldBox(ContentBox.filter(item => item.sold))

  }, [router, isLoading])



  const navItems = [
    { id: 1, title: "Активные", content: <Active offers={activeBox} />, count: activeBox.length },
    { id: 2, title: "Продано", content: <Sold offers={soldBox} />, count: soldBox.length },
  ];
  const [itemNav, setItemNav] = useState({ i: 1, ttl: "Активные" });

  return (
    <>
      <div className="clientPage__container_top">
        <div className="clientPage__container_nav__wrapper">
          <div className="clientPage__container_nav">
            {navItems.map((item) => {
              return (
                <a key={item.id} className={itemNav.i === item.id ? "navActive" : ""} key={item.id} onClick={() => setItemNav({ i: item.id, ttl: item.title })}>
                  {item.title} {item.count == undefined ? "" : item.count.brooklyn()}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      {navItems.map((item) => itemNav.i === item.id && (ContentBox.length > 0 ? item.content : <Placeholder />))}
    </>
  );
};
export default UsersPage;
