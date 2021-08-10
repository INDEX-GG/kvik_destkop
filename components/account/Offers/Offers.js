import React, { useState, useEffect } from "react";
import Active from "./tabs/Active";
import Wait from "./tabs/Wait";
import Archive from "./tabs/Archive";
import Placeholder from "./tabs/Placeholder";
import { useAd } from "../../../hooks/useAd";
import router, { useRouter } from "next/router";
import { brooklyn } from "../../../lib/services";

// import OfferAccountProvider from "../../../lib/Context/OfferAccountCTX";
import { useOfferAccount } from "../../../lib/Context/OfferAccountCTX";

const causes = "Неверная цена / Неверная категория / Невозможно дозвониться / Признаки дискриминации / Товар или услуга запрещенные у продаже в РФ / В одном объявлении несколько предложений товаров и услуг / Использование одинаковых изображений в разных объявлениях / Контактная информация в названии, тексте объявления или на фото / Нарушение других правил Квик";
// const OffersBox = [
//   { id: 1, img: "https://source.unsplash.com/random?interior", title: "2-комн. кваритра, 95 м", price: 3000000, date: "00.00.00 00.00", status: 1, cause: causes },
//   { id: 2, img: "https://source.unsplash.com/random?cars", title: "Mitsubishi Delica", price: 199999, date: "00.00.00 00.00", status: 0 },
//   { id: 3, img: "https://source.unsplash.com/random?phone", title: "Samsung Galaxy S21 Ultra", price: 99999, date: "00.00.00 00.00", status: 2 },
//   { id: 4, img: "https://source.unsplash.com/random?fridge", title: "Холодильник для пивка", price: 78500, date: "00.00.00 00.00", status: 1, cause: causes },
//   { id: 5, img: "https://source.unsplash.com/random?beer", title: "Пивко", price: 59.5, date: "00.00.00 00.00", status: 0 },
//   { id: 6, img: "https://source.unsplash.com/random?cat", title: "Кот", price: 999.95, date: "00.00.00 00.00", status: 2 },
//   { id: 8, img: "https://source.unsplash.com/random?ship", title: "Корабль", price: 9992234453422, date: "00.00.00 00.00", status: 1, cause: causes },
//   { id: 9, img: "https://source.unsplash.com/random?wheels", title: "Колеса", price: 34921.22, date: "00.00.00 00.00", status: 2 },
//   { id: 10, img: "https://source.unsplash.com/random?elephant", title: "Слон", price: 100500, date: "00.00.00 00.00", status: 0 },
//   { id: 11, img: "https://source.unsplash.com/random?starship", title: "Сокол Тысячелетия", price: 1000000000000, date: "00.00.00 00.00", status: 0 },
//   { id: 12, img: "https://source.unsplash.com/random?book", title: "Книга", price: 100, date: "00.00.00 00.00", status: 2 },
//   { id: 13, img: "https://source.unsplash.com/random?island", title: "Остров", price: 74347533, date: "00.00.00 00.00", status: 2 },
//   { id: 14, img: "https://source.unsplash.com/random?scyscraper", title: "Небоскрёб", price: 777777777777, date: "00.00.00 00.00", status: 1, cause: causes },
//   { id: 15, img: "https://source.unsplash.com/random?salt", title: "Соль", price: 0.22, date: "00.00.00 00.00", status: 0 },
// ];

const Offers = () => {

  const { setQuery, userAccountProvider } = useOfferAccount()

  const [activeOffersBox, setActiveOffersBox] = useState([]);
  const [waitOffersBox, setWaitOffersBox] = useState([]);
  const [archiveOffersBox, setArchiveOffersBox] = useState([]);




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

  const dataWait = [
    { id: 1, img: "https://source.unsplash.com/random?interior", title: "2-комн. кваритра, 95 м", price: 3000000, date: "00.00.00 00.00", status: 1, cause: causes, verify: 4, delete: false },
    { id: 2, img: "https://source.unsplash.com/random?cars", title: "Mitsubishi Delica", price: 199999, date: "00.00.00 00.00", status: 0, verify: 5, verify_moderator: 5, delete: false },
    { id: 3, img: "https://source.unsplash.com/random?phone", title: "Samsung Galaxy S21 Ultra", price: 99999, date: "00.00.00 00.00", status: 2, verify: 2, delete: true },
  ];

  // const dataArhive = [
  //   { id: 1, img: "https://source.unsplash.com/random?interior", title: "2-комн. кваритра, 95 м", price: 3000000, date: "00.00.00 00.00", status: 1, cause: causes, verify: 6, delete: false },
  //   { id: 2, img: "https://source.unsplash.com/random?cars", title: "Mitsubishi Delica", price: 199999, date: "00.00.00 00.00", status: 0, verify: 7, verify_moderator: 5, delete: false },
  // ];

  // Пагинация

  const navItems = [
    { id: 1, title: "Активные", content:  <Active offers={activeOffersBox} />, count: activeOffersBox?.length },
    { id: 2, title: "Ждут действия", content: <Wait offers={dataWait} />, count: waitOffersBox?.length },
    { id: 3, title: "Архив", content: <Archive offers={archiveOffersBox} />, count: archiveOffersBox?.length },
  ];

  const [itemNav, setItemNav] = useState({ i: 1, ttl: "Активные" });

  useEffect(() => {
    if (router) {
      if (router.query.content != undefined) {
        setItemNav({i: +router.query.content, ttl: navItems[router.query.content - 1].title})
      }
    }
  }, [router])

  return (
    <>
      <div className="clientPage__container_top">
        <div className="clientPage__container_nav__wrapper">
          <div className="clientPage__container_nav">

            {navItems.map((item) => {
              return (
                <a key={item.id} className={itemNav.i === item.id ? "navActive" : ""} onClick={() => {
                  setItemNav({ i: item.id, ttl: item.title })
                }}>
                  {item.title} {brooklyn(item.count)}{" "}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      {navItems.map((item) => itemNav.i === item.id && (activeOffersBox.length > 0 ? item.content : <Placeholder key={item.id} />))}
    </>
  );
};
export default Offers;
