import React from "react";
import Input from "@mui/material/Input";
import { Box, Link, Typography } from "@material-ui/core";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";
import { useCallbackForm } from "./style";

const CallbackForm = () => {
  const classes = useCallbackForm();
  return (
    <Box component="form" className={classes.form}>
      <Typography variant="h1" className={classes.h1}>
        Вы не нашли решение проблемы?
      </Typography>
      <Typography variant="h1" className={classes.h1}>
        Задайте вопрос через форму
      </Typography>
      <Input
        className={classes.input}
        disableUnderline={true}
        placeholder="Как к вам можно обращаться"
      />
      <Input
        className={classes.input}
        disableUnderline={true}
        placeholder="Электронный адрес"
      />
      <Input
        className={classes.input}
        disableUnderline={true}
        placeholder="+7 ( ___ ) ___ - __ -__"
      />

      <Box
        component="textarea"
        className={classes.formText}
        placeholder="Введите текст"
      />
      <Box component="p" className={classes.confirm}>
        Отправляя обращение, вы соглашаетесь на{" "}
        <Link className={classes.confirm__link}>обработку ваших данных</Link>
      </Box>
      <CustomButtonUI customRoot={classes.btn}>
        Отправить сообщение
      </CustomButtonUI>
      <Box className={classes.sucsses}>Запрос успешно отправлен</Box>
    </Box>
  );
};
export default React.memo(CallbackForm);
