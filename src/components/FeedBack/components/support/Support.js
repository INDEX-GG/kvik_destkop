import React from "react";
import { Box, Typography, Link } from "@material-ui/core";
import CustomButtonUI from "src/UI/UIcomponent/CustomButtonUI/CustomButtonUI";

import { useSupport } from "./style";

function Support() {
  const classes = useSupport();
  return (
    <Box className={classes.support}>
      <Typography variant="h1" className={classes.h1}>
        Вы не нашли решение проблемы?
      </Typography>
      <Typography variant="h1" className={classes.h1}>
        Задайте вопрос нашей техподдержке
      </Typography>
      <Box component="p" className={classes.confirm}>
        Отправляя обращение, вы соглашаетесь на{" "}
        <Link className={classes.confirm__link}>обработку ваших данных</Link>
      </Box>
      <CustomButtonUI customRoot={classes.btn}>
        Перейти в диалог техподдержке
      </CustomButtonUI>
    </Box>
  );
}

export default React.memo(Support);
