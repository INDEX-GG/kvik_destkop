import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@material-ui/core";

import Link from "next/link";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

import { useItem } from "./style";

const Item = ({ links, isMobile }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  console.log("dfd");

  const handleClick = () => {
    setOpen(!open);
  };

  const classes = useItem();

  const itemStyle = open
    ? `${classes.item} `
    : `${classes.item} ${classes.bottomLine}`;

  const openStyle = open ? classes.drop : `${classes.drop} ${classes.dropLine}`;

  let bottomLineStyleUl = null;
  if (open) {
    bottomLineStyleUl = classes.dropLine;
  } else {
    bottomLineStyleUl = "";
  }

  const listLinks = links.links.map((link, idx) => {
    const linkStyle =
      router.query.text === link.link.query.text
        ? `${classes.itemLink} ${classes.linkActive}`
        : classes.itemLink;
    return (
      <Box component="li" key={idx} className={linkStyle}>
        <Link href={link.link} replace>
          {link.text}
        </Link>
      </Box>
    );
  });

  return (
    <Box className={isMobile ? itemStyle : classes.item}>
      {isMobile ? (
        <Box className={classes.itemWrap}>
          <ListItemButton onClick={handleClick} className={openStyle}>
            {/* {styleRule ? <Icon open={open} /> : ""} */}
            <ListItemText primary={links.header} className={classes.name} />
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="ul" disablePadding className={bottomLineStyleUl}>
              {listLinks}
            </List>
          </Collapse>
        </Box>
      ) : (
        <Box className={classes.itemDt}>
          <Typography variant="h1" className={classes.h2}>
            {links.header}
          </Typography>
          <Box component="ul">{listLinks}</Box>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(Item);
