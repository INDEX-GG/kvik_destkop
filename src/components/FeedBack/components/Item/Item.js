import React from "react";
import { Box, Typography, Link } from "@material-ui/core";
import { useItem } from "./style";

function Item({ links, name }) {
  const classes = useItem();

  const listLinks = links.map((link, idx) => {
    return (
      <Box component="li" key={idx} className={classes.ad__item}>
        <Link className={classes.ad__link}>{link.text}</Link>
      </Box>
    );
  });

  return (
    <Box className={classes.ad}>
      <Typography variant="h2" className={classes.ad__header}>
        <Box component="ul">{name}</Box>
      </Typography>
      {listLinks}
    </Box>
  );
}

export default React.memo(Item);
