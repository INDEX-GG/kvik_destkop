import React from "react";
import Input from "@mui/material/Input";
import { Box } from "@material-ui/core";

import { useCallbackForm } from "./style";

const CallbackForm = () => {
  const classes = useCallbackForm();
  return (
    <Box component="form" className={classes.form}>
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

      <Box component="textarea" className={classes.formText} />
    </Box>
  );
};
export default React.memo(CallbackForm);
