import React from "react";
import { Box } from "@material-ui/core";
import Nav from "./components/nav/Nav";
import Item from "./components/Item/Item";
import Footer from "./components/footer/Footer";
import Support from "./components/support/Support";

import { useFeedBack } from "./style";

const links = [
  { text: "Опубликовать и продать" },
  { text: "Редактировать объявление" },
];
const links2 = [
  { text: "Поднятие вверх" },
  { text: "XL объявление" },
  { text: "Выделить объявление" },
];
const links3 = [
  { text: "Отклонили" },
  { text: "Заблокировали" },
  { text: "Объявления сняты с публикации" },
];
function FeedBack() {
  const classes = useFeedBack();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.wrapper790}>
        {/* <Nav /> */}
        <Box component="main" className={classes.ads}>
          <Box className={classes.ads__wrapper}>
            <Box className={classes.ads__left}>
              <Item links={links} name="Объявление" />
              <Item links={links3} name="Проблемы с объявлением" />
              <Item links={links} name="Оплата услуг" />
              <Item links={links} name="Войти в профиль" />
            </Box>
            <Box className={classes.ads__right}>
              <Item links={links2} name="Услуги продвижения" />
              <Item links={links2} name="Личный кабинет" />
              <Item links={links2} name="Бонусы" />
            </Box>
          </Box>
          <Support />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default React.memo(FeedBack);
