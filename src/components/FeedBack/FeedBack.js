import React, { useEffect, useState, useRef } from "react";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import Item from "./Item/Item";
import NavMenu from "./navMenu/NavMenu";

import TextPage from "./textPage/TextPage";

import Footer from "../AnyPage/Footer/Footer";

import Support from "./support/Support";

import { useFeedBack } from "./style";

const links = [
  {
    text: "Подать объявление",
    link: {
      pathname: "/",
      query: { text: "o1" },
    },
  },
  {
    text: "Опубликовать и продлить",
    link: {
      pathname: "/",
      query: { text: "o2" },
    },
  },
  {
    text: "Редактировать объявление",
    link: {
      pathname: "/",
      query: { text: "o3" },
    },
  },
  {
    text: "Удалить, восстановить, поднять из архива",
    link: {
      pathname: "/",
      query: { text: "o4" },
    },
  },
  {
    text: "Статистика",
    link: {
      pathname: "/",
      query: { text: "o5" },
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
  const [textOpen, setTextOpen] = useState(false);

  const myRef = useRef(null);

  const classes = useFeedBack();

  // проверка если текст должен быть виден, меняем стили для отображения
  const styleContentWrapper = textOpen
    ? classes.contentWrapperDR
    : classes.contentWrapper;

  const styleLinksWrapper = textOpen
    ? classes.linksWrapperDR
    : classes.linksWrapper;

  const stylelinksCenter = textOpen
    ? classes.linksCenterDR
    : classes.linksCenter;

  useEffect(() => {
    if (router.query.text) {
      setTextOpen(true);
    } else {
      setTextOpen(false);
    }
  }, [router]);
  return (
    <Box className={classes.wrapper} ref={myRef}>
      <Box className={classes.wrapper922}>
        <Box component="main" className={classes.links}>
          <Box className={styleContentWrapper}>
            {textOpen ? (
              <NavMenu />
            ) : (
              <Box className={` ${styleLinksWrapper}`}>
                <Box className={stylelinksCenter}>
                  <Item links={links} name="Объявления" />
                  <Item links={links} name="Объявления" />
                  <Item links={links} name="Объявления" />
                  <Item links={links} name="Объявления" />
                </Box>
                <Box className={stylelinksCenter}>
                  <Item links={links} name="Услуги продвижения" />
                </Box>
              </Box>
            )}

            {textOpen ? <TextPage open={textOpen} /> : ""}
          </Box>

          <Support />
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

export default React.memo(FeedBack);
