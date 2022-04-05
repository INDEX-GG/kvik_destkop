import React, { useState } from "react";
import { Box, Typography, Link } from "@material-ui/core";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";

import { useSupport } from "./style";
import CallbackForm from "../callbackForm/CallbackForm";

function Support() {
  const [isLogged, setLoggid] = useState(true);
  const classes = useSupport();

  const changeLogin = () => {
    setLoggid(!isLogged);
  };

  return (
    <Box className={classes.support}>
      <Typography variant="h1" className={classes.h1}>
        Вы не нашли решение проблемы?
      </Typography>
      <Typography variant="h1" className={classes.h1}>
        Задайте вопрос нашей техподдержке
      </Typography>
      {isLogged ? <CallbackForm /> : ""}

      <Box component="p" className={classes.confirm}>
        Отправляя обращение, вы соглашаетесь на{" "}
        <Link className={classes.confirm__link}>обработку ваших данных</Link>
      </Box>
      <CustomButtonUI customRoot={classes.btn} onClick={changeLogin}>
        Перейти в диалог техподдержке
      </CustomButtonUI>
    </Box>
  );
}

export default React.memo(Support);
