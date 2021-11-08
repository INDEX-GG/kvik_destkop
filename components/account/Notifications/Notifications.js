import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { brooklyn } from "../../../lib/services";
import safeAccountTab from "../../safeAccountTab";
import Messages from "./tabs/Messages";
import Notifs from "./tabs/Notifs";

//Сообщения
const dialogsBox = [
  { id: 1, offerImg: "https://source.unsplash.com/random", offerPrice: 2000, offerTitle: "Монитор", userPic: "https://source.unsplash.com/random?portrait", userName: "Иван И.", date: "00.00.00 00:00", message: "Последнее осталенное сообщение в диалоге" },
  { id: 2, offerImg: "https://source.unsplash.com/random", offerPrice: 20000, offerTitle: "Автомобиль", userPic: "https://source.unsplash.com/random?portrait", userName: "Гомер С.", date: "00.00.00 00:00", message: "Последнее осталенное сообщение в диалоге" },
  { id: 3, offerImg: "https://source.unsplash.com/random", offerPrice: 200560, offerTitle: "Светофор", userPic: "https://source.unsplash.com/random?portrait", userName: "Дядя Стёпа", date: "00.00.00 00:00", message: "Последнее осталенное сообщение в диалоге" },
  { id: 4, offerImg: "https://source.unsplash.com/random", offerPrice: 452000, offerTitle: "Велосипед", userPic: "https://source.unsplash.com/random?portrait", userName: "Светлана", date: "00.00.00 00:00", message: "Последнее осталенное сообщение в диалоге" },
  { id: 5, offerImg: "https://source.unsplash.com/random", offerPrice: 52000, offerTitle: "Трактор", userPic: "https://source.unsplash.com/random?portrait", userName: "Татьяна П.", date: "00.00.00 00:00", message: "Последнее осталенное сообщение в диалоге" },
  { id: 6, offerImg: "https://source.unsplash.com/random", offerPrice: 62000, offerTitle: "Молоко", userPic: "https://source.unsplash.com/random?portrait", userName: "Длинное имя прямо очень длинное", date: "00.00.00 00:00", message: "Последнее осталенное сообщение в диалоге" },
  { id: 7, offerImg: "https://source.unsplash.com/random", offerPrice: 72000, offerTitle: "Ключ", userPic: "https://source.unsplash.com/random?portrait", userName: "Буратино", date: "00.00.00 00:00", message: "Последнее осталенное сообщение в диалоге" },
  { id: 8, offerImg: "https://source.unsplash.com/random", offerPrice: 82000, offerTitle: "Сокол Тысячелетия", userPic: "https://source.unsplash.com/random?portrait", userName: "Хан Соло", date: "00.00.00 00:00", message: "Последнее осталенное сообщение в диалоге" },
  { id: 9, offerImg: "https://source.unsplash.com/random", offerPrice: 5000, offerTitle: "Услуги", userPic: "https://source.unsplash.com/random?portrait", userName: "Ван Х.", date: "00.00.00 00:00", message: "Последнее осталенное сообщение в диалоге" },
  { id: 10, offerImg: "https://source.unsplash.com/random", offerPrice: 200, offerTitle: "Парадная", userPic: "https://source.unsplash.com/random?portrait", userName: "Пётр", date: "00.00.00 00:00", message: "Последнее осталенное сообщение в диалоге" },
  { id: 11, offerImg: "https://source.unsplash.com/random", offerPrice: 20.66, offerTitle: "Квартира", userPic: "https://source.unsplash.com/random?portrait", userName: "Тролебузина", date: "00.00.00 00:00", message: "Последнее осталенное сообщение в диалоге" },
];

// Уведомления
const notifBox = [
  // {
  //   id: 1,
  //   date: "Сегодня",
  //   mess: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit sagittis elit, in vestibulum mauris. Phasellus ante mi, finibus sit amet massa sed, sagittis cursus lacus. Aenean eget eros molestie, tempor lacus ac, accumsan ante. Duis pellentesque turpis ut diam ultricies fringilla. Aliquam vitae porta dolor. Mauris gravida, neque vel scelerisque volutpat, ex mi scelerisque nunc, ut bibendum nulla risus quis neque. Suspendisse id elit et ex placerat tincidunt. Vestibulum ultricies rutrum aliquet. Sed sit amet tellus mattis, scelerisque lacus in, sodales elit. Nunc sit amet augue ultrices, auctor est eu, finibus dui. Suspendisse auctor viverra rutrum.",
  //   time: "00:00",
  // },
  // {
  //   id: 2,
  //   date: "Вчера",
  //   mess: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam rutrum lectus quis iaculis pretium. Proin a turpis vehicula, consequat neque eu, ullamcorper lorem. Ut ullamcorper ipsum non ante pretium, eget laoreet velit suscipit. Duis non lectus neque. Fusce commodo volutpat massa, quis finibus nulla. Sed eu lacus malesuada, euismod lorem eget, bibendum risus. Fusce ultrices augue vel blandit blandit. Nulla dignissim lorem ipsum, quis lobortis est finibus dapibus.",
  //   time: "00:00",
  // },
  // {
  //   id: 3,
  //   date: "06 апреля 2021",
  //   mess: "Pellentesque tempor eros ac scelerisque porta. Donec mi purus, pulvinar et neque eget, maximus elementum felis. Vivamus viverra metus id erat lacinia placerat. Proin auctor ante id ex dictum posuere. Donec a lorem quam. Proin mollis facilisis porta. Sed bibendum, elit bibendum ullamcorper congue, ligula turpis pellentesque quam, non luctus ipsum nulla vitae sapien. ",
  //   time: "00:00",
  // },
  // { id: 4, date: "05 апреля 2021", mess: "Fusce ac euismod augue. Nullam lobortis facilisis semper. Ut elementum augue eget sem viverra, non placerat urna accumsan. Pellentesque convallis massa eu tincidunt fermentum.", time: "00:00" },
  // {
  //   id: 5,
  //   date: "04 апреля 2021",
  //   mess: "Aenean hendrerit a magna vitae commodo. Aliquam tristique pellentesque sem. Ut vitae elit ligula. Sed quis libero quis magna convallis dignissim. Sed aliquet, libero sit amet luctus volutpat, massa odio pulvinar ligula, in ullamcorper risus leo tempor felis. In ac erat in augue mattis scelerisque finibus nec sem. Vivamus nec neque ultrices, ultrices sem nec, commodo felis. Proin elit metus, egestas at urna ac, congue gravida velit. Mauris ac lectus mauris.",
  //   time: "00:00",
  // },
];

//Пагинация
const navItems = [
  { id: 1, title: "Сообщения", content: <Messages key={1} data={dialogsBox} />, count: dialogsBox.length },
  { id: 2, title: "Уведомления", content: <Notifs key={2} data={notifBox} />, count: notifBox.length },
];

const Notifications = () => {
  const [itemNav, setItemNav] = useState({ i: 1, ttl: "Сообщения" });

  const router = useRouter()


  useEffect(() => {
    if (router) {
      if (router.query.content !== undefined) {
        if (+router.query.content - 1 !== 2) {
          setItemNav({i: +router.query.content, ttl: navItems[router.query.content - 1].title})
        }
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
                <a className={itemNav.i === item.id ? "navActive" : ""} key={item.id} onClick={() => {
                  setItemNav({ i: item.id, ttl: item.title })
				  safeAccountTab(item.id)
				  }}>
                  {item.title} {brooklyn(item.count)}
                </a>
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
export default Notifications;
