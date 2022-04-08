import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@material-ui/core";

import Link from "next/link";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

import { useItem } from "./style";
import { useMedia } from "#hooks/useMedia";

const Item = ({ links, isMobile }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    setOpen(!open);
  };

  const classes = useItem();
  let openStyle = null;
  if (open) {
    openStyle = classes.drop;
  } else {
    openStyle = `${classes.drop} ${classes.dropLine}`;
  }

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

  const { matchesMobile, matchesTablet } = useMedia();

  // const isMobile = useMemo(() => matchesMobile || matchesTablet, [
  //   matchesMobile,
  //   matchesTablet,
  // ]);
  // const isMobile = useMemo(() => matchesMobile, [matchesMobile]);
  return (
    <Box className={classes.item}>
      {isMobile ? (
        <>
          <ListItemButton onClick={handleClick} className={openStyle}>
            {/* {styleRule ? <Icon open={open} /> : ""} */}
            <ListItemText primary={links.header} className={classes.name} />
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="ul" disablePadding className={bottomLineStyleUl}>
              {listLinks}
            </List>
          </Collapse>
        </>
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
