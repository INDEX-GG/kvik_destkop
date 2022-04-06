import React from "react";
import { useRouter } from "next/router";
import { Box } from "@material-ui/core";

import Link from "next/link";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useItem } from "./style";

const Item = ({ links, name, styleRule }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClick = () => {
    setOpen(!open);
  };

  const classes = useItem();
  // const openStyle = styleRule
  //   ? classes.dropDR
  //   : `${classes.drop} ${classes.dropLine}`;

  // const openStyle = open ? classes.drop : `${classes.drop} ${classes.dropLine}`;
  // const bottomLineStyleUl = open && styleRule ? "" : classes.dropLine;

  let openStyle = null;
  if (open) {
    if (styleRule) {
      openStyle = classes.dropDR;
    } else {
      openStyle = classes.drop;
    }
  } else {
    if (styleRule) {
      openStyle = `${classes.dropDR}`;
    } else {
      openStyle = `${classes.drop} ${classes.dropLine}`;
    }
  }

  let bottomLineStyleUl = null;
  if (open) {
    if (styleRule) {
      bottomLineStyleUl = "";
    } else {
      bottomLineStyleUl = classes.dropLine;
    }
  } else {
    bottomLineStyleUl = "";
  }

  const collapseStyle = styleRule ? classes.collapse : "";
  const nameStyle = styleRule ? classes.nameDR : classes.name;

  const Icon = ({ open }) => {
    return <Box>{open ? <ExpandLess /> : <ExpandMore />}</Box>;
  };

  const listLinks = links.map((link, idx) => {
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
    <Box className={classes.item}>
      <ListItemButton onClick={handleClick} className={openStyle}>
        {styleRule ? <Icon open={open} /> : ""}
        <ListItemText primary={name} className={nameStyle} />
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        className={collapseStyle}
      >
        <List component="ul" disablePadding className={bottomLineStyleUl}>
          {listLinks}
        </List>
      </Collapse>
    </Box>
  );
};

export default React.memo(Item);
