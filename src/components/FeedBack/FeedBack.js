import React from "react";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import Item from "./Item/Item";

import TextPage from "./textPage/TextPage";

import Footer from "../AnyPage/Footer/Footer";

import Support from "./support/Support";

import { useFeedBack } from "./style";

const links = [
  {
    text: "Подать объявление",
    link: {
      pathname: "/",
      query: { text: "pay" },
    },
  },
  {
    text: "Опубликовать и продлить",
    link: {
      pathname: "/",
      query: { text: "true" },
    },
  },
  {
    text: "Редактировать объявление",
    link: {
      pathname: "/",
      query: { text: "true" },
    },
  },
  {
    text: "Удалить, восстановить, поднять из архива",
    link: {
      pathname: "/",
      query: { text: "true" },
    },
  },
  {
    text: "Статистика",
    link: {
      pathname: "/",
      query: { text: "true" },
    },
  },
];
const links2 = [
  { text: "Отклонили" },
  { text: "Заблокировали" },
  { text: "Объявления сняты с публикации" },
];
const links3 = [{ text: "Как пополнить кошелек" }, { text: "Способы оплаты" }];
const links4 = [{ text: "Регистрация" }, { text: "Забыли пароль" }];
const links5 = [
  { text: "Поднятие вверх" },
  { text: "XL объявление" },
  { text: "Выделить объявление" },
];
const links6 = [
  { text: "Сделка" },
  { text: "Кошелек" },
  { text: "Избранное" },
  { text: "Сообщения" },
  { text: "Сравнить" },
  { text: "Отзывы" },
  { text: "Настройки" },
  { text: "Как сменить пароль" },
  { text: "Как сменить номер телефона" },
  { text: "Уведомления" },
];
const links7 = [
  { text: "Как получить бонусы" },
  { text: "Как использовать бонусы" },
];
function FeedBack() {
  const router = useRouter();
  console.log(router.query);
  const classes = useFeedBack();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.wrapper790}>
        <Box component="main" className={classes.links}>
          {router.query.text ? (
            <TextPage />
          ) : (
            <Box className={classes.linksWrapper}>
              <Box className={`${classes.linksCenter}`}>
                <Item links={links} name="Объявления" />
                {/* <Item
                links={links2}
                name="Проблемы с объявлением"
                
              />
              <Item links={links3} name="Оплата услуг"  />
              <Item links={links4} name="Войти в профиль"  /> */}
              </Box>
              <Box className={classes.linksCenter}>
                {/* <Item links={links5} name="Услуги продвижения"  />
              <Item links={links6} name="Личный кабинет"  />
              <Item links={links7} name="Бонусы"  /> */}
              </Box>
            </Box>
          )}

          <Support />
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

export default React.memo(FeedBack);
