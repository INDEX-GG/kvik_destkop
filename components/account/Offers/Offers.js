import React, { useState, useEffect } from "react";
import Active from "./tabs/Active";
import Wait from "./tabs/Wait";
import Archive from "./tabs/Archive";
import Placeholder from "./tabs/Placeholder";
import { useRouter } from "next/router";
import { brooklyn } from "../../../lib/services";

import { useOfferAccount } from "../../../lib/Context/OfferAccountCTX";
import safeAccountTab from "../../safeAccountTab";

const causes = "Неверная цена / Неверная категория / Невозможно дозвониться / Признаки дискриминации / Товар или услуга запрещенные у продаже в РФ / В одном объявлении несколько предложений товаров и услуг / Использование одинаковых изображений в разных объявлениях / Контактная информация в названии, тексте объявления или на фото / Нарушение других правил Квик";
const Offers = () => {


  const { userAccountProvider } = useOfferAccount()
  const [activeOffersBox, setActiveOffersBox] = useState([]);
  const [waitOffersBox, setWaitOffersBox] = useState([]);
  const [archiveOffersBox, setArchiveOffersBox] = useState([]);
  const router = useRouter();
  const [itemNav, setItemNav] = useState({ i: 1, ttl: "Активные" });

  useEffect(() => {
    if (userAccountProvider?.length > 0) {
      // Активные объявления
      setActiveOffersBox(userAccountProvider?.filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active === 0));
      // Ждут действия
      setWaitOffersBox(userAccountProvider?.filter((offer) => offer.verify === 2 || offer.verify === 3 || offer.verify === 4 || offer.verify === 5));
      // Архив
      setArchiveOffersBox(userAccountProvider?.filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active !== 0));
    }
  }, [userAccountProvider]);

  useEffect(() => {
    if (router) {
      if (router.query.content != undefined) {
        setItemNav({ i: +router.query.content, ttl: navItems[router.query.content - 1].title })
      }
    }
  }, [router])

  const dataWait = [
    { id: 1, img: "https://source.unsplash.com/random?interior", title: "2-комн. кваритра, 95 м", price: 3000000, date: "00.00.00 00.00", status: 1, cause: causes, verify: 4, delete: false },
    { id: 2, img: "https://source.unsplash.com/random?cars", title: "Mitsubishi Delica", price: 199999, date: "00.00.00 00.00", status: 0, verify: 5, verify_moderator: 5, delete: false },
    { id: 3, img: "https://source.unsplash.com/random?phone", title: "Samsung Galaxy S21 Ultra", price: 99999, date: "00.00.00 00.00", status: 2, verify: 2, delete: true },
  ];

  // Пагинация
  const navItems = [
    { id: 1, title: "Активные", content: <Active key={1} offers={activeOffersBox} />, count: activeOffersBox.length },
    { id: 2, title: "Ждут действия", content: <Wait key={2} offers={dataWait} />, count: waitOffersBox.length },
    { id: 3, title: "Архив", content: <Archive key={3} offers={archiveOffersBox} />, count: archiveOffersBox.length },
  ];

  console.log(navItems)
  
  return (
    <>
      <div className="clientPage__container_top">
        <div className="clientPage__container_nav__wrapper">
          <div className="clientPage__container_nav">
            {navItems.map(item => {
              return (
                <a key={item.id} className={itemNav.i === item.id ? "navActive" : ""} onClick={() => {
                  setItemNav({ i: item.id, ttl: item.title })
                  safeAccountTab(item.id)
                }}>
                  {item.title} {brooklyn(item.count)}{" "}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      {navItems.map(item => itemNav.i === item.id && ( item.count > 0 ? item.content : <Placeholder key={item.id} />))}
    </>
  );
};
export default Offers;
