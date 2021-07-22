import React, { useState, useEffect } from "react";
import Active from "./tabs/Active";
import Sold from "./tabs/Sold";
import Placeholder from "./tabs/Placeholder";
import { useAd } from "../../hooks/useAd";
import { useRouter } from "next/router";

const UsersPage = () => {
  const [activeBox, setActiveBox] = useState([]);
  const [soldBox, setSoldBox] = useState([]);

  const router = useRouter();
 
  const { userInfo, isLoading } = useAd(router.query.id);
  // console.log(userInfo.filter(item => item.archived))
  // console.log(userInfo)
  
  useEffect(() => {
    if( userInfo.length > 0) {
      setActiveBox(userInfo.filter(item => item.archived == false))
      setSoldBox(userInfo.filter(item => item.archived))
    }
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
      {navItems.map((item) => itemNav.i === item.id && (userInfo.length > 0 ? item.content : <Placeholder />))}
    </>
  );
};
export default UsersPage;
