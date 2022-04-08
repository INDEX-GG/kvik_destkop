import React from "react";
import { Box, Link, Typography } from "@material-ui/core";
import { useSupportText } from "./style";
const SupportText = () => {
  const classes = useSupportText();
  return (
    <Box>
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
    </Box>
  );
};

export default React.memo(SupportText);
