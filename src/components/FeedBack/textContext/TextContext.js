import React from "react";
import { Box, Typography } from "@material-ui/core";

import { useTextContent } from "./style";

const TextContext = ({ textItem, id }) => {
  const classes = useTextContent();
  return (
    <Box className={classes.textContent}>
      <Typography variant="h1" className={classes.h1} id={id}>
        {textItem.text}
      </Typography>
      {textItem.texts.map((text, idx) => {
        return (
          <Box key={idx} component="p" className={classes.text}>
            {text}
          </Box>
        );
      })}
    </Box>
  );
};

export default TextContext;
