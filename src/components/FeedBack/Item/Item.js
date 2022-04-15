import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@material-ui/core";
import Link from "next/link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

import { useItem } from "./style";

const Item = ({ links, isMobile, idPage }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setOpen(!open);
  };

  const classes = useItem();

  const itemStyle = useMemo(() => {
    return open ? `${classes.item} ` : `${classes.item} ${classes.bottomLine}`;
  });
  const openStyle = useMemo(() => {
    return open ? classes.drop : `${classes.drop} ${classes.dropLine}`;
  });

  const bottomLineStyleUl = useMemo(() => {
    return open ? classes.dropLine : "";
  });

  const listLinks = links.links.map((link, idx) => {
    const linkStyle = useMemo(() => {
      return router.query.text === link.link.query.text
        ? `${classes.itemLink} ${classes.linkActive}`
        : classes.itemLink;
    });
    // console.log(link.idonPage, "linklinklinklink-----ITEM");
    return (
      <Box component="li" key={idx} className={linkStyle}>
        <Link href={`/feedback/${idPage}#${link.idonPage}`} replace>
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
