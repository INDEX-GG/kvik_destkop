import React, { useEffect, useState } from "react";
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

  const classes = useFeedBack();

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
      console.log(router.query);
      console.log(router.query.text);
      setTextOpen(true);
    } else {
      setTextOpen(false);
    }
  }, [router]);
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.wrapper922}>
        <Box component="main" className={classes.links}>
          <Box className={styleContentWrapper}>
            <Box className={classes.st}>
              <Box className={`${classes.st} ${styleLinksWrapper}`}>
                <Box className={stylelinksCenter}>
                  <Item links={links} name="Объявления" styleRule={textOpen} />
                  <Item links={links} name="Объявления" styleRule={textOpen} />
                  <Item links={links} name="Объявления" styleRule={textOpen} />
                  <Item links={links} name="Объявления" styleRule={textOpen} />
                </Box>
                <Box className={stylelinksCenter}>
                  <Item
                    links={links}
                    name="Услуги продвижения"
                    styleRule={textOpen}
                  />
                </Box>
              </Box>
            </Box>
            <TextPage open={textOpen} />
          </Box>

          <Support />
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

export default React.memo(FeedBack);
