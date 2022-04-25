import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { brooklyn } from "#lib/services";
import { blockUser, getBlockedUsers } from "#lib/fetch";
import safeAccountTab from "#components/safeAccountTab";
import { PersonalData } from "./tabs/PersonalData/component";
import Pushes from "./tabs/Pushes";
import BlackList from "./tabs/BlackList";
import ClientPageNav from "src/components/AnyPage/ClientPageNav/ClientPageNav";
// Чёрный список
// const blackListBox = [
// 	{ id: 1, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 2, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жанна', date: '00.00.00' },
// 	{ id: 3, userPic: 'https://source.unsplash.com/random?portrait', username: 'Евгений', date: '00.00.00' },
// 	{ id: 4, userPic: 'https://source.unsplash.com/random?portrait', username: 'Марина', date: '00.00.00' },
// 	{ id: 5, userPic: 'https://source.unsplash.com/random?portrait', username: 'Андрей', date: '00.00.00' },
// 	{ id: 6, userPic: 'https://source.unsplash.com/random?portrait', username: 'Василий', date: '00.00.00' },
// 	{ id: 7, userPic: 'https://source.unsplash.com/random?portrait', username: 'Длинное имя', date: '00.00.00' },
// 	{ id: 8, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жорка', date: '00.00.00' },
// 	{ id: 9, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 10, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 11, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 12, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 13, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 14, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 15, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// 	{ id: 16, userPic: 'https://source.unsplash.com/random?portrait', username: 'Жора', date: '00.00.00' },
// ];

/**
 * @typedef SettingsProps
 * @property {number} userID
 * @property {string} token
 */

/**
 * @param {SettingsProps} props
 */
const Settings = ({ userID, token }) => {
  const [blackListData, setBlackListData] = useState([]);

  /**
   * @param {string | string[]} users
   * @returns
   */
  const updateBlackList = (users) => {
    if (Array.isArray(users)) {
      setBlackListData((arr) => arr.filter((el) => !users.includes(el.id)));
      return;
    }
    setBlackListData((arr) => arr.filter((el) => el.id !== users));
  };

  /**
   * @param {string[] | string} usersUnlock
   */
  const unblockUsers = async (usersUnlock) => {
    updateBlackList(usersUnlock);

    if (Array.isArray(usersUnlock)) {
      for (let user of usersUnlock) {
        await blockUser(userID, user, false, token);
      }
    } else {
      await blockUser(userID, usersUnlock, false, token);
    }
  };

  const navItems = [
    {
      id: 1,
      title: "Личные данные",
      content: <PersonalData key={1} />,
      count: 0,
    },
    { id: 2, title: "Уведомления", content: <Pushes key={2} />, count: 0 },
    {
      id: 3,
      title: "Черный список",
      content: (
        <BlackList
          key={3}
          data={blackListData}
          unblockUser={(u) => unblockUsers(u)}
        />
      ),
      count: blackListData.length,
    },
  ];

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (userID && token) {
        const data = await getBlockedUsers(userID, token);
        if (data?.blocked_users?.length) {
          setBlackListData(data.blocked_users);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (router) {
      if (router.query.content != undefined) {
        setItemNav({
          i: +router.query.content,
          ttl: navItems[router.query.content - 1].title,
        });
      }
    }
  }, [router]);

  const [itemNav, setItemNav] = useState({ i: 1, ttl: "Личные данные" });

  return (
    <ClientPageNav
      navItems={navItems}
      itemNav={itemNav}
      setItemNav={setItemNav}
    />
  );
};
export default Settings;
